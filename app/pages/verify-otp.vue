<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Verify your email
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Enter the OTP sent to <strong>{{ email }}</strong>
        </p>
      </div>
      <UForm :state="form" class="mt-8 space-y-6" @submit="onSubmit">
        <UFormGroup label="OTP Code" name="otp" required>
          <UInput
            v-model="form.otp"
            placeholder="000000"
            maxlength="6"
            class="text-center text-2xl tracking-widest"
            @input="formatOTP"
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
          Verify Email
        </UButton>
      </UForm>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

const route = useRoute()
const email = computed(() => route.query.email as string || '')

if (!email.value) {
  await navigateTo('/signup')
}

const form = reactive({
  otp: '',
})

const loading = ref(false)
const error = ref('')

const formatOTP = (event: Event) => {
  const input = event.target as HTMLInputElement
  form.otp = input.value.replace(/\D/g, '').slice(0, 6)
}

const onSubmit = async () => {
  error.value = ''

  if (!form.otp || form.otp.length !== 6) {
    error.value = 'Please enter a valid 6-digit OTP'
    return
  }

  loading.value = true

  try {
    const response = await $fetch('/api/auth/verify-otp', {
      method: 'POST',
      body: {
        email: email.value,
        otp: form.otp,
      },
    })

    // Redirect based on onboarding status
    if (response.user.onboardingCompleted) {
      await navigateTo('/dashboard')
    } else {
      await navigateTo('/onboarding/tech-skills')
    }
  } catch (err: unknown) {
    const errorData = err as { data?: { message?: string }; message?: string }
    error.value = errorData.data?.message || errorData.message || 'Invalid OTP'
  } finally {
    loading.value = false
  }
}
</script>

