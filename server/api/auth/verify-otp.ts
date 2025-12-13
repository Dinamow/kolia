import { db } from '~/server/utils/db'
import { isOTPExpired } from '~/server/utils/otp'
import { generateToken } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      message: 'Method not allowed',
    })
  }

  const body = await readBody(event)
  const { email, otp } = body

  if (!email || !otp) {
    throw createError({
      statusCode: 400,
      message: 'Email and OTP are required',
    })
  }

  const user = await db.user.findUnique({
    where: { email },
  })

  if (!user) {
    throw createError({
      statusCode: 404,
      message: 'User not found',
    })
  }

  if (user.emailVerified) {
    throw createError({
      statusCode: 400,
      message: 'Email already verified',
    })
  }

  if (!user.otp || user.otp !== otp) {
    throw createError({
      statusCode: 400,
      message: 'Invalid OTP',
    })
  }

  if (isOTPExpired(user.otpExpiry)) {
    throw createError({
      statusCode: 400,
      message: 'OTP has expired',
    })
  }

  // Update user: verify email and clear OTP
  const updatedUser = await db.user.update({
    where: { id: user.id },
    data: {
      emailVerified: true,
      otp: null,
      otpExpiry: null,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      userType: true,
      emailVerified: true,
      onboardingCompleted: true,
    },
  })

  // Generate token
  const token = generateToken({
    userId: updatedUser.id,
    email: updatedUser.email,
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
    message: 'Email verified successfully',
    user: updatedUser,
    token,
  }
})

