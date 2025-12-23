<template>
  <header class="app-header">
    <div class="header-container">
      <!-- Logo/Brand -->
      <div class="brand">
        <NuxtLink to="/" class="brand-link">
          <span class="brand-name">Teamy</span>
        </NuxtLink>
      </div>

      <!-- Navigation Menu -->
      <nav class="nav-menu" :class="{ 'active': menuOpen }">
        <NuxtLink
          v-for="item in navigationItems"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          :class="{ 'active': isActive(item.path) }"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-label">{{ item.label }}</span>
        </NuxtLink>

        <!-- User Profile Dropdown (if authenticated) -->
        <!-- <div v-if="isAuthenticated" class="user-menu">
          <button @click="toggleUserDropdown" class="user-button">
            <span class="nav-icon">👤</span>
            <span class="nav-label">Account</span>
            <span class="dropdown-arrow">▼</span>
          </button>
          <div v-if="userDropdownOpen" class="dropdown-menu">
            <NuxtLink to="/profile" class="dropdown-item">My Profile</NuxtLink>
            <NuxtLink to="/dashboard" class="dropdown-item">Dashboard</NuxtLink>
            <button @click="handleLogout" class="dropdown-item logout">Logout</button>
          </div>
        </div> -->
      </nav>

      <!-- Mobile Menu Toggle -->
      <button @click="toggleMenu" class="menu-toggle">
        <span class="hamburger" :class="{ 'active': menuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const menuOpen = ref(false)
const userDropdownOpen = ref(false)

// Check if user is authenticated
const isAuthenticated = ref(false)
const currentUser = ref<any>(null)

// Navigation items
const navigationItems = computed(() => {
  const publicItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/login', label: 'Login', icon: '🔑' },
    { path: '/signup', label: 'Sign Up', icon: '📝' },
  ]

  const authenticatedItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/users', label: 'Users', icon: '👥' },
    { path: '/profile', label: 'Profiles', icon: '👤' },
  ]

  return isAuthenticated.value
    ? [...authenticatedItems]
    : publicItems
})

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const toggleUserDropdown = () => {
  userDropdownOpen.value = !userDropdownOpen.value
}

const isActive = (path: string) => {
  return route.path === path || route.path.startsWith(path + '/')
}

const handleLogout = async () => {
  try {
    // Call logout API
    await $fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    })
  } catch (error) {
    console.error('Logout error:', error)
  }

  isAuthenticated.value = false
  currentUser.value = null
  userDropdownOpen.value = false
  router.push('/login')
}

// Check authentication status
const checkAuth = async () => {
  try {
    const response = await $fetch('/api/auth/me', {
      credentials: 'include'
    })

    if (response.success && response.user) {
      isAuthenticated.value = true
      currentUser.value = response.user
    } else {
      isAuthenticated.value = false
      currentUser.value = null
    }
  } catch (error) {
    isAuthenticated.value = false
    currentUser.value = null
  }
}

// Check authentication status on mount and on route changes
onMounted(() => {
  checkAuth()
})

// Re-check auth when route changes (in case user logs in/out)
watch(() => route.path, () => {
  checkAuth()
})
</script>

<style scoped>
.app-header {
  background: linear-gradient(135deg, var(--color-cornflower-600) 0%, var(--color-cornflower-700) 100%);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

/* Brand Styling */
.brand-link {
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.brand-name {
  font-size: 1.75rem;
  font-weight: 800;
  background: linear-gradient(135deg, #fff 0%, #e4eef5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
  transition: all 0.3s ease;
}

.brand-link:hover .brand-name {
  transform: scale(1.05);
  filter: brightness(1.2);
}

/* Navigation Menu */
.nav-menu {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  justify-content: flex-end;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  text-decoration: none;
  color: #fff;
  border-radius: 12px;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(100%);
  transition: transform 0.3s ease;
  border-radius: 12px;
}

.nav-item:hover::before,
.nav-item.active::before {
  transform: translateY(0);
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.nav-item.active {
  background: rgba(255, 255, 255, 0.2);
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);
}

.nav-icon {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.nav-item:hover .nav-icon {
  transform: scale(1.2) rotate(5deg);
}

.nav-label {
  position: relative;
  z-index: 1;
}

/* User Menu */
.user-menu {
  position: relative;
}

.user-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  color: #fff;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.user-button:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.dropdown-arrow {
  font-size: 0.7rem;
  transition: transform 0.3s ease;
}

.user-button:hover .dropdown-arrow {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  min-width: 200px;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 0.875rem 1.25rem;
  text-align: left;
  text-decoration: none;
  color: var(--color-cornflower-700);
  background: white;
  border: none;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid #f0f0f0;
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover {
  background: var(--color-cornflower-50);
  padding-left: 1.5rem;
}

.dropdown-item.logout {
  color: #dc2626;
}

.dropdown-item.logout:hover {
  background: #fef2f2;
}

/* Mobile Menu Toggle */
.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 28px;
}

.hamburger span {
  display: block;
  height: 3px;
  background: white;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(8px, 8px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -7px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .nav-menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 280px;
    height: 100vh;
    background: linear-gradient(180deg, var(--color-cornflower-600) 0%, var(--color-cornflower-700) 100%);
    flex-direction: column;
    align-items: flex-start;
    padding: 5rem 2rem 2rem;
    gap: 0.5rem;
    transition: right 0.3s ease;
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.2);
  }

  .nav-menu.active {
    right: 0;
  }

  .nav-item {
    width: 100%;
    justify-content: flex-start;
  }

  .user-menu {
    width: 100%;
  }

  .user-button {
    width: 100%;
    justify-content: flex-start;
  }

  .dropdown-menu {
    position: static;
    box-shadow: none;
    background: rgba(255, 255, 255, 0.1);
    margin-top: 0.5rem;
  }

  .dropdown-item {
    color: white;
    background: transparent;
    border-color: rgba(255, 255, 255, 0.1);
  }

  .dropdown-item:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .dropdown-item.logout {
    color: #fca5a5;
  }

  .dropdown-item.logout:hover {
    background: rgba(220, 38, 38, 0.2);
  }
}

@media (max-width: 480px) {
  .header-container {
    padding: 1rem;
  }

  .brand-name {
    font-size: 1.5rem;
  }

  .nav-label {
    font-size: 0.9rem;
  }
}
</style>
