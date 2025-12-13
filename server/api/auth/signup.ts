import { db } from '~/server/utils/db'
import { hashPassword } from '~/server/utils/password'
import { generateOTP, getOTPExpiry } from '~/server/utils/otp'
import { sendOTPEmail } from '~/server/utils/email'

export default defineEventHandler(async (event) => {
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      message: 'Method not allowed',
    })
  }

  const body = await readBody(event)
  const { firstName, lastName, email, password, whatsappNumber, gender, userType } = body

  // Validation
  if (!firstName || !lastName || !email || !password || !whatsappNumber || !gender || !userType) {
    throw createError({
      statusCode: 400,
      message: 'All fields are required',
    })
  }

  // Reject ADMIN userType from endpoint
  if (userType === 'ADMIN') {
    throw createError({
      statusCode: 403,
      message: 'Admin users cannot be created through this endpoint',
    })
  }

  // Validate userType
  if (!['TEAM_LEADER', 'INDIVIDUAL'].includes(userType)) {
    throw createError({
      statusCode: 400,
      message: 'Invalid user type',
    })
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw createError({
      statusCode: 400,
      message: 'Invalid email format',
    })
  }

  // Validate WhatsApp number (Egypt: +20 followed by 10 digits)
  const whatsappRegex = /^\+20\d{10}$/
  if (!whatsappRegex.test(whatsappNumber)) {
    throw createError({
      statusCode: 400,
      message: 'WhatsApp number must be in format +20XXXXXXXXXX (Egypt)',
    })
  }

  // Validate password length
  if (password.length < 8) {
    throw createError({
      statusCode: 400,
      message: 'Password must be at least 8 characters',
    })
  }

  // Validate gender
  if (!['MALE', 'FEMALE', 'OTHER'].includes(gender)) {
    throw createError({
      statusCode: 400,
      message: 'Invalid gender',
    })
  }

  // Check if email already exists
  const existingUser = await db.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    throw createError({
      statusCode: 409,
      message: 'Email already registered',
    })
  }

  // Hash password
  const hashedPassword = await hashPassword(password)

  // Generate OTP
  const otp = generateOTP()
  const otpExpiry = getOTPExpiry(15)

  // Create user
  const user = await db.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      whatsappNumber,
      gender,
      userType,
      otp,
      otpExpiry,
      emailVerified: false,
      onboardingCompleted: false,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
    },
  })

  // Send OTP email
  try {
    await sendOTPEmail(email, otp, 'verification')
  } catch (error) {
    // Log error but don't fail the request
    console.error('Failed to send OTP email:', error)
  }

  return {
    success: true,
    message: 'User created successfully. Please check your email for verification OTP.',
    user,
  }
})

