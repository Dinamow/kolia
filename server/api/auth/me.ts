import { basicValidation } from "../../utils/auth";

export default defineEventHandler(async (event) => {
  const user = await basicValidation(event, ["GET"]);

  if (!user) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  return {
    success: true,
    user,
  };
});
