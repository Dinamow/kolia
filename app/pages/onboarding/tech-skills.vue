<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header Section -->
      <div class="mb-10 text-center">
        <div
          class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cornflower-500 to-cornflower-600 rounded-2xl shadow-lg mb-4">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h2 class="text-4xl font-bold text-cornflower-900">
          Tech Skills Assessment
        </h2>
        <p class="mt-3 text-lg text-cornflower-600 max-w-2xl mx-auto">
          Share your technical expertise and proficiency levels to help us personalize your experience
        </p>

        <!-- Progress Indicator -->
        <div class="mt-6 flex items-center justify-center gap-2">
          <div class="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-cornflower-200">
            <span class="text-sm font-medium text-cornflower-900">{{form.skills.filter(s => s.skillName.trim()).length
            }}</span>
            <span class="text-sm text-cornflower-600">skill{{form.skills.filter(s => s.skillName.trim()).length !== 1 ?
              's' : ''}} added</span>
          </div>
        </div>
      </div>

      <UForm :state="form" class="space-y-5" @submit="onSubmit">
        <!-- Skills Cards -->
        <div v-for="(skill, index) in form.skills" :key="index"
          class="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
          <!-- Color indicator bar based on proficiency -->
          <div class="absolute top-0 left-0 h-1 w-full transition-all duration-300"
            :style="{ background: getSkillGradient(skill.proficiency) }"></div>

          <div class="p-6 sm:p-8">
            <!-- Header -->
            <div class="flex items-start justify-between mb-6">
              <div class="flex items-center gap-3">
                <div
                  class="flex items-center justify-center w-10 h-10 rounded-xl font-bold text-white text-sm transition-all duration-300 bg-gradient-to-r from-cornflower-500 to-cornflower-600">
                  {{ index + 1 }}
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-cornflower-900">
                    {{ skill.skillName || `Skill ${index + 1}` }}
                  </h3>
                  <p class="text-sm text-cornflower-600">
                    {{ getSkillLevel(skill.proficiency) }}
                  </p>
                </div>
              </div>
              <button v-if="form.skills.length > 1" type="button" @click="removeSkill(index)"
                class="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-red-600 hover:bg-red-100 rounded-md">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>

            <!-- Skill Name Input -->
            <UFormField label="Skill Name" :name="`skill-${index}`" required class="mb-5">
              <div class="relative">
                <UInput v-model="skill.skillName" @input="filterSkills(index)" @focus="showSuggestionsFor[index] = true"
                  @blur="hideSuggestions(index)" placeholder="e.g., JavaScript, Python, React, Docker..." size="lg"
                  class="w-full" />
                <!-- Custom Dropdown -->
                <div v-if="showSuggestionsFor[index] && filteredSuggestionsFor[index]?.length > 0"
                  class="absolute z-10 w-full mt-1 bg-white border border-cornflower-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  <button v-for="suggestion in filteredSuggestionsFor[index]" :key="suggestion" type="button"
                    @mousedown.prevent="selectSkill(index, suggestion)"
                    class="w-full px-4 py-2 text-left hover:bg-cornflower-50 transition-colors text-cornflower-900 focus:bg-cornflower-100 focus:outline-none">
                    {{ suggestion }}
                  </button>
                </div>
              </div>
            </UFormField>

            <!-- Proficiency Slider -->
            <UFormField label="Proficiency Level" :name="`proficiency-${index}`" required class="mb-5">
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-cornflower-900">Rate your expertise</span>
                  <div
                    class="px-4 py-1.5 rounded-full text-sm font-bold text-white shadow-md transition-all bg-gradient-to-r from-cornflower-500 to-cornflower-600">
                    {{ skill.proficiency }}/10
                  </div>
                </div>

                <!-- Custom Range Slider -->
                <div class="relative pt-2 pb-2">
                  <input type="range" v-model.number="skill.proficiency" :min="0" :max="10" :step="1"
                    class="w-full h-3 rounded-lg appearance-none cursor-pointer bg-cornflower-200 accent-cornflower-600" />
                </div>

                <!-- Quick Select Buttons -->
                <div class="flex flex-wrap gap-1.5 justify-between">
                  <button v-for="level in 11" :key="level - 1" type="button" @click="skill.proficiency = level - 1"
                    class="flex-1 min-w-[32px] px-2 py-1.5 text-xs font-medium rounded-lg transition-all hover:scale-105"
                    :class="skill.proficiency === level - 1
                      ? 'bg-gradient-to-r from-cornflower-500 to-cornflower-600 text-white shadow-md ring-2 ring-offset-1 ring-cornflower-300'
                      : 'bg-cornflower-100 text-cornflower-700 hover:bg-cornflower-200'">
                    {{ level - 1 }}
                  </button>
                </div>

                <!-- Skill Level Markers -->
                <div class="flex justify-between text-xs pt-1">
                  <div class="flex flex-col items-start">
                    <span class="font-medium text-cornflower-400">0-3</span>
                    <span class="text-cornflower-600">Beginner</span>
                  </div>
                  <div class="flex flex-col items-center">
                    <span class="font-medium text-cornflower-500">4-6</span>
                    <span class="text-cornflower-600">Intermediate</span>
                  </div>
                  <div class="flex flex-col items-center">
                    <span class="font-medium text-cornflower-600">7-8</span>
                    <span class="text-cornflower-600">Advanced</span>
                  </div>
                  <div class="flex flex-col items-end">
                    <span class="font-medium text-cornflower-700">9-10</span>
                    <span class="text-cornflower-600">Expert</span>
                  </div>
                </div>

                <!-- Level Description -->
                <div class="mt-3 p-3 rounded-lg bg-cornflower-50 border border-cornflower-100">
                  <p class="text-sm text-cornflower-900">
                    <span class="font-semibold">{{ getSkillLevel(skill.proficiency) }}:</span>
                    {{ getSkillDescription(skill.proficiency) }}
                  </p>
                </div>
              </div>
            </UFormField>
          </div>
        </div>

        <!-- Add Skill Button -->
        <button type="button" @click="addSkill"
          class="w-full group relative overflow-hidden bg-white hover:bg-cornflower-50 border-2 border-dashed border-cornflower-300 hover:border-cornflower-400 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
          <div class="flex items-center justify-center gap-3">
            <div
              class="w-10 h-10 rounded-full bg-gradient-to-br from-cornflower-500 to-cornflower-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span class="text-base font-semibold text-cornflower-700 group-hover:text-cornflower-900">
              Add Another Skill
            </span>
          </div>
        </button>

        <!-- Error Alert -->
        <UAlert v-if="error" color="error" variant="soft" :title="error" icon="i-heroicons-exclamation-triangle"
          class="mt-4" />

        <!-- Submit Button -->
        <div class="pt-4">
          <button type="submit" :disabled="loading"
            class="w-full px-6 py-4 bg-gradient-to-r from-cornflower-600 to-cornflower-700 hover:from-cornflower-700 hover:to-cornflower-800 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
            <span class="flex items-center justify-center gap-2">
              <span class="text-lg font-semibold">{{ loading ? 'Completing...' : 'Complete Onboarding' }}</span>
              <svg v-if="!loading" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <svg v-else class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                </path>
              </svg>
            </span>
          </button>
        </div>
      </UForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  TechSkillsSchema,
  type TechSkillsInput,
} from "../../../server/utils/validation";

