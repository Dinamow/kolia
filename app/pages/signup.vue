<template>
  <div class="min-h-screen bg-gradient-to-br from-white to-cornflower-50 flex auth-page">
    <!-- Left Section: Illustration -->
    <div
      class="hidden lg:flex lg:w-1/2 items-center justify-center bg-gradient-to-br from-cornflower-600 to-cornflower-700 p-12">
      <div class="text-center flex flex-col items-center text-white">
        <img width="48" height="48" src="https://img.icons8.com/pulsar-color/48/related-companies.png"
          alt="related-companies" class="animated-icon" />
        <h3 class="text-4xl font-bold mb-4">Join Our Community</h3>
        <p class="text-cornflower-100 text-lg max-w-sm">
          Create an account and start collaborating with your team today.
        </p>
      </div>
    </div>

    <!-- Right Section: Form -->
    <div
      class="w-full lg:w-1/2 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-12 overflow-y-auto max-h-screen">
      <div class="w-full max-w-md">
        <!-- Header -->
        <div class="text-center mb-8">
          <h2 class="text-4xl font-bold text-cornflower-900 mb-2">
            Create your account
          </h2>
        </div>
        <UForm :state="form" class="space-y-6" @submit="onSubmit">
          <div class="grid grid-cols-2 gap-4">
            <MyInput v-model="form.firstName" type="text" label="First Name" name="firstName" placeholder="John"
              variant="outline" required />
            <MyInput v-model="form.lastName" type="text" label="Last Name" name="lastName" placeholder="Doe"
              variant="outline" required />
          </div>

          <MyInput v-model="form.email" type="email" label="Email Address" name="email" placeholder="john@example.com"
            variant="outline" required />

          <MyInput v-model="form.password" :type="showPassword ? 'text' : 'password'" label="Password" name="password"
            placeholder="••••••••" variant="outline" required>
            <template #append>
              <button type="button" @click="showPassword = !showPassword"
                class="text-sm font-medium text-primary hover:text-cornflower-700 focus:outline-none transition-colors">
                {{ showPassword ? "Hide" : "Show" }}
              </button>
            </template>
          </MyInput>

          <MyInput v-model="form.confirmPassword" type="password" label="Confirm Password" name="confirmPassword"
            placeholder="••••••••" variant="outline" required />

          <MyInput v-model="form.whatsappNumber" type="tel" label="WhatsApp Number" name="whatsappNumber"
            placeholder="+20XXXXXXXXXX" variant="outline" required />

          <div class="grid grid-cols-2 gap-4">
            <UFormField label="Gender" name="gender" required>
              <URadioGroup v-model="form.gender" :items="genderOptions" :options="genderOptions" color="neutral"
                class="w-full" />
            </UFormField>

            <UFormField label="User Type" name="userType" required>
              <URadioGroup v-model="form.userType" :items="userTypeOptions" :options="userTypeOptions" color="neutral"
                class="w-full" />
            </UFormField>
          </div>

          <UAlert v-if="error" color="error" variant="soft" :title="error" class="mt-4" />

          <MyButton variant="primary" type="submit" :loading="loading" block>
            Sign Up
          </MyButton>
        </UForm>
        <p class="text-cornflower-600">
          Already have an account?
          <NuxtLink to="/login" class="font-semibold text-cornflower-600 hover:text-cornflower-700 transition-colors">
            Sign in here
          </NuxtLink>
        </p>
      </div>
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

<style scoped>
@keyframes float {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-20px);
  }
}

.my-form-field :deep([data-slot="label"]) {
  color: var(--label-color, var(--color-cornflower-900)) !important;
}

.animated-icon {
  animation: float 3s ease-in-out infinite;
}

/* Page-scoped overrides for Nuxt UI form labels and radio controls */
.auth-page :deep([data-slot="label"]) {
  color: var(--color-primary) !important;
}

.auth-page :deep([data-state="checked"] [data-slot="label"]) {
  color: var(--color-primary) !important;
}

.auth-page :deep([data-slot="indicator"]) {
  background-color: var(--color-primary) !important;
}

.auth-page :deep([data-slot="base"]:focus-visible) {
  outline-color: var(--color-primary) !important;
}

.auth-page :deep([data-slot="label"]::after) {
  color: var(--color-primary) !important;
}

.auth-page :deep(input[type="radio"]) {
  accent-color: var(--color-primary);
}

.auth-page :deep(input[type="radio"]:focus-visible) {
  outline: 2px solid var(--color-cornflower-400);
  outline-offset: 2px;
}
</style>
