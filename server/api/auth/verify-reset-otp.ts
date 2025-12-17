import db from '../../utils/db'
import { isOTPExpired } from '../../utils/otp'
import { generateToken } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  if (event.method !== 'POST') {
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

  if (!user.resetPasswordOtp || user.resetPasswordOtp !== otp) {
    throw createError({
      statusCode: 400,
      message: 'Invalid OTP',
    })
  }

  if (isOTPExpired(user.resetPasswordOtpExpiry)) {
    throw createError({
      statusCode: 400,
      message: 'OTP has expired',
    })
  }

  // Generate temporary reset token (short-lived)
  const resetToken = generateToken({
    userId: user.id,
    email: user.email,
  })

  return {
    success: true,
    message: 'OTP verified successfully',
    resetToken,
  }
})

