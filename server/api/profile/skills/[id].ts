import { z } from "zod";
import { getCurrentUserFromEvent } from "../../../utils/auth";
import prisma from "../../../utils/db";

// Partial schema for updating (all fields optional)
const UpdateTechSkillSchema = z.object({
  skillName: z.string().min(1, "Skill name is required").trim().optional(),
  proficiency: z
    .number()
    .min(0, "Proficiency must be at least 0")
    .max(10, "Proficiency must be at most 10")
    .optional(),
  notes: z.string().optional().nullable(),
});

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

    const skillId = getRouterParam(event, "id");

    if (!skillId) {
      throw createError({
        statusCode: 400,
        message: "Skill ID is required",
      });
    }

    // Verify the skill exists and belongs to the user
    const existingSkill = await prisma.techSkill.findUnique({
      where: {
        id: skillId,
      },
    });

    if (!existingSkill) {
      throw createError({
        statusCode: 404,
        message: "Skill not found",
      });
    }

    if (existingSkill.userId !== user.id) {
      throw createError({
        statusCode: 403,
        message: "You don't have permission to modify this skill",
      });
    }

    const method = event.method;

    // PATCH - Update a skill
    if (method === "PATCH") {
      const body = await readBody(event);

      // Validate request body
      const validatedData = UpdateTechSkillSchema.parse(body);

      // Update the skill
      const updatedSkill = await prisma.techSkill.update({
        where: {
          id: skillId,
        },
        data: validatedData,
      });

      return {
        success: true,
        message: "Skill updated successfully",
        data: updatedSkill,
      };
    }

    // DELETE - Delete a skill
    if (method === "DELETE") {
      await prisma.techSkill.delete({
        where: {
          id: skillId,
        },
      });

      return {
        success: true,
        message: "Skill deleted successfully",
      };
    }

    throw createError({
      statusCode: 405,
      message: "Method not allowed",
    });
  } catch (error: any) {
    console.error("Error in /api/profile/skills/[id]:", error);

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