definePageMeta({
  layout: false,
  middleware: "auth",
});

const skillSuggestions = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "C#",
  "Go",
  "Rust",
  "React",
  "Vue",
  "Angular",
  "Node.js",
  "Express",
  "Django",
  "Flask",
  "Spring Boot",
  "SQL",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "Git",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "GCP",
  "Linux",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Bootstrap",
  "GraphQL",
  "REST API",
  "Microservices",
  "CI/CD",
];

const form = reactive<TechSkillsInput>({
  skills: [
    {
      skillName: "",
      proficiency: 5,
      notes: "",
    },
  ],
});

const loading = ref(false);
const error = ref("");

// Custom dropdown state
const showSuggestionsFor = ref<Record<number, boolean>>({});
const filteredSuggestionsFor = ref<Record<number, string[]>>({});

// Filter skills based on input
const filterSkills = (index: number) => {
  const searchTerm = form.skills[index].skillName.toLowerCase();
  if (searchTerm.length === 0) {
    filteredSuggestionsFor.value[index] = skillSuggestions;
  } else {
    filteredSuggestionsFor.value[index] = skillSuggestions.filter(skill =>
      skill.toLowerCase().includes(searchTerm)
    );
  }
};

// Select a skill from dropdown
const selectSkill = (index: number, skill: string) => {
  form.skills[index].skillName = skill;
  showSuggestionsFor.value[index] = false;
};

