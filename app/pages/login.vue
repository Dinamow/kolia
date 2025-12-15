<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <NuxtLink
            to="/signup"
            class="font-medium text-primary-600 hover:text-primary-500"
          >
            create a new account
          </NuxtLink>
        </p>
      </div>
      <UForm :state="form" class="mt-8 space-y-6" @submit="onSubmit">
        <UFormField label="Email" name="email" required>
          <UInput
            class="w-full"
            v-model="form.email"
            type="email"
            placeholder="john@example.com"
          />
        </UFormField>

        <UFormField label="Password" name="password" required>
          <UInput
            v-model="form.password"
            type="password"
            placeholder="••••••••"
            class="w-full"
          />
        </UFormField>

        <div class="flex items-center justify-end">
          <NuxtLink
            to="/forgot-password"
            class="text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            Forgot password?
          </NuxtLink>
        </div>

        <UAlert
          v-if="error"
          color="error"
          variant="soft"
          :title="error"
          class="mt-4"
        />

        <UButton type="submit" block :loading="loading" class="mt-6">
          Sign In
        </UButton>
      </UForm>
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

    // Redirect based on onboarding status
    if (response.user.onboardingCompleted) {
      await navigateTo("/dashboard");
    } else {
      await navigateTo("/onboarding/tech-skills");
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
