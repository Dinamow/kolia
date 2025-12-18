export default defineNuxtRouteMiddleware(async (to, from) => {
  try {
    // On server: Forward incoming cookies to internal API call for SSR
    // On client: credentials: 'include' sends cookie automatically
    const headers: Record<string, string> = {};
    if (import.meta.server) {
      const event = useRequestEvent();
      const cookieHeader = event?.node?.req?.headers?.cookie;
      if (cookieHeader) {
        headers['cookie'] = cookieHeader;
      }
    }

    const response = await $fetch("/api/auth/me", { 
      credentials: 'include',
      headers,
    });
    
    if (!response.success) {
      return navigateTo("/login");
    }
  } catch (error) {
    console.error(error);
    return navigateTo("/login");
  }
});
