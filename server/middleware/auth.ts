import { getCurrentUserFromEvent } from "../utils/auth";

export default defineEventHandler(async (event) => {
  const user = await getCurrentUserFromEvent(event);
  const logger = (event.context as any).logger;
  if (logger?.info) {
    logger.info({ userEmail: user?.email }, 'auth middleware');
  } else {
    console.log(`user ${user?.email} was found`);
  }
  if (user) {
    event.context.user = user;
  }
  return;
});
