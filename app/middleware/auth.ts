export default defineNuxtRouteMiddleware(async (to, from) => {
  try {
    const response = await $fetch("/api/auth/me");

    if (!response.success) {
      return navigateTo("/login");
    }
  } catch (error) {
    return navigateTo("/login");
  }
});
