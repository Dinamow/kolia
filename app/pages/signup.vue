<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <NuxtLink to="/login" class="font-medium text-primary-600 hover:text-primary-500">
            sign in to your account
          </NuxtLink>
        </p>
      </div>
      <UForm :state="form" class="mt-8 space-y-6" @submit="onSubmit">
        <UFormField label="First Name" name="firstName" required>
          <UInput v-model="form.firstName" placeholder="John" class="w-full" />
        </UFormField>

        <UFormField label="Last Name" name="lastName" required>
          <UInput v-model="form.lastName" placeholder="Doe" class="w-full" />
        </UFormField>

        <UFormField label="Email" name="email" required>
          <UInput v-model="form.email" type="email" placeholder="john@example.com" class="w-full" />
        </UFormField>

        <UFormField label="Password" name="password" required>
          <div class="relative">
            <UInput v-model="form.password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••"
              class="w-full pr-10" />
            <button type="button" @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
              <Icon v-if="showPassword" name="mdi:eye-off" />
              <Icon v-else name="mdi:eye" />
            </button>
          </div>
        </UFormField>

        <UFormField label="Confirm Password" name="confirmPassword" required>
          <UInput v-model="form.confirmPassword" type="password" placeholder="••••••••" class="w-full" />
        </UFormField>

        <UFormField label="WhatsApp Number" name="whatsappNumber" required>
          <UInput v-model="form.whatsappNumber" placeholder="+20XXXXXXXXXX" class="w-full" />
        </UFormField>

        <UFormField label="Gender" name="gender" required>
          <URadioGroup v-model="form.gender" :items="genderOptions" :options="genderOptions" class="w-full" />
        </UFormField>

        <UFormField label="User Type" name="userType" required>

          <URadioGroup v-model="form.userType" :items="userTypeOptions" :options="userTypeOptions" class="w-full" />
        </UFormField>

        <UAlert v-if="error" color="error" variant="soft" :title="error" class="mt-4" />

        <UButton type="submit" block :loading="loading" class="mt-6">
          Sign Up
        </UButton>
      </UForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  SignupFormSchema,
  type SignupFormInput,
} from "../../server/utils/validation";

definePageMeta({
  layout: false,
});

const form = reactive<SignupFormInput>({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  whatsappNumber: "+20",
  gender: "MALE",
  userType: "INDIVIDUAL",
});

const showPassword = ref(false);

const genderOptions = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
];

const userTypeOptions = [
  { label: "Team Leader", value: "TEAM_LEADER" },
  { label: "Individual", value: "INDIVIDUAL" },
];

const loading = ref(false);
const error = ref("");

const onSubmit = async () => {
  error.value = "";

  // Validate with Zod
  const result = SignupFormSchema.safeParse(form);

  if (!result.success) {
    // Get the first error message
    const firstError = result.error.issues[0];
    error.value = firstError?.message || "Validation failed";
    return;
  }

  loading.value = true;

  try {
    // Extract confirmPassword before sending to API
    const { confirmPassword, ...signupData } = result.data;

    await $fetch("/api/auth/signup", {
      method: "POST",
      body: signupData,
    });

    // Redirect to verify OTP page
    await navigateTo({
      path: "/verify-otp",
      query: { email: result.data.email },
    });
  } catch (err: unknown) {
    const errorData = err as { data?: { message?: string }; message?: string };
    error.value =
      errorData.data?.message || errorData.message || "An error occurred";
  } finally {
    loading.value = false;
  }
};
</script>
