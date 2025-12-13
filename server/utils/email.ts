import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function sendOTPEmail(email: string, otp: string, type: 'verification' | 'reset' = 'verification'): Promise<void> {
  const subject = type === 'verification'
    ? 'Email Verification OTP'
    : 'Password Reset OTP'

  const text = type === 'verification'
    ? `Your email verification OTP is: ${otp}. This OTP will expire in 15 minutes.`
    : `Your password reset OTP is: ${otp}. This OTP will expire in 15 minutes.`

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>${subject}</h2>
      <p>Your OTP code is:</p>
      <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
        ${otp}
      </div>
      <p>This OTP will expire in 15 minutes.</p>
      <p>If you didn't request this, please ignore this email.</p>
    </div>
  `

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject,
    text,
    html,
  })
}

