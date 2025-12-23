import db from "../../utils/db";
import { basicValidation } from "../../utils/auth";

export default defineEventHandler(async (event) => {
  await basicValidation(event, ["GET"]);

  const query = getQuery(event);
  const userType = query.userType as string;
  const skillName = query.skillName as string;
  const hasTeam = query.hasTeam as string;
  const page = Math.max(1, Number(query.page || 1));
  const limit = Math.min(100, Math.max(1, Number(query.limit || 10)));

  const where: any = {};

  // Filter by user type
  if (["TEAM_LEADER", "INDIVIDUAL", "ADMIN"].includes(userType)) {
    where.userType = userType;
  }

  // Filter by hasTeam
  if (hasTeam === "true") {
    where.hasTeam = true;
  } else if (hasTeam === "false") {
    where.hasTeam = false;
  }

  // Filter by skill name - users who have this skill
  if (skillName) {
    where.techSkills = {
      some: {
        skillName: skillName,
      },
    };
  }

  // 2. Single Query fetch with Count Aggregation
  const [users, totalCount] = await Promise.all([
    db.user.findMany({
      where,
      select: {
        id: true,
        firstName: true,
        whatsappNumber: true,
        gender: true,
        userType: true,
        hasTeam: true,
        email: true,
        techSkills: { select: { proficiency: true } },
        _count: { select: { techSkills: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.user.count({ where }),
  ]);

  // 3. Clean Transformation
  const formattedUsers = users.map(({ techSkills, _count, ...user }) => ({
    ...user,
    skillCount: _count.techSkills,
    skillTotalPoints: techSkills.reduce((sum, s) => sum + s.proficiency, 0),
  }));

  return {
    success: true,
    users: formattedUsers,
    pagination: {
      total: totalCount,
      page,
      totalPages: Math.ceil(totalCount / limit),
    },
  };
});
