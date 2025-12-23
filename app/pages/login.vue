<template>
  <div class="min-h-screen bg-gradient-to-br from-white to-cornflower-50 flex">
    <!-- Left Section: Illustration -->
    <div
      class="hidden lg:flex lg:w-1/2 items-center justify-center bg-gradient-to-br from-cornflower-600 to-cornflower-700 p-12">
      <div class="text-center flex flex-col items-center text-white">
        <img width="48" height="48" src="https://img.icons8.com/pulsar-color/48/related-companies.png"
          alt="related-companies" class="animated-icon" />
        <h3 class="text-4xl font-bold mb-4">Welcome Back</h3>
        <p class="text-cornflower-100 text-lg max-w-sm">
          Sign in to your account and continue building amazing things with your team.
        </p>
      </div>
    </div>

    <!-- Right Section: Form -->
    <div class="w-full lg:w-1/2 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-12">
      <div class="w-full max-w-md">
        <div class="flex  flex-col items-center justify-center">
          <img width="64" height="64" src="https://img.icons8.com/dusk/64/meeting.png" alt="meeting" />
          <h2 class="text-4xl font-bold text-cornflower-900 ml-4 mb-2 self-center">
            Sign In to Teamy
          </h2>
        </div>
        <!-- Form -->
        <UForm :state="form" class="space-y-6" @submit="onSubmit">
          <MyInput v-model="form.email" type="email" label="Email Address" name="email" placeholder="john@example.com"
            variant="outline" required />

          <MyInput v-model="form.password" :type="showPassword ? 'text' : 'password'" label="Password" name="password"
            placeholder="Enter your password" variant="outline" required>
            <template #append>
              <button type="button" @click="showPassword = !showPassword"
                class="text-sm font-medium text-primary hover:text-cornflower-700 focus:outline-none transition-colors">
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </template>
          </MyInput>

          <div class="flex items-center justify-end">
            <NuxtLink to="/forgot-password"
              class="text-sm font-medium text-cornflower-700 hover:text-cornflower-800 transition-colors">
              Forgot your password?
            </NuxtLink>
          </div>

          <UAlert v-if="error" color="error" variant="soft" :title="error" />

          <MyButton variant="solid" color="primary" type="submit" :loading="loading" block>
            Sign In
          </MyButton>
        </UForm>
        <div class="text-center mb-8">
          <p class="text-cornflower-600">
            Don't have an account?
            <NuxtLink to="/signup"
              class="font-semibold text-cornflower-700 hover:text-cornflower-800 transition-colors">
              Sign up here
            </NuxtLink>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LoginSchema, type LoginInput } from "../../server/utils/validation";

definePageMeta({
  layout: false,
});

const form = reactive<LoginInput>({
  email: "",
  password: "",
});

const loading = ref(false);
const error = ref("");
const showPassword = ref(false);

const onSubmit = async () => {
  error.value = "";

  // Validate with Zod
  const result = LoginSchema.safeParse(form);

  if (!result.success) {
    error.value = result.error.issues[0]?.message || "Validation failed";
    return;
  }

  loading.value = true;

  try {
    const response = await $fetch("/api/auth/login", {
      method: "POST",
      body: result.data,
    });

    if (response.user.onboardingCompleted) {
      await navigateTo("/dashboard");
    } else {
      await navigateTo("/onboarding/tech-skills", { replace: true });
    }
  } catch (err: unknown) {
    const errorData = err as { data?: { message?: string }; message?: string };
    error.value =
      errorData.data?.message || errorData.message || "An error occurred";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
@keyframes float {

  20% {
    rotate: -50deg;
  }

  50% {
    rotate: 360deg;
  }
}

.animated-icon {
  animation: float 5s linear infinite;
}
</style>
