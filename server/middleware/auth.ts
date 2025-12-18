import { getCurrentUserFromEvent } from "../utils/auth";

export default defineEventHandler(async (event) => {
  const user = await getCurrentUserFromEvent(event);

  if (user) {
    event.context.user = user;
  }
});
