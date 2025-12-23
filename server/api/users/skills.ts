import db from "../../utils/db";
import { basicValidation } from "../../utils/auth";

export default defineEventHandler(async (event) => {
  const authUser = await basicValidation(event, ["GET"]);

  // Get all unique skill names
  const skills = await db.techSkill.findMany({
    select: {
      skillName: true,
    },
    distinct: ["skillName"],
    orderBy: {
      skillName: "asc",
    },
  });

  return {
    success: true,
    skills: skills.map((s) => s.skillName),
  };
});
