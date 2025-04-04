<template>
  <div class="min-h-screen flex flex-col bg-gray-900 text-gray-100">
    <div>
      <!-- Navigation Bar -->
      <nav class="bg-gray-800 text-white border-b border-gray-700">
        <div class="lg:hidden py-4 px-4 flex items-center justify-between">
          <Logo />

          <!-- Mobile Toggle Button -->
          <button @click="toggleMobileNav" class="focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

        <!-- Desktop Sidebar -->
        <div
          class="hidden lg:block fixed top-0 left-0 w-72 h-full bg-gray-800 text-white border-r border-gray-700 overflow-y-auto">
          <div class="px-4 pt-4">
            <Logo />
          </div>

          <div class="py-4">
            <!-- Desktop Nav Items -->
            <RouterLink to="/"
              class="flex items-center pl-6 py-2.5 space-x-3 border-l-4 transition-colors duration-200 hover:border-indigo-400 hover:text-indigo-400 hover:bg-gray-700"
              :class="{
                'border-indigo-500 bg-gray-700 text-indigo-400': $route.path === '/',
                'border-gray-700': $route.path !== '/'
              }">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path
                  d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path
                  d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
              <span class="tracking-wide font-medium text-sm">Dashboard</span>
            </RouterLink>
          </div>
        </div>
      </nav>

      <!-- Mobile Dropdown Overlay -->
      <div v-if="mobileNavOpen" class="lg:hidden fixed inset-0 z-[9999] bg-gray-900 text-white overflow-y-auto">
        <div class="pt-4 px-4">
          <Logo />
        </div>

        <div class="py-4">
          <!-- Mobile Nav Items -->
          <RouterLink to="/"
            class="flex items-center pl-6 py-2.5 space-x-3 border-l-4 transition-colors duration-200 hover:border-indigo-400 hover:text-indigo-400 hover:bg-gray-700"
            :class="{
              'border-indigo-500 bg-gray-700 text-indigo-400': $route.path === '/',
              'border-gray-700': $route.path !== '/'
            }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path
                d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
              <path
                d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
            </svg>
            <span class="tracking-wide font-medium text-sm">Dashboard</span>
          </RouterLink>
        </div>

        <button @click="toggleMobileNav" class="absolute top-4 right-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <main class="flex-grow lg:ml-72 bg-gray-900 text-gray-100 text-xs md:z-40">
      <div class="bg-gray-800 border-b border-gray-700 p-8">
        <!-- Page Title or Header -->
      </div>

      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="lg:ml-72 bg-gray-900 text-gray-400 pb-4">
      <p class="text-center text-xs">© Copyright 2025 Zascia Hugo</p>
    </footer>
  </div>
</template>

<script setup>
import { RouterView, RouterLink } from 'vue-router'
import { ref } from 'vue'
import Logo from './components/layout/Logo.vue'

const mobileNavOpen = ref(false)

const toggleMobileNav = () => {
  mobileNavOpen.value = !mobileNavOpen.value
}
</script>
