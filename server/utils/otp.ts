export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export function isOTPExpired(expiry: Date | null): boolean {
  if (!expiry) return true
  return new Date() > expiry
}

export function getOTPExpiry(minutes: number = 15): Date {
  const expiry = new Date()
  expiry.setMinutes(expiry.getMinutes() + minutes)
  return expiry
}

