<template>
  <div class="min-h-screen py-20 px-4 flex items-center justify-center">
    <div class="max-w-2xl mx-auto text-center">
      <div class="glass rounded-3xl p-12 animate-fade-in">
        <!-- Success Icon -->
        <div class="w-24 h-24 bg-gradient-to-br from-primary to-green-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <CheckCircle class="w-12 h-12 text-white" />
        </div>

        <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Payment Successful!
        </h1>
        
        <p class="text-xl text-text/80 mb-8">
          Thank you for subscribing to AviatorAI. Your payment has been processed successfully.
        </p>

        <div class="glass-dark rounded-2xl p-6 mb-8">
          <div class="space-y-3 text-left">
            <div class="flex justify-between">
              <span class="text-text/60">Plan:</span>
              <span class="font-semibold">{{ planDetails.plan }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-text/60">Amount:</span>
              <span class="font-semibold text-primary">₦{{ planDetails.price?.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-text/60">Status:</span>
              <span class="font-semibold text-green-400">Paid</span>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <p class="text-text/70">
            A confirmation email has been sent to your registered email address.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link to="/analysis" class="btn-primary text-lg px-8 py-3">
              Start Analyzing
            </router-link>
            <router-link to="/" class="btn-accent text-lg px-8 py-3">
              Go to Home
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CheckCircle } from 'lucide-vue-next'

const planDetails = ref({
  plan: '',
  price: 0
})

onMounted(() => {
  const storedPlan = localStorage.getItem('selectedPlan')
  if (storedPlan) {
    const plan = JSON.parse(storedPlan)
    planDetails.value = {
      plan: plan.plan.charAt(0).toUpperCase() + plan.plan.slice(1) + ' Plan',
      price: plan.price
    }
  }
})
</script>