// Hide suggestions with delay for click event
const hideSuggestions = (index: number) => {
  setTimeout(() => {
    showSuggestionsFor.value[index] = false;
  }, 200);
};

// Helper function to get skill level gradient color
const getSkillGradient = (proficiency: number): string => {
  if (proficiency >= 9) return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"; // Expert - Purple
  if (proficiency >= 7) return "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"; // Advanced - Blue
  if (proficiency >= 4) return "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"; // Intermediate - Green
  return "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"; // Beginner - Orange/Pink
};

// Helper function to get skill level text
const getSkillLevel = (proficiency: number): string => {
  if (proficiency >= 9) return "Expert";
  if (proficiency >= 7) return "Advanced";
  if (proficiency >= 4) return "Intermediate";
  return "Beginner";
};

// Helper function to get skill description
const getSkillDescription = (proficiency: number): string => {
  if (proficiency >= 9) return "Master level - Can mentor others and architect complex solutions";
  if (proficiency >= 7) return "Proficient - Can work independently on complex tasks";
  if (proficiency >= 4) return "Competent - Can handle most common tasks with guidance";
  return "Learning - Familiar with basics and eager to learn more";
};

const addSkill = () => {
  form.skills.push({
    skillName: "",
    proficiency: 5,
    notes: "",
  });
};

const removeSkill = (index: number) => {
  form.skills.splice(index, 1);
};

const onSubmit = async () => {
  error.value = "";

  // Filter out empty skills before validation
  const validSkills = form.skills.filter(
    (skill) => skill.skillName.trim() !== ""
  );

  // Validate with Zod
  const result = TechSkillsSchema.safeParse({ skills: validSkills });

  if (!result.success) {
    const firstIssue = result.error.issues[0];
    error.value = firstIssue?.message || "Validation failed";
    return;
  }

  loading.value = true;

  try {
    await $fetch("/api/onboarding/tech-skills", {
      method: "POST",
      body: result.data,
    });

    // Redirect to dashboard
    await navigateTo("/dashboard");
  } catch (err: unknown) {
    const errorData = err as { data?: { message?: string }; message?: string };
    error.value =
      errorData.data?.message || errorData.message || "An error occurred";
  } finally {
    loading.value = false;
  };
};
</script>

<style scoped>
/* Custom slider styling */
.skill-slider {
  -webkit-appearance: none;
  appearance: none;
  outline: none;
  transition: all 0.3s ease;
}

/* Slider thumb - Chrome/Safari */
.skill-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2), 0 0 0 3px rgba(59, 130, 246, 0.3);
  transition: all 0.2s ease;
  border: 2px solid #3b82f6;
}

.skill-slider::-webkit-slider-thumb:hover {
  transform: scale(1.15);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), 0 0 0 4px rgba(59, 130, 246, 0.4);
}

.skill-slider::-webkit-slider-thumb:active {
  transform: scale(1.05);
}

/* Slider thumb - Firefox */
.skill-slider::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2), 0 0 0 3px rgba(59, 130, 246, 0.3);
  transition: all 0.2s ease;
  border: 2px solid #3b82f6;
}

.skill-slider::-moz-range-thumb:hover {
  transform: scale(1.15);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), 0 0 0 4px rgba(59, 130, 246, 0.4);
}

.skill-slider::-moz-range-thumb:active {
  transform: scale(1.05);
}

/* Track styling for Firefox */
.skill-slider::-moz-range-track {
  height: 12px;
  border-radius: 6px;
}
</style>
