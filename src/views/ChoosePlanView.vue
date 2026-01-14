<template>
  <div class="min-h-screen py-20 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12 animate-fade-in">
        <h1 class="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Choose Your Plan
        </h1>
        <p class="text-xl text-text/80">
          Select the perfect plan that fits your needs
        </p>
      </div>

      <!-- Progress Steps -->
      <div class="flex items-center justify-center mb-16 animate-slide-up">
        <div class="flex items-center space-x-4">
          <div class="flex items-center">
            <div class="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg">
              <Check class="w-7 h-7" />
            </div>
            <span class="ml-3 text-primary font-semibold text-lg">Registration</span>
          </div>
          <div class="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
          <div class="flex items-center">
            <div class="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold text-xl shadow-lg">
              2
            </div>
            <span class="ml-3 text-primary font-semibold text-lg">Choose Plan</span>
          </div>
        </div>
      </div>

      <!-- Pricing Toggle -->
      <div class="text-center mb-12 animate-slide-up" style="animation-delay: 0.1s;">
        <div class="inline-flex items-center space-x-3 glass rounded-full p-2">
          <span class="px-6 py-2 rounded-full bg-primary text-white font-semibold">
            Nigerian Naira (₦)
          </span>
        </div>
      </div>

      <!-- Pricing Cards -->
      <div class="grid lg:grid-cols-3 gap-8 mb-16">
        <!-- Daily Plan -->
        <div 
          class="relative glass rounded-3xl p-8 animate-slide-up hover:scale-105 transition-all duration-500 cursor-pointer group"
          :class="selectedPlan === 'daily' ? 'border-2 border-accent shadow-2xl shadow-accent/20 bg-accent/5' : 'border border-white/10 hover:border-accent/50'"
          @click="selectedPlan = 'daily'"
          style="animation-delay: 0.2s;"
        >
          <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-blue-500 rounded-t-3xl"></div>
          
          <div class="text-center mb-8">
            <div class="w-20 h-20 bg-gradient-to-br from-accent to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Zap class="w-10 h-10 text-white" />
            </div>
            <h3 class="text-3xl font-bold mb-2">Daily Plan</h3>
            <p class="text-text/60 text-lg">Perfect for trying out</p>
          </div>

          <div class="text-center mb-8 py-6 bg-white/5 rounded-2xl">
            <div class="text-6xl font-bold bg-gradient-to-r from-accent to-blue-500 bg-clip-text text-transparent mb-2">
              ₦5,000
            </div>
            <div class="text-text/60 text-lg">per day</div>
          </div>

          <ul class="space-y-4 mb-8">
            <li class="flex items-start text-text/90">
              <div class="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <Check class="w-4 h-4 text-accent" />
              </div>
              <span>24-hour full access</span>
            </li>
            <li class="flex items-start text-text/90">
              <div class="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <Check class="w-4 h-4 text-accent" />
              </div>
              <span>Real-time analysis</span>
            </li>
            <li class="flex items-start text-text/90">
              <div class="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <Check class="w-4 h-4 text-accent" />
              </div>
              <span>Basic predictions</span>
            </li>
            <li class="flex items-start text-text/90">
              <div class="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <Check class="w-4 h-4 text-accent" />
              </div>
              <span>Email support</span>
            </li>
          </ul>

          <button
            @click="selectPlan('daily', 5000)"
            class="w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg"
            :class="selectedPlan === 'daily' ? 'bg-gradient-to-r from-accent to-blue-500 text-white scale-105' : 'bg-white/10 text-text hover:bg-accent/20 hover:scale-105'"
          >
            {{ selectedPlan === 'daily' ? '✓ Selected' : 'Select Plan' }}
          </button>
        </div>

        <!-- Monthly Plan (Most Popular) -->
        <div 
          class="relative glass rounded-3xl p-8 animate-slide-up hover:scale-105 transition-all duration-500 cursor-pointer group"
          :class="selectedPlan === 'monthly' ? 'border-2 border-primary shadow-2xl shadow-primary/20 bg-primary/5' : 'border border-white/10 hover:border-primary/50'"
          @click="selectedPlan = 'monthly'"
          style="animation-delay: 0.3s;"
        >
          <!-- Popular Badge -->
          <div class="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
            <div class="bg-gradient-to-r from-primary to-green-500 px-6 py-2 rounded-full text-sm font-bold text-white shadow-lg animate-pulse">
              ⭐ MOST POPULAR
            </div>
          </div>

          <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-green-500 rounded-t-3xl"></div>

          <div class="text-center mb-8 mt-4">
            <div class="w-20 h-20 bg-gradient-to-br from-primary to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <TrendingUp class="w-10 h-10 text-white" />
            </div>
            <h3 class="text-3xl font-bold mb-2">Monthly Plan</h3>
            <p class="text-text/60 text-lg">Best value for money</p>
          </div>

          <div class="text-center mb-8 py-6 bg-white/5 rounded-2xl relative overflow-hidden">
            <div class="absolute top-2 right-2">
              <span class="bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full">
                SAVE 40%
              </span>
            </div>
            <div class="text-6xl font-bold bg-gradient-to-r from-primary to-green-500 bg-clip-text text-transparent mb-2">
              ₦30,000
            </div>
            <div class="text-text/60 text-lg">per month</div>
            <div class="text-sm text-text/50 line-through mt-1">₦50,000</div>
          </div>

          <ul class="space-y-4 mb-8">
            <li class="flex items-start text-text/90">
              <div class="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <Check class="w-4 h-4 text-primary" />
              </div>
              <span>30-day full access</span>
            </li>
            <li class="flex items-start text-text/90">
              <div class="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <Check class="w-4 h-4 text-primary" />
              </div>
              <span>Advanced predictions</span>
            </li>
            <li class="flex items-start text-text/90">
              <div class="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <Check class="w-4 h-4 text-primary" />
              </div>
              <span>Priority support</span>
            </li>
            <li class="flex items-start text-text/90">
              <div class="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <Check class="w-4 h-4 text-primary" />
              </div>
              <span>Custom alerts</span>
            </li>
            <li class="flex items-start text-text/90">
              <div class="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <Check class="w-4 h-4 text-primary" />
              </div>
              <span>Historical data access</span>
            </li>
          </ul>

          <button
            @click="selectPlan('monthly', 30000)"
            class="w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg"
            :class="selectedPlan === 'monthly' ? 'bg-gradient-to-r from-primary to-green-500 text-white scale-105' : 'bg-white/10 text-text hover:bg-primary/20 hover:scale-105'"
          >
            {{ selectedPlan === 'monthly' ? '✓ Selected' : 'Select Plan' }}
          </button>
        </div>

        <!-- 3-Month Plan (Premium) -->
        <div 
          class="relative glass rounded-3xl p-8 animate-slide-up hover:scale-105 transition-all duration-500 cursor-pointer group"
          :class="selectedPlan === 'quarterly' ? 'border-2 border-yellow-500 shadow-2xl shadow-yellow-500/20 bg-yellow-500/5' : 'border border-white/10 hover:border-yellow-500/50'"
          @click="selectedPlan = 'quarterly'"
          style="animation-delay: 0.4s;"
        >
          <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-t-3xl"></div>
          
          <div class="text-center mb-8">
            <div class="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Crown class="w-10 h-10 text-white" />
            </div>
            <h3 class="text-3xl font-bold mb-2">3-Month Plan</h3>
            <p class="text-text/60 text-lg">Maximum savings</p>
          </div>

          <div class="text-center mb-8 py-6 bg-white/5 rounded-2xl relative overflow-hidden">
            <div class="absolute top-2 right-2">
              <span class="bg-yellow-500/20 text-yellow-500 text-xs font-bold px-3 py-1 rounded-full">
                SAVE 50%
              </span>
            </div>
            <div class="text-6xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-2">
              ₦90,000
            </div>
            <div class="text-text/60 text-lg">for 3 months</div>
            <div class="text-sm text-text/50 line-through mt-1">₦180,000</div>
          </div>

          <ul class="space-y-4 mb-8">
            <li class="flex items-start text-text/90">
              <div class="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <Check class="w-4 h-4 text-yellow-500" />
              </div>
              <span>90-day full access</span>
            </li>
            <li class="flex items-start text-text/90">
              <div class="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <Check class="w-4 h-4 text-yellow-500" />
              </div>
              <span>Premium predictions</span>
            </li>
            <li class="flex items-start text-text/90">
              <div class="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <Check class="w-4 h-4 text-yellow-500" />
              </div>
              <span>24/7 VIP support</span>
            </li>
            <li class="flex items-start text-text/90">
              <div class="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <Check class="w-4 h-4 text-yellow-500" />
              </div>
              <span>Exclusive strategies</span>
            </li>
            <li class="flex items-start text-text/90">
              <div class="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <Check class="w-4 h-4 text-yellow-500" />
              </div>
              <span>Personal dashboard</span>
            </li>
            <li class="flex items-start text-text/90">
              <div class="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <Check class="w-4 h-4 text-yellow-500" />
              </div>
              <span>API access</span>
            </li>
          </ul>

          <button
            @click="selectPlan('quarterly', 90000)"
            class="w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg"
            :class="selectedPlan === 'quarterly' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white scale-105' : 'bg-white/10 text-text hover:bg-yellow-500/20 hover:scale-105'"
          >
            {{ selectedPlan === 'quarterly' ? '✓ Selected' : 'Select Plan' }}
          </button>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up" style="animation-delay: 0.5s;">
        <button
          @click="goBack"
          class="px-10 py-4 rounded-xl font-semibold bg-white/10 text-text hover:bg-white/20 transition-all duration-300 flex items-center hover:scale-105 shadow-lg"
        >
          <ArrowLeft class="w-5 h-5 mr-2" />
          Back
        </button>
        <button
          @click="proceedToPayment"
          :disabled="!selectedPlan"
          class="px-16 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-primary to-accent text-white hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center shadow-2xl"
        >
          Proceed to Payment
          <ArrowRight class="w-5 h-5 ml-2" />
        </button>
      </div>

      <!-- Money Back Guarantee -->
      <div class="text-center mt-16 animate-fade-in">
        <div class="glass rounded-2xl p-8 inline-block hover:scale-105 transition-all duration-300 border border-white/10 hover:border-primary/30">
          <div class="flex items-center space-x-4">
            <div class="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <Shield class="w-8 h-8 text-primary" />
            </div>
            <div class="text-left">
              <div class="font-bold text-xl mb-1">30-Day Money Back Guarantee</div>
              <div class="text-sm text-text/60">Not satisfied? Get a full refund, no questions asked.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Check, Zap, TrendingUp, Crown, ArrowRight, ArrowLeft, Shield } from 'lucide-vue-next'

const router = useRouter()
const selectedPlan = ref('')

const selectPlan = (plan: string, price: number) => {
  selectedPlan.value = plan
  localStorage.setItem('selectedPlan', JSON.stringify({ plan, price }))
}

const goBack = () => {
  router.push('/signup')
}

const proceedToPayment = () => {
  if (!selectedPlan.value) return
  
  const planData = JSON.parse(localStorage.getItem('selectedPlan') || '{}')
  alert(`Proceeding to payment for ${selectedPlan.value} plan!\nAmount: ₦${planData.price.toLocaleString()}`)
}
</script>
