<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="px-4 sm:px-0 mb-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-cornflower-900">
              Manage Technical Skills
            </h1>
            <p class="mt-2 text-cornflower-600">
              Add, edit, or remove your technical skills and proficiency levels
            </p>
          </div>
          <NuxtLink to="/profile"
            class="text-cornflower-600 hover:text-cornflower-700 font-medium text-sm flex items-center gap-1">
            ← Back to Profile
          </NuxtLink>
        </div>
      </div>

      <!-- Error State -->
      <UAlert v-if="error" color="error" variant="soft" :title="error" class="mb-6" />

      <!-- Success Message -->
      <UAlert v-if="successMessage" color="success" variant="soft" :title="successMessage" class="mb-6" />

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-flex items-center gap-2">
          <svg class="animate-spin h-5 w-5 text-cornflower-600" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
          <span class="text-cornflower-700 font-medium">Loading skills...</span>
        </div>
      </div>

      <!-- Skills Content -->
      <div v-if="!loading" class="space-y-6">
        <!-- Add New Skill Button -->
        <div class="flex justify-end">
          <button @click="openAddModal"
            class="inline-flex items-center gap-2 px-4 py-2 bg-cornflower-600 text-white rounded-md hover:bg-cornflower-700 transition-colors font-medium shadow-sm">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Add New Skill
          </button>
        </div>

        <!-- Skills List -->
        <div v-if="skills.length > 0" class="bg-white rounded-lg shadow-lg overflow-hidden">
          <div class="divide-y divide-cornflower-100">
            <div v-for="skill in skills" :key="skill.id"
              class="px-6 py-5 hover:bg-cornflower-50 transition-colors group">
              <div class="flex items-start justify-between gap-4">
                <div class="flex-1">
                  <h3 class="font-semibold text-lg text-cornflower-900">
                    {{ skill.skillName }}
                  </h3>
                  <p v-if="skill.notes" class="text-sm text-cornflower-600 mt-1">
                    {{ skill.notes }}
                  </p>
                </div>
                <div class="flex items-center gap-4">
                  <div class="text-right">
                    <div class="flex items-center gap-1">
                      <span class="text-2xl font-bold text-cornflower-900">{{
                        skill.proficiency
                      }}</span>
                      <span class="text-sm text-cornflower-600">/10</span>
                    </div>
                    <div class="w-24 h-2 bg-cornflower-100 rounded-full mt-2 overflow-hidden">
                      <div class="h-full bg-gradient-to-r from-cornflower-500 to-cornflower-600 transition-all"
                        :style="{ width: `${(skill.proficiency / 10) * 100}%` }"></div>
                    </div>
                  </div>
                  <div class="flex flex-col gap-2">
                    <button @click="openEditModal(skill)"
                      class="p-2 text-cornflower-600 hover:bg-cornflower-100 rounded-md transition-colors"
                      title="Edit skill">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button @click="confirmDelete(skill)"
                      class="p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors" title="Delete skill">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="bg-white rounded-lg shadow p-12 text-center">
          <svg class="mx-auto h-12 w-12 text-cornflower-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h3 class="mt-2 text-lg font-medium text-cornflower-900">
            No skills added yet
          </h3>
          <p class="mt-1 text-cornflower-600 mb-4">
            Start building your profile by adding your technical skills
          </p>
          <button @click="openAddModal"
            class="inline-flex items-center gap-2 px-4 py-2 bg-cornflower-600 text-white rounded-md hover:bg-cornflower-700 transition-colors font-medium">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Your First Skill
          </button>
        </div>
      </div>

      <!-- Edit/Add Modal -->
      <div v-if="showModal" class="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50"
        @click.self="closeModal">
        <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div class="sticky top-0 bg-white border-b border-cornflower-200 px-6 py-4 flex items-center justify-between">
            <h2 class="text-xl font-bold text-cornflower-900">
              {{ isEditing ? "Edit Skill" : "Add New Skill" }}
            </h2>
            <button @click="closeModal" class="text-cornflower-400 hover:text-cornflower-600 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form @submit.prevent="saveSkill" class="p-6 space-y-6">
            <!-- Skill Name -->
            <div class="relative">
              <label class="block text-sm font-medium text-cornflower-900 mb-2">Skill Name *</label>
              <input v-model="modalForm.skillName" @input="filterSkills" @focus="showSuggestions = true"
                @blur="hideSuggestions" type="text" required placeholder="e.g., JavaScript, Python, React..."
                class="w-full px-4 py-2 border border-cornflower-300 rounded-md focus:ring-2 focus:ring-cornflower-500 focus:border-cornflower-500 transition-colors" />
              <!-- Custom Dropdown -->
              <div v-if="showSuggestions && filteredSuggestions.length > 0"
                class="absolute z-10 w-full mt-1 bg-white border border-cornflower-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                <button v-for="suggestion in filteredSuggestions" :key="suggestion" type="button"
                  @mousedown.prevent="selectSkill(suggestion)"
                  class="w-full px-4 py-2 text-left hover:bg-cornflower-50 transition-colors text-cornflower-900 focus:bg-cornflower-100 focus:outline-none">
                  {{ suggestion }}
                </button>
              </div>
            </div>

            <!-- Proficiency -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <label class="block text-sm font-medium text-cornflower-900">Proficiency Level *</label>
                <span class="text-lg font-bold text-cornflower-600">{{ modalForm.proficiency }}/10</span>
              </div>
              <input v-model.number="modalForm.proficiency" type="range" min="0" max="10" step="1"
                class="w-full h-2 bg-cornflower-200 rounded-lg appearance-none cursor-pointer accent-cornflower-600" />
              <div class="flex justify-between text-xs text-cornflower-600 mt-2">
                <span>Beginner (0-3)</span>
                <span>Intermediate (4-6)</span>
                <span>Advanced (7-8)</span>
                <span>Expert (9-10)</span>
              </div>
              <div class="flex gap-1 mt-3">
                <button v-for="n in 11" :key="n" type="button" @click="modalForm.proficiency = n - 1" :class="[
                  'flex-1 py-1 text-xs rounded transition-colors',
                  modalForm.proficiency === n - 1
                    ? 'bg-cornflower-600 text-white font-bold'
                    : 'bg-cornflower-100 text-cornflower-700 hover:bg-cornflower-200',
                ]">
                  {{ n - 1 }}
                </button>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-3 pt-4">
              <button type="submit" :disabled="saveLoading"
                class="flex-1 px-4 py-2 bg-cornflower-600 text-white rounded-md hover:bg-cornflower-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium">
                {{ saveLoading ? "Saving..." : isEditing ? "Update Skill" : "Add Skill" }}
              </button>
              <button type="button" @click="closeModal"
                class="px-4 py-2 bg-white border border-cornflower-300 text-cornflower-700 rounded-md hover:bg-cornflower-50 transition-colors font-medium">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteModal" class="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50"
        @click.self="closeDeleteModal">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">
                Delete Skill
              </h3>
              <p class="text-sm text-gray-600 mb-4">
                Are you sure you want to delete
                <strong>{{ skillToDelete?.skillName }}</strong>? This action
                cannot be undone.
              </p>
              <div class="flex gap-3">
                <button @click="deleteSkill" :disabled="deleteLoading"
                  class="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium">
                  {{ deleteLoading ? "Deleting..." : "Delete" }}
                </button>
                <button @click="closeDeleteModal"
                  class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: "auth",
});

