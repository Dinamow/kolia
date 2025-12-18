<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="px-4 py-6 sm:px-0 mb-8">
        <h1 class="text-3xl font-bold text-cornflower-900">All Users</h1>
        <p class="mt-2 text-cornflower-600">
          Manage and view all users in the system
        </p>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow mb-6 p-6">
        <div class="flex flex-col sm:flex-row gap-4 items-end">
          <div class="flex-1 min-w-0">
            <label class="block text-sm font-medium text-cornflower-900 mb-2">Filter by User Type</label>
            <USelect v-model="selectedUserType" :options="userTypeOptions" placeholder="All user types"
              option-attribute="label" @change="fetchUsers" />
          </div>
          <div class="flex-1 min-w-0">
            <label class="block text-sm font-medium text-cornflower-900 mb-2">Items per page</label>
            <USelect v-model="pageLimit" :options="[10, 25, 50, 100]" @change="fetchUsers" />
          </div>
          <button @click="fetchUsers"
            class="px-4 py-2 bg-cornflower-600 text-white rounded-md hover:bg-cornflower-700 transition-colors font-medium">
            Refresh
          </button>
        </div>
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
          <span class="text-cornflower-700 font-medium">Loading users...</span>
        </div>
      </div>

      <!-- Error State -->
      <UAlert v-if="error" color="error" variant="soft" :title="error" class="mb-6" />

      <!-- Users Table -->
      <div v-if="!loading && users.length > 0" class="bg-white rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-cornflower-200">
            <thead class="bg-cornflower-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-cornflower-900 uppercase tracking-wider">
                  Name
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-cornflower-900 uppercase tracking-wider">
                  Email
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-cornflower-900 uppercase tracking-wider">
                  WhatsApp
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-cornflower-900 uppercase tracking-wider">
                  Type
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-cornflower-900 uppercase tracking-wider">
                  Skills
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-cornflower-900 uppercase tracking-wider">
                  Points
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-cornflower-900 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-cornflower-900 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-cornflower-100">
              <tr v-for="user in users" :key="user.id" class="hover:bg-cornflower-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div
                      class="flex-shrink-0 h-10 w-10 bg-cornflower-200 rounded-full flex items-center justify-center">
                      <span class="text-cornflower-700 font-semibold text-sm">{{
                        getInitials(user.firstName)
                        }}</span>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-cornflower-900">
                        {{ user.firstName }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-cornflower-700">
                    {{ getUserEmail(user.id) }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-cornflower-700">
                    {{ user.whatsappNumber }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getUserTypeClass(user.userType)"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                    {{ user.userType }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-1">
                    <svg class="w-4 h-4 text-cornflower-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        d="M9 9a2 2 0 114 0 2 2 0 01-4 0zm7.5 0c0 2.485-1.492 4.631-3.646 5.634.332.75.5 1.566.5 2.366 0 2.209-1.791 4-4 4s-4-1.791-4-4c0-.8.168-1.616.5-2.366C3.492 13.631 2 11.485 2 9a7 7 0 1114 0z" />
                    </svg>
                    <span class="text-sm font-semibold text-cornflower-900">{{
                      user.skillCount
                      }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-1">
                    <svg class="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="text-sm font-semibold text-cornflower-900">{{
                      user.skillTotalPoints
                      }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex flex-col gap-1">
                    <span v-if="user.emailVerified"
                      class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                      ✓ Email
                    </span>
                    <span v-if="user.onboardingCompleted"
                      class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      ✓ Onboarded
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <NuxtLink :to="`/profile/${user.id}`"
                    class="text-cornflower-600 hover:text-cornflower-700 transition-colors font-semibold">
                    View
                  </NuxtLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && users.length === 0" class="bg-white rounded-lg shadow p-12 text-center">
        <svg class="mx-auto h-12 w-12 text-cornflower-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM6 20a9 9 0 0118 0v2h-2v-2a7 7 0 00-14 0v2H6v-2z" />
        </svg>
        <h3 class="mt-2 text-lg font-medium text-cornflower-900">
          No users found
        </h3>
        <p class="mt-1 text-cornflower-600">
          Try adjusting your filters or check back later.
        </p>
      </div>

      <!-- Pagination -->
      <div v-if="pagination && pagination.totalPages > 1" class="flex items-center justify-between mt-6 px-4">
        <div class="text-sm text-cornflower-600">
          Showing {{ (pagination.page - 1) * pageLimit + 1 }} to
          {{ Math.min(pagination.page * pageLimit, pagination.total) }} of
          {{ pagination.total }} users
        </div>
        <div class="flex gap-2">
          <button :disabled="pagination.page === 1" @click="
            currentPage = Math.max(1, currentPage - 1);
          fetchUsers();
          "
            class="px-3 py-1 rounded-md bg-white border border-cornflower-300 text-cornflower-700 hover:bg-cornflower-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            Previous
          </button>
          <div class="flex items-center gap-1">
            <span v-for="page in getPageNumbers()" :key="page" :class="page === pagination.page
                ? 'bg-cornflower-600 text-white'
                : 'bg-white border border-cornflower-300 text-cornflower-700 hover:bg-cornflower-50'
              " @click="
                currentPage = page;
              fetchUsers();
              " class="px-3 py-1 rounded-md cursor-pointer transition-colors">
              {{ page }}
            </span>
          </div>
          <button :disabled="pagination.page >= pagination.totalPages" @click="
            currentPage = Math.min(pagination.totalPages, currentPage + 1);
          fetchUsers();
          "
            class="px-3 py-1 rounded-md bg-white border border-cornflower-300 text-cornflower-700 hover:bg-cornflower-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            Next
          </button>
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

interface User {
  id: string;
  firstName: string;
  whatsappNumber: string;
  gender: string;
  userType: string;
  hasTeam: boolean;
  emailVerified: boolean;
  onboardingCompleted: boolean;
  skillCount: number;
  skillTotalPoints: number;
}

interface Pagination {
  total: number;
  page: number;
  totalPages: number;
}

const users = ref<User[]>([]);
const loading = ref(false);
const error = ref("");
const currentPage = ref(1);
const pageLimit = ref(10);
const selectedUserType = ref<string | null>(null);
const pagination = ref<Pagination | null>(null);
const authToken = useCookie("auth-token");

const userTypeOptions = [
  { label: "All Types", value: null },
  { label: "Individual", value: "INDIVIDUAL" },
  { label: "Team Leader", value: "TEAM_LEADER" },
  { label: "Admin", value: "ADMIN" },
];

const userEmails = new Map<string, string>();

const fetchUsers = async () => {
  loading.value = true;
  error.value = "";

  try {
    const query = new URLSearchParams();
    if (selectedUserType.value) {
      query.append("userType", selectedUserType.value);
    }
    query.append("page", currentPage.value.toString());
    query.append("limit", pageLimit.value.toString());

    const response = await $fetch(`/api/users?${query.toString()}`, {
      headers: {
        Authorization: `Bearer ${authToken.value}`,
      },
    });

    users.value = response.users;
    pagination.value = response.pagination;
  } catch (err: any) {
    error.value = err.data?.message || "Failed to load users";
    users.value = [];
  } finally {
    loading.value = false;
  }
};

const getInitials = (firstName: string) => {
  return firstName.charAt(0).toUpperCase();
};

const getUserEmail = (userId: string) => {
  return userEmails.get(userId) || "user@example.com";
};

const getUserTypeClass = (userType: string) => {
  const classes: Record<string, string> = {
    INDIVIDUAL: "bg-blue-100 text-blue-800",
    TEAM_LEADER: "bg-purple-100 text-purple-800",
    ADMIN: "bg-red-100 text-red-800",
  };
  return classes[userType] || "bg-gray-100 text-gray-800";
};

const getPageNumbers = () => {
  if (!pagination.value) return [];
  const totalPages = pagination.value.totalPages;
  const currentPageNum = pagination.value.page;
  const pages = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPageNum <= 3) {
      pages.push(1, 2, 3, 4, 5);
    } else if (currentPageNum >= totalPages - 2) {
      pages.push(
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      pages.push(
        currentPageNum - 2,
        currentPageNum - 1,
        currentPageNum,
        currentPageNum + 1,
        currentPageNum + 2
      );
    }
  }

  return pages;
};

onMounted(() => {
  fetchUsers();
});
</script>
