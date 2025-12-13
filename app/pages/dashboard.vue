<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p class="mt-2 text-gray-600">Welcome, {{ user?.firstName }} {{ user?.lastName }}!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: 'auth',
})

const user = ref(null)

onMounted(async () => {
  try {
    // Fetch current user info
    const response = await $fetch('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${useCookie('auth-token').value}`,
      },
    })
    user.value = response.user
  } catch (error) {
    console.error('Failed to fetch user:', error)
    await navigateTo('/login')
  }
})
</script>

