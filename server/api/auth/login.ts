import { db } from '~/server/utils/db'
import { comparePassword } from '~/server/utils/password'
import { generateToken } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      message: 'Method not allowed',
    })
  }

  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      message: 'Email and password are required',
    })
  }

  const user = await db.user.findUnique({
    where: { email },
  })

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Invalid email or password',
    })
  }

  const isPasswordValid = await comparePassword(password, user.password)

  if (!isPasswordValid) {
    throw createError({
      statusCode: 401,
      message: 'Invalid email or password',
    })
  }

  if (!user.emailVerified) {
    throw createError({
      statusCode: 403,
      message: 'Please verify your email first',
    })
  }

  // Generate token
  const token = generateToken({
    userId: user.id,
    email: user.email,
  })

  // Set cookie
  setCookie(event, 'auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  return {
    success: true,
    message: 'Login successful',
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      userType: user.userType,
      emailVerified: user.emailVerified,
      onboardingCompleted: user.onboardingCompleted,
    },
    token,
  }
})

