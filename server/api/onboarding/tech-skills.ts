import db from "../../utils/db";
import { getCurrentUser } from "../../utils/auth";
import { TechSkillsSchema } from "../../utils/validation";

export default defineEventHandler(async (event) => {
  if (event.method !== "POST") {
    throw createError({
      statusCode: 405,
      message: "Method not allowed",
    });
  }

  const token =
    getCookie(event, "auth-token") ||
    getHeader(event, "authorization")?.replace("Bearer ", "");

  const user = await getCurrentUser(token || null);

  if (!user) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  if (!user.emailVerified) {
    throw createError({
      statusCode: 403,
      message: "Please verify your email first",
    });
  }

  const body = await readBody(event);

  // Validate with Zod
  const result = TechSkillsSchema.safeParse(body);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      message: result.error.message,
      data: result.error.issues,
    });
  }

  const { skills } = result.data;

  // Delete existing skills for this user
  await db.techSkill.deleteMany({
    where: { userId: user.id },
  });

  // Create new skills
  await db.techSkill.createMany({
    data: skills.map((skill) => ({
      userId: user.id,
      skillName: skill.skillName.trim(),
      proficiency: skill.proficiency,
      notes: skill.notes?.trim() || null,
    })),
  });

  // Mark onboarding as completed
  await db.user.update({
    where: { id: user.id },
    data: {
      onboardingCompleted: true,
    },
  });

  return {
    success: true,
    message: "Tech skills saved successfully",
  };
});
