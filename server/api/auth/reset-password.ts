import db from '../../utils/db'
import { hashPassword } from '../../utils/password'
import { verifyToken } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  if (event.method !== 'POST') {
    throw createError({
      statusCode: 405,
      message: 'Method not allowed',
    })
  }

  const body = await readBody(event)
  const { resetToken, newPassword, email, otp } = body

  // Support both token-based and OTP-based reset
  let user

  if (resetToken) {
    const payload = verifyToken(resetToken)
    if (!payload) {
      throw createError({
        statusCode: 400,
        message: 'Invalid or expired reset token',
      })
    }

    user = await db.user.findUnique({
      where: { id: payload.userId },
    })
  } else if (email && otp) {
    user = await db.user.findUnique({
      where: { email },
    })

    if (!user || !user.resetPasswordOtp || user.resetPasswordOtp !== otp) {
      throw createError({
        statusCode: 400,
        message: 'Invalid OTP',
      })
    }
  } else {
    throw createError({
      statusCode: 400,
      message: 'Reset token or email with OTP is required',
    })
  }

  if (!user) {
    throw createError({
      statusCode: 404,
      message: 'User not found',
    })
  }

  if (!newPassword) {
    throw createError({
      statusCode: 400,
      message: 'New password is required',
    })
  }

  if (newPassword.length < 8) {
    throw createError({
      statusCode: 400,
      message: 'Password must be at least 8 characters',
    })
  }

  // Hash new password
  const hashedPassword = await hashPassword(newPassword)

  // Update password and clear reset OTP fields
  await db.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetPasswordOtp: null,
      resetPasswordOtpExpiry: null,
    },
  })

  return {
    success: true,
    message: 'Password reset successfully',
  }
})

