<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import NavBar from './components/NavBar.vue'
import FooterComponent from './components/FooterComponent.vue'

const route = useRoute()

// Hide navbar and footer on dashboard
const isDashboard = computed(() => route.path.startsWith('/dashboard'))
</script>

<template>
  <div class="min-h-screen bg-background">
    <NavBar v-if="!isDashboard" />
    <main :class="isDashboard ? '' : 'pt-16'">
      <RouterView />
    </main>
    <FooterComponent v-if="!isDashboard" />
  </div>
</template>
