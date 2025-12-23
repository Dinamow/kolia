<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Back Button -->
      <div class="mb-6 px-4 sm:px-0">
        <NuxtLink to="/users"
          class="inline-flex items-center gap-2 text-cornflower-600 hover:text-cornflower-700 font-medium transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to Users
        </NuxtLink>
      </div>

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
          <span class="text-cornflower-700 font-medium">Loading profile...</span>
        </div>
      </div>

      <!-- Error State -->
      <UAlert v-if="error" color="error" variant="soft" :title="error" class="mb-6" />

      <!-- Profile Content -->
      <div v-if="!loading && user" class="space-y-6">
        <!-- Profile Card -->
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <div class="bg-gradient-to-r from-cornflower-600 to-cornflower-700 px-6 py-8">
            <div class="flex items-center gap-4">
              <div class="h-20 w-20 bg-cornflower-200 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-cornflower-700 font-bold text-3xl">{{
                  getInitials()
                  }}</span>
              </div>
              <div class="text-white">
                <h1 class="text-3xl font-bold">
                  {{ user.firstName }} {{ user.lastName }}
                </h1>
                <p class="text-cornflower-100 mt-1">{{ user.email }}</p>
                <div class="mt-3 flex gap-2">
                  <span :class="getUserTypeClass(user.userType)"
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium">
                    {{ user.userType === 'TEAM_LEADER' ? 'Team Leader' : 'Team Member' }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Profile Details -->
          <div class="px-6 py-6 border-b border-cornflower-100">
                <h3 class="text-xs font-semibold text-cornflower-600 uppercase tracking-wider mb-2">
                  Contact Information
                </h3>    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-cornflower-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                    <div>
                      <p class="text-xs text-cornflower-600">Email</p>
                      <p class="text-sm font-medium text-cornflower-900">
                        {{ user.email }}
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-cornflower-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 0C4.477 0 0 4.477 0 10c0 1.89.525 3.66 1.438 5.168L0 20l4.832-1.438A9.956 9.956 0 0010 20c5.523 0 10-4.477 10-10S15.523 0 10 0zm5.487 14.134c-.227.636-1.347 1.236-1.873 1.287-.508.048-.987.228-3.318-.691-2.991-1.18-4.926-4.197-5.075-4.39-.148-.192-1.209-1.608-1.209-3.067 0-1.459.766-2.177 1.038-2.474.272-.297.594-.371.792-.371.198 0 .396.001.569.011.182.009.426-.069.667.509.248.595.842 2.054.916 2.203.074.148.124.322.025.514-.099.193-.148.313-.297.484-.148.172-.312.383-.446.514-.148.148-.302.308-.13.604.173.297.768 1.267 1.649 2.052 1.134.009 1.988.695 2.236.933.248.238.396.198.545.119.148-.079.633-.518.802-.695.172-.178.343-.148.57-.089.228.06 1.438.678 1.685.802.247.123.412.185.471.287.06.099.06.575-.167 1.211z" />
                    </svg>
                    <div>
                      <p class="text-xs text-cornflower-600">WhatsApp</p>
                      <p class="text-sm font-medium text-cornflower-900">
                        {{ user.whatsappNumber }}
                      </p>
                    </div>
                  </div>

        
            </div>
          </div>

          <!-- Additional Info -->
          <div class="px-6 py-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-cornflower-50 rounded-lg p-4">
                <div class="text-xs font-semibold text-cornflower-600 uppercase tracking-wider mb-1">
                  Gender
                </div>
                <p class="text-lg font-bold text-cornflower-900">
                  {{ user.gender }}
                </p>
              </div>
              <div class="bg-cornflower-50 rounded-lg p-4">
                <div class="text-xs font-semibold text-cornflower-600 uppercase tracking-wider mb-1">
                  Team Status
                </div>
                <p class="text-lg font-bold text-cornflower-900">
                  {{ user.hasTeam ? "Has Team" : "No Team" }}
                </p>
              </div>
              <div class="bg-cornflower-50 rounded-lg p-4">
                <div class="text-xs font-semibold text-cornflower-600 uppercase tracking-wider mb-1">
                  Member Since
                </div>
                <p class="text-lg font-bold text-cornflower-900">
                  {{ formatDate(user.createdAt) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Skills Section -->
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <div class="bg-cornflower-50 border-b border-cornflower-200 px-6 py-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <svg class="w-6 h-6 text-cornflower-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9 9a2 2 0 114 0 2 2 0 01-4 0zm7.5 0c0 2.485-1.492 4.631-3.646 5.634.332.75.5 1.566.5 2.366 0 2.209-1.791 4-4 4s-4-1.791-4-4c0-.8.168-1.616.5-2.366C3.492 13.631 2 11.485 2 9a7 7 0 1114 0z" />
                </svg>
                <h2 class="text-xl font-bold text-cornflower-900">
                  Technical Skills
                </h2>
              </div>
              <div v-if="user.techSkills && user.techSkills.length > 0" class="text-sm font-medium text-cornflower-600">
                {{ user.techSkills.length }} skill{{
                  user.techSkills.length !== 1 ? "s" : ""
                }}
              </div>
            </div>
          </div>

          <div v-if="user.techSkills && user.techSkills.length > 0" class="divide-y divide-cornflower-100">
            <div v-for="skill in user.techSkills" :key="skill.id"
              class="px-6 py-4 hover:bg-cornflower-50 transition-colors">
              <div class="flex items-start justify-between gap-4">
                <div class="flex-1">
                  <h3 class="font-semibold text-cornflower-900">
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
                </div>
              </div>
            </div>
          </div>

          <div v-else class="px-6 py-12 text-center">
            <svg class="mx-auto h-12 w-12 text-cornflower-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m0 0h6m0-6h6m-6-6h-6" />
            </svg>
            <h3 class="mt-2 text-lg font-medium text-cornflower-900">
              No skills added yet
            </h3>
            <p class="mt-1 text-cornflower-600">
              This user hasn't added any technical skills yet.
            </p>
          </div>
        </div>

        <!-- Metadata -->
        <div class="bg-white rounded-lg shadow p-4 text-xs text-cornflower-600">
          <p>Last updated: {{ formatDate(user.updatedAt) }}</p>
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

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  whatsappNumber: string;
  gender: string;
  userType: string;
  hasTeam: boolean;
  emailVerified: boolean;
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  techSkills: TechSkill[];
}

const route = useRoute();
const authToken = useCookie("auth-token");
const user = ref<User | null>(null);
const loading = ref(true);
const error = ref("");

const fetchUserProfile = async () => {
  loading.value = true;
  error.value = "";

  try {
    const response = await $fetch(`/api/profile/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${authToken.value}`,
      },
    });

    user.value = response.data;
  } catch (err: any) {
    error.value = err.data?.statusMessage || "Failed to load profile";
    user.value = null;
  } finally {
    loading.value = false;
  }
};

const getInitials = () => {
  if (!user.value) return "";
  return `${user.value.firstName.charAt(0)}${user.value.lastName.charAt(
    0
  )}`.toUpperCase();
};

const getUserTypeClass = (userType: string) => {
  const classes: Record<string, string> = {
    INDIVIDUAL: "bg-blue-100 text-blue-800",
    TEAM_LEADER: "bg-purple-100 text-purple-800",
    ADMIN: "bg-red-100 text-red-800",
  };
  return classes[userType] || "bg-gray-100 text-gray-800";
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

onMounted(() => {
  fetchUserProfile();
});
</script>
