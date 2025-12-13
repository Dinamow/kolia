export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie('auth-token')

  if (!token.value) {
    return navigateTo('/login')
  }

  try {
    const response = await $fetch('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    })

    if (!response.user) {
      return navigateTo('/login')
    }
  } catch (error) {
    return navigateTo('/login')
  }
})

