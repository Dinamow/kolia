import { PrismaClient } from '../lib/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg';
import * as readline from 'readline'
import * as bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const adapter = new PrismaPg({ 
  connectionString: process.env.DATABASE_URL 
});

const prisma = new PrismaClient({ adapter })

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve)
  })
}

async function createAdmin() {
  try {
    console.log('=== Create Admin User ===\n')

    const firstName = await question('First Name: ')
    const lastName = await question('Last Name: ')
    const email = await question('Email: ')
    const password = await question('Password: ')
    const whatsappNumber = await question('WhatsApp Number (+20XXXXXXXXXX): ')
    const gender = await question('Gender (MALE/FEMALE/OTHER): ')

    // Validate inputs
    if (!firstName || !lastName || !email || !password || !whatsappNumber || !gender) {
      console.error('All fields are required')
      process.exit(1)
    }

    if (!['MALE', 'FEMALE', 'OTHER'].includes(gender.toUpperCase())) {
      console.error('Invalid gender. Must be MALE, FEMALE, or OTHER')
      process.exit(1)
    }

    const whatsappRegex = /^\+20\d{10}$/
    if (!whatsappRegex.test(whatsappNumber)) {
      console.error('WhatsApp number must be in format +20XXXXXXXXXX (10 digits after +20)')
      process.exit(1)
    }

    if (password.length < 8) {
      console.error('Password must be at least 8 characters')
      process.exit(1)
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      console.error('Email already exists')
      process.exit(1)
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        whatsappNumber,
        gender: gender.toUpperCase() as 'MALE' | 'FEMALE' | 'OTHER',
        userType: 'ADMIN',
        emailVerified: true,
        onboardingCompleted: true,
      },
    })

    console.log('\n✅ Admin user created successfully!')
    console.log(`ID: ${admin.id}`)
    console.log(`Email: ${admin.email}`)
    console.log(`Name: ${admin.firstName} ${admin.lastName}`)
  } catch (error) {
    console.error('Error creating admin:', error)
    process.exit(1)
  } finally {
    rl.close()
    await prisma.$disconnect()
  }
}

createAdmin()