interface TechSkill {
  id: string;
  skillName: string;
  proficiency: number;
  notes: string | null;
}

interface ModalForm {
  skillName: string;
  proficiency: number;
  notes: string;
}

const authToken = useCookie("auth-token");
const skills = ref<TechSkill[]>([]);
const loading = ref(true);
const saveLoading = ref(false);
const deleteLoading = ref(false);
const error = ref("");
const successMessage = ref("");

const showModal = ref(false);
const isEditing = ref(false);
const currentSkillId = ref<string | null>(null);
const modalForm = ref<ModalForm>({
  skillName: "",
  proficiency: 5,
  notes: "",
});

const showDeleteModal = ref(false);
const skillToDelete = ref<TechSkill | null>(null);

const showSuggestions = ref(false);
const filteredSuggestions = ref<string[]>([]);

const skillSuggestions = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "C#",
  "PHP",
  "Ruby",
  "Go",
  "Rust",
  "Swift",
  "Kotlin",
  "React",
  "Vue.js",
  "Angular",
  "Node.js",
  "Express.js",
  "Django",
  "Flask",
  "Spring Boot",
  "ASP.NET",
  "Laravel",
  "Ruby on Rails",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "Google Cloud",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "GraphQL",
  "REST API",
  "Git",
  "CI/CD",
];

