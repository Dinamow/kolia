<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Welcome to Kolia</h1>
      <p class="text-gray-600 mb-8">Authentication & Onboarding System</p>
      <div class="space-x-4">
        <NuxtLink to="/login">
          <UButton>Login</UButton>
        </NuxtLink>
        <NuxtLink to="/signup">
          <UButton variant="outline">Sign Up</UButton>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})
</script>

