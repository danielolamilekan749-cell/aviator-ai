<template>
  <nav class="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <Plane class="w-5 h-5 text-white" />
            </div>
            <span class="text-xl font-bold text-white">AviatorAI</span>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <router-link
              v-for="item in navItems"
              :key="item.name"
              :to="item.path"
              class="text-text hover:text-primary px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-white/5"
              :class="{ 'text-primary bg-white/10': $route.path === item.path }"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>

        <!-- Auth Buttons -->
        <div class="hidden md:flex items-center space-x-4">
          <button class="text-text hover:text-primary transition-colors">
            Sign In
          </button>
          <router-link to="/signup" class="btn-primary">
            Sign Up
          </router-link>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="text-text hover:text-primary p-2"
          >
            <Menu v-if="!mobileMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div v-if="mobileMenuOpen" class="md:hidden glass-dark border-t border-white/10">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link
          v-for="item in navItems"
          :key="item.name"
          :to="item.path"
          @click="mobileMenuOpen = false"
          class="text-text hover:text-primary block px-3 py-2 rounded-xl text-base font-medium transition-all duration-300"
          :class="{ 'text-primary bg-white/10': $route.path === item.path }"
        >
          {{ item.name }}
        </router-link>
        <div class="pt-4 pb-3 border-t border-white/10">
          <div class="flex items-center px-3 space-x-3">
            <button class="text-text hover:text-primary transition-colors">
              Sign In
            </button>
            <router-link to="/signup" class="btn-primary" @click="mobileMenuOpen = false">
              Sign Up
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plane, Menu, X } from 'lucide-vue-next'

const mobileMenuOpen = ref(false)

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Recent Analysis', path: '/analysis' },
  { name: 'Rating & Comment', path: '/ratings' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
]
</script>