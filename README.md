# Kolia - Authentication & Onboarding System

A complete authentication and onboarding system built with Nuxt 4, Prisma, PostgreSQL, and Nuxt UI.

## Features

- ✅ User signup with email verification (OTP)
- ✅ Login with email/password
- ✅ Forgot/Reset password with OTP
- ✅ Tech skills onboarding (first-time users)
- ✅ User types: Team Leader, Individual, Admin
- ✅ Gender selection
- ✅ WhatsApp number validation (Egypt format: +20XXXXXXXXXX)
- ✅ Admin creation via terminal script only
- ✅ User listing with filtering by user type

## Tech Stack

- **Frontend**: Nuxt 4, Nuxt UI, Vue 3, TypeScript
- **Backend**: Nuxt Server Routes, Prisma, PostgreSQL
- **Authentication**: JWT tokens
- **Email**: Nodemailer for OTP delivery
- **Password Hashing**: bcryptjs

## Prerequisites

- Node.js 18+ and Yarn
- PostgreSQL database
- Email service credentials (Gmail or other SMTP)

## Setup Instructions

### 1. Install Dependencies

```bash
yarn install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/Teamy?schema=public"

# JWT Secret (change this in production!)
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRES_IN="7d"

# Email Configuration (Nodemailer)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
SMTP_FROM="your-email@gmail.com"

# Node Environment
NODE_ENV="development"
```

**For Gmail:**
- Enable 2-factor authentication
- Generate an App Password: https://myaccount.google.com/apppasswords
- Use the app password in `SMTP_PASSWORD`

### 3. Set Up Database

```bash
# Generate Prisma Client
yarn prisma generate

# Run migrations (creates database tables)
yarn prisma migrate dev --name init

# Optional: Open Prisma Studio to view data
yarn prisma studio
```

### 4. Create Admin User (Terminal Only)

```bash
yarn create-admin
```

Follow the prompts to create an admin user. Admin users can only be created through this script, not via the signup endpoint.

### 5. Start Development Server

```bash
yarn dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
kolia/
├── app/
│   ├── pages/
│   │   ├── signup.vue          # Signup page
│   │   ├── login.vue           # Login page
│   │   ├── verify-otp.vue      # Email verification
│   │   ├── forgot-password.vue # Forgot password
│   │   ├── reset-password.vue  # Reset password
│   │   ├── dashboard.vue       # Dashboard (protected)
│   │   └── onboarding/
│   │       └── tech-skills.vue # Tech skills onboarding
│   └── middleware/
│       └── auth.ts              # Auth middleware for pages
├── server/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── signup.ts
│   │   │   ├── verify-otp.ts
│   │   │   ├── login.ts
│   │   │   ├── forgot-password.ts
│   │   │   ├── verify-reset-otp.ts
│   │   │   ├── reset-password.ts
│   │   │   └── me.ts
│   │   ├── onboarding/
│   │   │   └── tech-skills.ts
│   │   └── users/
│   │       └── index.ts
│   ├── middleware/
│   │   └── auth.ts              # Server-side auth middleware
│   └── utils/
│       ├── db.ts                # Prisma client
│       ├── auth.ts              # JWT utilities
│       ├── password.ts           # Password hashing
│       ├── otp.ts               # OTP generation
│       └── email.ts              # Email service
├── prisma/
│   └── schema.prisma            # Database schema
└── scripts/
    └── create-admin.ts          # Admin creation script
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - User registration
- `POST /api/auth/verify-otp` - Verify email OTP
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset OTP
- `POST /api/auth/verify-reset-otp` - Verify reset OTP
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/me` - Get current user

### Onboarding

- `POST /api/onboarding/tech-skills` - Submit tech skills (protected)

### Users

- `GET /api/users?userType=TEAM_LEADER` - Get users with optional filter (protected)

## User Flow

1. **Signup** → User fills form (first name, last name, email, password, WhatsApp, gender, user type)
2. **Email Verification** → User receives OTP via email and verifies
3. **Auto Login** → User is automatically logged in after verification
4. **Onboarding** → First-time users complete tech skills onboarding
5. **Dashboard** → User is redirected to dashboard

## Database Schema

### User Model
- Basic info: firstName, lastName, email, password
- Contact: whatsappNumber (Egypt format)
- Profile: gender, userType (TEAM_LEADER | INDIVIDUAL | ADMIN)
- Flags: hasTeam (for individuals), emailVerified, onboardingCompleted
- OTP fields: otp, otpExpiry, resetPasswordOtp, resetPasswordOtpExpiry

### TechSkill Model
- userId (relation to User)
- skillName
- proficiency (0-10)
- notes (optional)

## Security Features

- Passwords are hashed using bcryptjs
- JWT tokens for authentication
- OTP expiration (15 minutes)
- Email verification required before login
- Admin users can only be created via terminal script
- Protected routes with middleware

## Development

```bash
# Generate Prisma Client after schema changes
yarn prisma generate

# Create and apply migrations
yarn prisma migrate dev

# Open Prisma Studio
yarn prisma studio

# Create admin user
yarn create-admin
```

## Production

```bash
# Build for production
yarn build

# Preview production build
yarn preview
```

## Notes

- WhatsApp numbers must be in Egypt format: +20 followed by 10 digits
- OTP codes expire after 15 minutes
- Admin userType cannot be selected during signup
- Individual users have a `hasTeam` flag
- Tech skills onboarding is required for first-time users
- All protected routes require authentication

## License

MIT
