<template>
  <div class="min-h-screen py-20 px-4">
    <div class="max-w-2xl mx-auto">
      <div class="text-center mb-12 animate-fade-in">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Create Your Account
        </h1>
        <p class="text-xl text-text/80">
          Join thousands of users and start your journey
        </p>
      </div>

      <!-- Progress Steps -->
      <div class="flex items-center justify-center mb-12 animate-slide-up">
        <div class="flex items-center space-x-4">
          <div class="flex items-center">
            <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              1
            </div>
            <span class="ml-2 text-primary font-semibold">Registration</span>
          </div>
          <div class="w-16 h-0.5 bg-white/20"></div>
          <div class="flex items-center">
            <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-text/60 font-bold">
              2
            </div>
            <span class="ml-2 text-text/60">Choose Plan</span>
          </div>
        </div>
      </div>

      <!-- Registration Form -->
      <div class="glass rounded-2xl p-8 animate-slide-up hover:border-primary/30 border border-transparent transition-all duration-300" style="animation-delay: 0.1s;">
        <form @submit.prevent="handleContinue" class="space-y-6">
          <!-- First Name -->
          <div class="transform transition-all duration-300 hover:scale-[1.02]">
            <label for="firstName" class="block text-sm font-semibold mb-2">
              First Name *
            </label>
            <input
              id="firstName"
              v-model="formData.firstName"
              type="text"
              required
              class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary transition-all duration-300 hover:border-primary/50"
              placeholder="Enter your first name"
            />
          </div>

          <!-- Last Name -->
          <div class="transform transition-all duration-300 hover:scale-[1.02]">
            <label for="lastName" class="block text-sm font-semibold mb-2">
              Last Name *
            </label>
            <input
              id="lastName"
              v-model="formData.lastName"
              type="text"
              required
              class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary transition-all duration-300 hover:border-primary/50"
              placeholder="Enter your last name"
            />
          </div>

          <!-- Country & Phone -->
          <div class="grid md:grid-cols-2 gap-4">
            <div class="transform transition-all duration-300 hover:scale-[1.02]">
              <label for="country" class="block text-sm font-semibold mb-2">
                Country *
              </label>
              <select
                id="country"
                v-model="formData.country"
                required
                class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary transition-all duration-300 hover:border-primary/50"
              >
                <option value="" disabled>Select country</option>
                <option v-for="country in countries" :key="country.code" :value="country.code">
                  {{ country.flag }} {{ country.name }} ({{ country.dial }})
                </option>
              </select>
            </div>

            <div class="transform transition-all duration-300 hover:scale-[1.02]">
              <label for="phone" class="block text-sm font-semibold mb-2">
                Phone Number *
              </label>
              <input
                id="phone"
                v-model="formData.phone"
                type="tel"
                required
                class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary transition-all duration-300 hover:border-primary/50"
                placeholder="Phone number"
              />
            </div>
          </div>

          <!-- Email -->
          <div class="transform transition-all duration-300 hover:scale-[1.02]">
            <label for="email" class="block text-sm font-semibold mb-2">
              Email Address *
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

          <!-- Experience Level -->
          <div class="transform transition-all duration-300 hover:scale-[1.02]">
            <label class="block text-sm font-semibold mb-3">
              Your Experience Playing Aviator *
            </label>
            <div class="space-y-3">
              <label 
                v-for="level in experienceLevels" 
                :key="level.value"
                class="flex items-center p-4 glass rounded-xl cursor-pointer hover:border-primary/50 border border-transparent transition-all duration-300"
                :class="{ 'border-primary bg-primary/10': formData.experience === level.value }"
              >
                <input
                  type="radio"
                  v-model="formData.experience"
                  :value="level.value"
                  required
                  class="w-5 h-5 text-primary focus:ring-primary focus:ring-2"
                />
                <div class="ml-3">
                  <div class="font-semibold flex items-center">
                    <component :is="level.icon" class="w-5 h-5 mr-2" :class="level.color" />
                    {{ level.label }}
                  </div>
                  <div class="text-sm text-text/60">{{ level.description }}</div>
                </div>
              </label>
            </div>
          </div>

          <!-- Terms & Conditions -->
          <div class="transform transition-all duration-300 hover:scale-[1.02]">
            <label class="flex items-start cursor-pointer">
              <input
                type="checkbox"
                v-model="formData.agreeTerms"
                required
                class="w-5 h-5 mt-1 text-primary focus:ring-primary focus:ring-2 rounded"
              />
              <span class="ml-3 text-sm text-text/80">
                I agree to the <a href="#" class="text-primary hover:underline">Terms & Conditions</a> 
                and <a href="#" class="text-primary hover:underline">Privacy Policy</a>. 
                I understand this is for educational purposes only.
              </span>
            </label>
          </div>

          <!-- Continue Button -->
          <button
            type="submit"
            class="w-full btn-primary text-lg py-4 flex items-center justify-center"
          >
            Continue to Plans
            <ArrowRight class="w-5 h-5 ml-2" />
          </button>
        </form>
      </div>

      <!-- Already have account -->
      <div class="text-center mt-6 animate-fade-in">
        <p class="text-text/60">
          Already have an account? 
          <router-link to="/signin" class="text-primary hover:underline font-semibold">
            Sign In
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight, Sparkles, Zap, Trophy } from 'lucide-vue-next'

const router = useRouter()

const formData = ref({
  firstName: '',
  lastName: '',
  country: '',
  phone: '',
  email: '',
  experience: '',
  agreeTerms: false
})

const countries = [
  { code: 'NG', name: 'Nigeria', dial: '+234', flag: '🇳🇬' },
  { code: 'GH', name: 'Ghana', dial: '+233', flag: '🇬🇭' },
  { code: 'KE', name: 'Kenya', dial: '+254', flag: '🇰🇪' },
  { code: 'ZA', name: 'South Africa', dial: '+27', flag: '🇿🇦' },
  { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', dial: '+44', flag: '🇬🇧' },
  { code: 'IN', name: 'India', dial: '+91', flag: '🇮🇳' },
  { code: 'BR', name: 'Brazil', dial: '+55', flag: '🇧🇷' },
  { code: 'EG', name: 'Egypt', dial: '+20', flag: '🇪🇬' },
  { code: 'AE', name: 'UAE', dial: '+971', flag: '🇦🇪' }
]

const experienceLevels = [
  {
    value: 'beginner',
    label: 'Beginner',
    description: 'Just starting out, learning the basics',
    icon: Sparkles,
    color: 'text-blue-400'
  },
  {
    value: 'intermediate',
    label: 'Intermediate',
    description: 'Have some experience, looking to improve',
    icon: Zap,
    color: 'text-yellow-400'
  },
  {
    value: 'pro',
    label: 'Professional',
    description: 'Experienced player, know the strategies',
    icon: Trophy,
    color: 'text-primary'
  }
]

const handleContinue = async () => {
  // Store form data in localStorage
  localStorage.setItem('signupData', JSON.stringify(formData.value))
  
  // For now, just redirect to dashboard
  // TODO: Integrate with Firebase auth when credentials are added
  router.push('/dashboard')
}
</script>