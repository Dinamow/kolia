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
        <UFormGroup label="First Name" name="firstName" required>
          <UInput v-model="form.firstName" placeholder="John" />
        </UFormGroup>

        <UFormGroup label="Last Name" name="lastName" required>
          <UInput v-model="form.lastName" placeholder="Doe" />
        </UFormGroup>

        <UFormGroup label="Email" name="email" required>
          <UInput v-model="form.email" type="email" placeholder="john@example.com" />
        </UFormGroup>

        <UFormGroup label="Password" name="password" required>
          <UInput v-model="form.password" type="password" placeholder="••••••••" />
        </UFormGroup>

        <UFormGroup label="Confirm Password" name="confirmPassword" required>
          <UInput v-model="form.confirmPassword" type="password" placeholder="••••••••" />
        </UFormGroup>

        <UFormGroup label="WhatsApp Number" name="whatsappNumber" required>
          <UInput v-model="form.whatsappNumber" placeholder="+20XXXXXXXXXX" />
          <template #hint>
            Egypt format: +20 followed by 10 digits
          </template>
        </UFormGroup>

        <UFormGroup label="Gender" name="gender" required>
          <USelect
            v-model="form.gender"
            :options="genderOptions"
            placeholder="Select gender"
          />
        </UFormGroup>

        <UFormGroup label="User Type" name="userType" required>
          <URadioGroup
            v-model="form.userType"
            :options="userTypeOptions"
          />
        </UFormGroup>

        <UAlert
          v-if="error"
          color="error"
          variant="soft"
          :title="error"
          class="mt-4"
        />

        <UButton
          type="submit"
          block
          :loading="loading"
          class="mt-6"
        >
          Sign Up
        </UButton>
      </UForm>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  whatsappNumber: '+20',
  gender: '',
  userType: 'INDIVIDUAL',
})

const genderOptions = [
  { label: 'Male', value: 'MALE' },
  { label: 'Female', value: 'FEMALE' },
  { label: 'Other', value: 'OTHER' },
]

const userTypeOptions = [
  { label: 'Team Leader', value: 'TEAM_LEADER' },
  { label: 'Individual', value: 'INDIVIDUAL' },
]

const loading = ref(false)
const error = ref('')

const onSubmit = async () => {
  error.value = ''

  // Validation
  if (!form.firstName || !form.lastName || !form.email || !form.password || !form.confirmPassword || !form.whatsappNumber || !form.gender) {
    error.value = 'All fields are required'
    return
  }

  if (form.password !== form.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }

  if (form.password.length < 8) {
    error.value = 'Password must be at least 8 characters'
    return
  }

  const whatsappRegex = /^\+20\d{10}$/
  if (!whatsappRegex.test(form.whatsappNumber)) {
    error.value = 'WhatsApp number must be in format +20XXXXXXXXXX (10 digits after +20)'
    return
  }

  loading.value = true

  try {
    await $fetch('/api/auth/signup', {
      method: 'POST',
      body: {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        whatsappNumber: form.whatsappNumber,
        gender: form.gender,
        userType: form.userType,
      },
    })

    // Redirect to verify OTP page
    await navigateTo({
      path: '/verify-otp',
      query: { email: form.email },
    })
  } catch (err: unknown) {
    const errorData = err as { data?: { message?: string }; message?: string }
    error.value = errorData.data?.message || errorData.message || 'An error occurred'
  } finally {
    loading.value = false
  }
}
</script>

