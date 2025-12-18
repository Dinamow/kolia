import db from "../../utils/db";
import { basicValidation } from "../../utils/auth";

const ALLOWED_DATA_FOR_UPDATE = [
  "firstName",
  "lastName",
  "hasTeam",
  "whatsappNumber",
];

export default defineEventHandler(async (event) => {
  const user = await basicValidation(event, ["GET", "PATCH"]);
  if (event.method === "PATCH") {
    if (!user) {
      return { status: 401, message: "Unauthorized" };
    }
    try {
      const body = await readBody(event);
      const updateData: Record<string, any> = {};
      for (const key of ALLOWED_DATA_FOR_UPDATE) {
        if (body[key] !== undefined) {
          updateData[key] = body[key];
        }
      }
      await db.user.update({
        where: { id: user.id },
        data: updateData,
      });
      return { status: 200, message: "Profile updated successfully" };
    } catch (error) {
      return { status: 500, message: "Internal Server Error" };
    }
  }
  if (!user) {
    return { status: 401, message: "Unauthorized" };
  }
  try {
    const userData = await db.user.findUnique({
      where: { id: user.id },
    });
    return { status: 200, data: userData };
  } catch (error) {
    return { status: 500, message: "Internal Server Error" };
  }
});
