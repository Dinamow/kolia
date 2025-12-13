import { db } from '~/server/utils/db'
import { getCurrentUser } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      message: 'Method not allowed',
    })
  }

  const token = getCookie(event, 'auth-token') || 
                getHeader(event, 'authorization')?.replace('Bearer ', '')

  const user = await getCurrentUser(token || null)

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    })
  }

  if (!user.emailVerified) {
    throw createError({
      statusCode: 403,
      message: 'Please verify your email first',
    })
  }

  const body = await readBody(event)
  const { skills } = body

  if (!Array.isArray(skills) || skills.length === 0) {
    throw createError({
      statusCode: 400,
      message: 'At least one skill is required',
    })
  }

  // Validate skills
  for (const skill of skills) {
    if (!skill.skillName || typeof skill.skillName !== 'string') {
      throw createError({
        statusCode: 400,
        message: 'Each skill must have a skillName',
      })
    }

    if (typeof skill.proficiency !== 'number' || skill.proficiency < 0 || skill.proficiency > 10) {
      throw createError({
        statusCode: 400,
        message: 'Proficiency must be a number between 0 and 10',
      })
    }
  }

  // Delete existing skills for this user
  await db.techSkill.deleteMany({
    where: { userId: user.id },
  })

  // Create new skills
  await db.techSkill.createMany({
    data: skills.map((skill: { skillName: string; proficiency: number; notes?: string }) => ({
      userId: user.id,
      skillName: skill.skillName.trim(),
      proficiency: skill.proficiency,
      notes: skill.notes?.trim() || null,
    })),
  })

  // Mark onboarding as completed
  await db.user.update({
    where: { id: user.id },
    data: {
      onboardingCompleted: true,
    },
  })

  return {
    success: true,
    message: 'Tech skills saved successfully',
  }
})

