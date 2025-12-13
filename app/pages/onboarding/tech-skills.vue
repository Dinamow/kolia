<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <div class="mb-8">
        <h2 class="text-3xl font-extrabold text-gray-900 text-center">
          Tech Skills Onboarding
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Tell us about your technical skills. Rate each skill from 0 to 10.
        </p>
      </div>

      <UForm :state="form" class="space-y-6" @submit="onSubmit">
        <div v-for="(skill, index) in form.skills" :key="index" class="bg-white p-6 rounded-lg shadow space-y-4">
          <div class="flex items-start justify-between">
            <h3 class="text-lg font-medium text-gray-900">Skill {{ index + 1 }}</h3>
            <UButton
              v-if="form.skills.length > 1"
              color="error"
              variant="ghost"
              icon="i-heroicons-trash"
              @click="removeSkill(index)"
            />
          </div>

          <UFormGroup label="Skill Name" :name="`skill-${index}`" required>
            <UInput
              v-model="skill.skillName"
              placeholder="e.g., JavaScript, Python, React"
              :list="`skills-list-${index}`"
            />
            <datalist :id="`skills-list-${index}`">
              <option v-for="suggestion in skillSuggestions" :key="suggestion" :value="suggestion" />
            </datalist>
          </UFormGroup>

          <UFormGroup label="Proficiency (0-10)" :name="`proficiency-${index}`" required>
            <div class="space-y-2">
              <URange
                v-model="skill.proficiency"
                :min="0"
                :max="10"
                :step="1"
              />
              <div class="flex justify-between text-sm text-gray-500">
                <span>0 (Beginner)</span>
                <span class="font-medium">{{ skill.proficiency }}/10</span>
                <span>10 (Expert)</span>
              </div>
            </div>
          </UFormGroup>

          <UFormGroup label="Notes (Optional)" :name="`notes-${index}`">
            <UTextarea
              v-model="skill.notes"
              placeholder="Add any additional information about this skill..."
              :rows="2"
            />
          </UFormGroup>
        </div>

        <UButton
          type="button"
          variant="outline"
          icon="i-heroicons-plus"
          @click="addSkill"
          class="w-full"
        >
          Add Another Skill
        </UButton>

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
          size="lg"
          class="mt-6"
        >
          Complete Onboarding
        </UButton>
      </UForm>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: 'auth',
})

const skillSuggestions = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C++',
  'C#',
  'Go',
  'Rust',
  'React',
  'Vue',
  'Angular',
  'Node.js',
  'Express',
  'Django',
  'Flask',
  'Spring Boot',
  'SQL',
  'MongoDB',
  'PostgreSQL',
  'MySQL',
  'Redis',
  'Git',
  'Docker',
  'Kubernetes',
  'AWS',
  'Azure',
  'GCP',
  'Linux',
  'HTML',
  'CSS',
  'Tailwind CSS',
  'Bootstrap',
  'GraphQL',
  'REST API',
  'Microservices',
  'CI/CD',
]

const form = reactive({
  skills: [
    {
      skillName: '',
      proficiency: 5,
      notes: '',
    },
  ],
})

const loading = ref(false)
const error = ref('')

const addSkill = () => {
  form.skills.push({
    skillName: '',
    proficiency: 5,
    notes: '',
  })
}

const removeSkill = (index: number) => {
  form.skills.splice(index, 1)
}

const onSubmit = async () => {
  error.value = ''

  // Validate skills
  const validSkills = form.skills.filter(skill => skill.skillName.trim() !== '')
  
  if (validSkills.length === 0) {
    error.value = 'Please add at least one skill'
    return
  }

  // Validate proficiency
  for (const skill of validSkills) {
    if (skill.proficiency < 0 || skill.proficiency > 10) {
      error.value = 'Proficiency must be between 0 and 10'
      return
    }
  }

  loading.value = true

  try {
    await $fetch('/api/onboarding/tech-skills', {
      method: 'POST',
      body: {
        skills: validSkills.map(skill => ({
          skillName: skill.skillName.trim(),
          proficiency: skill.proficiency,
          notes: skill.notes?.trim() || undefined,
        })),
      },
    })

    // Redirect to dashboard
    await navigateTo('/dashboard')
  } catch (err: unknown) {
    const errorData = err as { data?: { message?: string }; message?: string }
    error.value = errorData.data?.message || errorData.message || 'An error occurred'
  } finally {
    loading.value = false
  }
}
</script>

