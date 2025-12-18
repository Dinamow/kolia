import jwt from "jsonwebtoken";
import db from "./db";
import type { H3Event, EventHandlerRequest } from "h3";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export interface JWTPayload {
  userId: string;
  email: string;
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  } as jwt.SignOptions);
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

async function getCurrentUser(token: string | null) {
  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) return null;

  const user = await db.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      userType: true,
      emailVerified: true,
      onboardingCompleted: true,
    },
  });

  return user;
}

export async function getCurrentUserFromEvent(
  event: H3Event<EventHandlerRequest>
) {
  const token = getCookie(event, "auth_token") || null;
  return getCurrentUser(token);
}

export function basicValidation(
  event: H3Event<EventHandlerRequest>,
  methods: string[]
) {
  if (!methods.includes(event.method)) {
    throw createError({
      statusCode: 405,
      message: "Method not allowed",
    });
  }
  if (!event.context.user) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }
  return event.context.user;
}
