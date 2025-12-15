<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset Password
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Enter the OTP and your new password
        </p>
      </div>
      <UForm :state="form" class="mt-8 space-y-6" @submit="onSubmit">
        <UFormField label="OTP Code" name="otp" required>
          <UInput
            v-model="form.otp"
            placeholder="000000"
            maxlength="6"
            class="w-full text-center text-2xl tracking-widest"
            @input="formatOTP"
          />
        </UFormField>

        <UFormField label="New Password" name="newPassword" required>
          <UInput
            v-model="form.newPassword"
            type="password"
            placeholder="••••••••"
            class="w-full"
          />
        </UFormField>

        <UFormField
          label="Confirm New Password"
          name="confirmPassword"
          required
        >
          <UInput
            v-model="form.confirmPassword"
            type="password"
            placeholder="••••••••"
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

        <UButton type="submit" block :loading="loading" class="mt-6">
          Reset Password
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

const route = useRoute();
const email = computed(() => (route.query.email as string) || "");

if (!email.value) {
  await navigateTo("/forgot-password");
}

const form = reactive({
  otp: "",
  newPassword: "",
  confirmPassword: "",
});

const loading = ref(false);
const error = ref("");

const formatOTP = (event: Event) => {
  const input = event.target as HTMLInputElement;
  form.otp = input.value.replace(/\D/g, "").slice(0, 6);
};

const onSubmit = async () => {
  error.value = "";

  if (!form.otp || form.otp.length !== 6) {
    error.value = "Please enter a valid 6-digit OTP";
    return;
  }

  if (!form.newPassword || form.newPassword.length < 8) {
    error.value = "Password must be at least 8 characters";
    return;
  }

  if (form.newPassword !== form.confirmPassword) {
    error.value = "Passwords do not match";
    return;
  }

  loading.value = true;

  try {
    await $fetch("/api/auth/reset-password", {
      method: "POST",
      body: {
        email: email.value,
        otp: form.otp,
        newPassword: form.newPassword,
      },
    });

    // Redirect to login page
    await navigateTo("/login");
  } catch (err: unknown) {
    const errorData = err as { data?: { message?: string }; message?: string };
    error.value =
      errorData.data?.message || errorData.message || "An error occurred";
  } finally {
    loading.value = false;
  }
};
</script>
