import db from "../../utils/db";

export default defineEventHandler(async (event) => {
  if (event.method !== "GET") {
    throw createError({ statusCode: 405, statusMessage: "Method Not Allowed" });
  }
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request: Missing ID",
    });
  }
  try {
    const user = await db.user.findUnique({
      where: { id: id },
      include: {
        techSkills: true,
      },
    });

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: "User not found",
      });
    }

    return {
      status: 200,
      data: user,
    };
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
