import { getCurrentUser } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth-token') ||
                getHeader(event, 'authorization')?.replace('Bearer ', '')

  const user = await getCurrentUser(token || null)

  if (user) {
    event.context.user = user
  }
})

