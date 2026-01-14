<template>
  <div class="min-h-screen py-20 px-4">
    <div class="max-w-2xl mx-auto">
      <div class="text-center mb-12 animate-fade-in">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Contact Us
        </h1>
        <p class="text-xl text-text/80">
          Have questions? We'd love to hear from you
        </p>
      </div>

      <!-- Contact Form -->
      <div class="glass rounded-2xl p-8 animate-slide-up hover:border-primary/30 border border-transparent transition-all duration-300">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="transform transition-all duration-300 hover:scale-[1.02]">
            <label for="name" class="block text-sm font-semibold mb-2">
              Name
            </label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              required
              class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary transition-all duration-300 hover:border-primary/50"
              placeholder="Your name"
            />
          </div>

          <div class="transform transition-all duration-300 hover:scale-[1.02]">
            <label for="email" class="block text-sm font-semibold mb-2">
              Email
            </label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary transition-all duration-300 hover:border-primary/50"
              placeholder="your.email@example.com"
            />
          </div>

          <div class="transform transition-all duration-300 hover:scale-[1.02]">
            <label for="message" class="block text-sm font-semibold mb-2">
              Message
            </label>
            <textarea
              id="message"
              v-model="formData.message"
              rows="6"
              required
              class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary transition-all duration-300 hover:border-primary/50"
              placeholder="Tell us what's on your mind..."
            ></textarea>
          </div>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send v-if="!isSubmitting" class="w-4 h-4 inline mr-2" />
            <Loader v-else class="w-4 h-4 inline mr-2 animate-spin" />
            {{ isSubmitting ? 'Sending...' : 'Send Message' }}
          </button>
        </form>

        <!-- Success Message -->
        <div
          v-if="showSuccess"
          class="mt-6 p-4 bg-primary/20 border border-primary rounded-xl flex items-center space-x-3 animate-slide-up"
        >
          <CheckCircle class="w-5 h-5 text-primary flex-shrink-0" />
          <p class="text-primary">Thank you! Your message has been sent successfully.</p>
        </div>
      </div>

      <!-- Contact Info -->
      <div class="mt-8 grid md:grid-cols-3 gap-6">
        <div class="glass rounded-2xl p-6 text-center animate-slide-up hover:scale-105 transition-all duration-300 hover:border-primary/30 border border-transparent" style="animation-delay: 0.1s;">
          <Mail class="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 class="font-semibold mb-2">Email</h3>
          <p class="text-sm text-text/70">support@aviatorai.com</p>
        </div>

        <div class="glass rounded-2xl p-6 text-center animate-slide-up hover:scale-105 transition-all duration-300 hover:border-accent/30 border border-transparent" style="animation-delay: 0.2s;">
          <MessageCircle class="w-8 h-8 text-accent mx-auto mb-3" />
          <h3 class="font-semibold mb-2">Live Chat</h3>
          <p class="text-sm text-text/70">Available 24/7</p>
        </div>

        <div class="glass rounded-2xl p-6 text-center animate-slide-up hover:scale-105 transition-all duration-300 hover:border-primary/30 border border-transparent" style="animation-delay: 0.3s;">
          <Clock class="w-8 h-8 text-primary mx-auto mb-3 animate-pulse" />
          <h3 class="font-semibold mb-2">Response Time</h3>
          <p class="text-sm text-text/70">Within 24 hours</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Send, Loader, CheckCircle, Mail, MessageCircle, Clock } from 'lucide-vue-next'

const formData = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const showSuccess = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Reset form
  formData.value = {
    name: '',
    email: '',
    message: ''
  }
  
  isSubmitting.value = false
  showSuccess.value = true
  
  // Hide success message after 5 seconds
  setTimeout(() => {
    showSuccess.value = false
  }, 5000)
}
</script>