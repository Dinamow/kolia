import { db } from '../../utils/db'
import { getCurrentUser } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  if (event.method !== 'GET') {
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

  // Optional: Only allow admins to view all users
  // Uncomment if needed:
  // if (user.userType !== 'ADMIN') {
  //   throw createError({
  //     statusCode: 403,
  //     message: 'Forbidden',
  //   })
  // }

  const query = getQuery(event)
  const userType = query.userType as string | undefined

  // Build where clause
  const where: any = {}
  if (userType && ['TEAM_LEADER', 'INDIVIDUAL', 'ADMIN'].includes(userType)) {
    where.userType = userType
  }

  const users = await db.user.findMany({
    where,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      whatsappNumber: true,
      gender: true,
      userType: true,
      hasTeam: true,
      emailVerified: true,
      onboardingCompleted: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return {
    success: true,
    users,
    count: users.length,
  }
})