const fetchSkills = async () => {
  loading.value = true;
  error.value = "";

  try {
    const response = await $fetch("/api/profile/skills", {
      headers: {
        Authorization: `Bearer ${authToken.value}`,
      },
    });

    skills.value = (response as any).data || [];
  } catch (err: any) {
    error.value = err.data?.message || err.message || "Failed to load skills";
  } finally {
    loading.value = false;
  }
};

const openAddModal = () => {
  isEditing.value = false;
  currentSkillId.value = null;
  modalForm.value = {
    skillName: "",
    proficiency: 5,
    notes: "",
  };
  showModal.value = true;
};

const openEditModal = (skill: TechSkill) => {
  isEditing.value = true;
  currentSkillId.value = skill.id;
  modalForm.value = {
    skillName: skill.skillName,
    proficiency: skill.proficiency,
    notes: skill.notes || "",
  };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  currentSkillId.value = null;
  showSuggestions.value = false;
  filteredSuggestions.value = [];
  modalForm.value = {
    skillName: "",
    proficiency: 5,
    notes: "",
  };
};

const filterSkills = () => {
  const searchTerm = modalForm.value.skillName.toLowerCase();
  if (searchTerm.length === 0) {
    filteredSuggestions.value = skillSuggestions;
  } else {
    filteredSuggestions.value = skillSuggestions.filter(skill =>
      skill.toLowerCase().includes(searchTerm)
    );
  }
};

const selectSkill = (skill: string) => {
  modalForm.value.skillName = skill;
  showSuggestions.value = false;
};

const hideSuggestions = () => {
  setTimeout(() => {
    showSuggestions.value = false;
  }, 200);
};

const saveSkill = async () => {
  error.value = "";
  successMessage.value = "";
  saveLoading.value = true;

  try {
    const body = {
      skillName: modalForm.value.skillName.trim(),
      proficiency: modalForm.value.proficiency,
      notes: modalForm.value.notes.trim() || null,
    };

    if (isEditing.value && currentSkillId.value) {
      // Update existing skill
      await $fetch(`/api/profile/skills/${currentSkillId.value}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${authToken.value}`,
        },
        body,
      });
      successMessage.value = "Skill updated successfully";
    } else {
      // Add new skill
      await $fetch("/api/profile/skills", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken.value}`,
        },
        body,
      });
      successMessage.value = "Skill added successfully";
    }

    closeModal();
    await fetchSkills();

    // Clear success message after 3 seconds
    setTimeout(() => {
      successMessage.value = "";
    }, 3000);
  } catch (err: any) {
    error.value = err.data?.message || "Failed to save skill";
  } finally {
    saveLoading.value = false;
  }
};

const confirmDelete = (skill: TechSkill) => {
  skillToDelete.value = skill;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  skillToDelete.value = null;
};

const deleteSkill = async () => {
  if (!skillToDelete.value) return;

  error.value = "";
  successMessage.value = "";
  deleteLoading.value = true;

  try {
    await $fetch(`/api/profile/skills/${skillToDelete.value.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken.value}`,
      },
    });

    successMessage.value = "Skill deleted successfully";
    closeDeleteModal();
    await fetchSkills();

    // Clear success message after 3 seconds
    setTimeout(() => {
      successMessage.value = "";
    }, 3000);
  } catch (err: any) {
    error.value = err.data?.message || "Failed to delete skill";
  } finally {
    deleteLoading.value = false;
  }
};

onMounted(() => {
  fetchSkills();
});
</script>
