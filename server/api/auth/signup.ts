import db from "../../utils/db";
import { hashPassword } from "../../utils/password";
import { generateOTP, getOTPExpiry } from "../../utils/otp";
import { sendOTPEmail } from "../../utils/email";
import { SignupSchema } from "../../utils/validation";

export default defineEventHandler(async (event) => {
  if (event.method !== "POST") {
    throw createError({
      statusCode: 405,
      message: "Method not allowed",
    });
  }

  const body = await readBody(event);

  // Validate with Zod
  const result = SignupSchema.safeParse(body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: result.error.message,
      data: result.error.issues,
    });
  }

  const {
    firstName,
    lastName,
    email,
    password,
    whatsappNumber,
    gender,
    userType,
  } = result.data;

  // Reject ADMIN userType from endpoint (extra safety check)
  if (userType.toUpperCase() === "ADMIN") {
    throw createError({
      statusCode: 403,
      message: "Admin users cannot be created through this endpoint",
    });
  }

  // Check if email already exists
  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw createError({
      statusCode: 409,
      message: "Email already registered",
    });
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Generate OTP
  const otp = generateOTP();
  const otpExpiry = getOTPExpiry(15);

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
  });

  // Send OTP email
  try {
    await sendOTPEmail(email, otp, "verification");
  } catch (error) {
    // Log error but don't fail the request
    console.error("Failed to send OTP email:", error);
  }

  return {
    success: true,
    message:
      "User created successfully. Please check your email for verification OTP.",
    user,
  };
});
