<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Forgot Password
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Enter your email to receive a password reset OTP
        </p>
      </div>
      <UForm :state="form" class="mt-8 space-y-6" @submit="onSubmit">
        <UFormField label="Email" name="email" required>
          <UInput
            v-model="form.email"
            type="email"
            placeholder="john@example.com"
            class="w-full"
          />
        </UFormField>

        <UAlert
          v-if="error"
          color="error"
          variant="soft"
          :title="error"
          class="mt-4"
        />

        <UAlert
          v-if="success"
          color="success"
          variant="soft"
          :title="success"
          class="mt-4"
        />

        <UButton type="submit" block :loading="loading" class="mt-6">
          Send Reset OTP
        </UButton>

        <div class="text-center">
          <NuxtLink
            to="/login"
            class="text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            Back to login
          </NuxtLink>
        </div>
      </UForm>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

const form = reactive({
  email: "",
});

const loading = ref(false);
const error = ref("");
const success = ref("");

const onSubmit = async () => {
  error.value = "";
  success.value = "";

  if (!form.email) {
    error.value = "Email is required";
    return;
  }

  loading.value = true;

  try {
    const response = await $fetch("/api/auth/forgot-password", {
      method: "POST",
      body: {
        email: form.email,
      },
    });

    success.value = response.message;
    // Redirect to reset password page after a short delay
    setTimeout(async () => {
      await navigateTo({
        path: "/reset-password",
        query: { email: form.email },
      });
    }, 2000);
  } catch (err: unknown) {
    const errorData = err as { data?: { message?: string }; message?: string };
    error.value =
      errorData.data?.message || errorData.message || "An error occurred";
  } finally {
    loading.value = false;
  }
};
</script>
