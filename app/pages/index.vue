<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="inset-0 absolute z-0 overflow-hidden opacity-60">
      <NuxtImg src="/hero.jpg" alt="Background Image" class="w-full h-full object-cover" layout="fill" priority />
    </div>
    <div class="text-center z-10 p-6 bg-white bg-opacity-80 rounded-lg shadow-lg">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Welcome to Teamy Project</h1>
      <p class="text-gray-600">Help you to find your team</p>
      <div class="flex gap-4 justify-center">
        <NuxtLink to="/login">
          <MyButton variant="primary">Login</MyButton>
        </NuxtLink>
        <NuxtLink to="/signup">
          <MyButton variant="outline">Sign Up</MyButton>
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
