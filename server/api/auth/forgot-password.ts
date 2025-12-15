import { db } from '../../utils/db'
import { generateOTP, getOTPExpiry } from '../../utils/otp'
import { sendOTPEmail } from '../../utils/email'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      message: 'Method not allowed',
    })
  }

  const body = await readBody(event)
  const { email } = body

  if (!email) {
    throw createError({
      statusCode: 400,
      message: 'Email is required',
    })
  }

  const user = await db.user.findUnique({
    where: { email },
  })

  // Don't reveal if email exists or not for security
  if (!user) {
    return {
      success: true,
      message: 'If the email exists, a password reset OTP has been sent.',
    }
  }

  // Generate reset OTP
  const resetOtp = generateOTP()
  const resetOtpExpiry = getOTPExpiry(15)

  // Update user with reset OTP
  await db.user.update({
    where: { id: user.id },
    data: {
      resetPasswordOtp: resetOtp,
      resetPasswordOtpExpiry: resetOtpExpiry,
    },
  })

  // Send reset OTP email
  try {
    await sendOTPEmail(email, resetOtp, 'reset')
  } catch (error) {
    console.error('Failed to send reset OTP email:', error)
  }

  return {
    success: true,
    message: 'If the email exists, a password reset OTP has been sent.',
  }
})

