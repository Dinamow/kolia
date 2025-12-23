import { TechSkillSchema } from "../../../utils/validation";
import { getCurrentUserFromEvent } from "../../../utils/auth";
import prisma from "../../../utils/db";

export default defineEventHandler(async (event) => {
  try {
    // Authenticate user
    const user = await getCurrentUserFromEvent(event);

    if (!user) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized",
      });
    }

    const method = event.method;

    // GET - Get all skills for the current user
    if (method === "GET") {
      const skills = await prisma.techSkill.findMany({
        where: {
          userId: user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return {
        success: true,
        data: skills,
      };
    }

    // POST - Add a new skill
    if (method === "POST") {
      const body = await readBody(event);

      // Validate request body
      const validatedData = TechSkillSchema.parse(body);

      // Create the skill
      const newSkill = await prisma.techSkill.create({
        data: {
          userId: user.id,
          skillName: validatedData.skillName,
          proficiency: validatedData.proficiency,
          notes: validatedData.notes,
        },
      });

      return {
        success: true,
        message: "Skill added successfully",
        data: newSkill,
      };
    }

    throw createError({
      statusCode: 405,
      message: "Method not allowed",
    });
  } catch (error: any) {
    console.error("Error in /api/profile/skills:", error);

    if (error.name === "ZodError") {
      throw createError({
        statusCode: 400,
        message: error.errors[0]?.message || "Validation failed",
      });
    }

    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
  }
});
