export default defineNuxtRouteMiddleware(async (to, from) => {

  try {
    const response = await $fetch('/api/auth/me')

    if (!response.user) {
      return navigateTo('/login')
    }
  } catch (error) {
    return navigateTo('/login')
  }
})

