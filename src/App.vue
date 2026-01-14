<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import FooterComponent from './components/FooterComponent.vue'
</script>

<template>
  <div class="min-h-screen bg-background">
    <NavBar />
    <main class="pt-16">
      <RouterView />
    </main>
    <FooterComponent />
  </div>
</template>
