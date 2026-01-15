<template>
  <div class="min-h-screen bg-background">
    <!-- Dashboard Header -->
    <header class="glass border-b border-white/10 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div class="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
            <Plane class="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 class="text-xl font-bold">Aviator AI</h1>
            <p class="text-xs text-text/60">Dashboard</p>
          </div>
        </div>
        
        <div class="flex items-center space-x-4">
          <div class="hidden md:flex items-center space-x-2 glass px-4 py-2 rounded-xl">
            <Crown class="w-5 h-5 text-yellow-400" />
            <span class="text-sm font-semibold">{{ userPlan }}</span>
          </div>
          
          <!-- Logout Dropdown -->
          <div class="relative">
            <button @click="showLogoutMenu = !showLogoutMenu" class="glass px-4 py-2 rounded-xl hover:bg-white/20 transition-all flex items-center space-x-2">
              <LogOut class="w-5 h-5" />
              <span class="hidden md:inline text-sm">Menu</span>
            </button>
            
            <!-- Dropdown Menu -->
            <div v-if="showLogoutMenu" class="absolute right-0 mt-2 w-48 glass rounded-xl border border-white/20 shadow-2xl z-50">
              <button @click="handleLogout" class="w-full px-4 py-3 text-left hover:bg-white/10 rounded-xl flex items-center space-x-2 text-red-400">
                <LogOut class="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Welcome Section -->
      <div class="mb-8 animate-fade-in">
        <h2 class="text-3xl md:text-4xl font-bold mb-2">
          Welcome back, {{ userName }} 👋
        </h2>
        <p class="text-text/70">Here's what's happening with your Aviator AI today</p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Account Status -->
        <div class="glass rounded-2xl p-6 animate-slide-up hover:scale-105 transition-all">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
              <CheckCircle class="w-6 h-6 text-green-400" />
            </div>
            <span class="text-xs px-3 py-1 bg-green-500/20 text-green-400 rounded-full">Active</span>
          </div>
          <h3 class="text-lg font-semibold mb-1">Account Status</h3>
          <p class="text-2xl font-bold text-primary">Active</p>
          <p class="text-xs text-text/60 mt-2">Member since {{ memberSince }}</p>
        </div>

        <!-- Current Plan -->
        <div class="glass rounded-2xl p-6 animate-slide-up hover:scale-105 transition-all" style="animation-delay: 0.1s;">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
              <Crown class="w-6 h-6 text-primary" />
            </div>
            <span class="text-xs px-3 py-1 bg-primary/20 text-primary rounded-full">{{ userPlan }}</span>
          </div>
          <h3 class="text-lg font-semibold mb-1">Current Plan</h3>
          <p class="text-2xl font-bold text-primary">{{ userPlan }}</p>
          <button v-if="userPlan === 'Free'" @click="upgradePlan" class="mt-3 text-xs text-accent hover:underline">
            Upgrade to VIP →
          </button>
        </div>

        <!-- Bot Access -->
        <div class="glass rounded-2xl p-6 animate-slide-up hover:scale-105 transition-all" style="animation-delay: 0.2s;">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
              <Bot class="w-6 h-6 text-accent" />
            </div>
            <span :class="hasBotAccess ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'" class="text-xs px-3 py-1 rounded-full">
              {{ hasBotAccess ? 'Enabled' : 'Locked' }}
            </span>
          </div>
          <h3 class="text-lg font-semibold mb-1">AI Bot Access</h3>
          <p class="text-2xl font-bold" :class="hasBotAccess ? 'text-green-400' : 'text-red-400'">
            {{ hasBotAccess ? 'Unlocked' : 'Locked' }}
          </p>
          <button v-if="!hasBotAccess" @click="upgradePlan" class="mt-3 text-xs text-accent hover:underline">
            Unlock Bot Access →
          </button>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column - AI Bot Panel -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Free Bot Predictor (Always Available - 20% Accurate) -->
          <div class="glass rounded-2xl p-6 animate-slide-up" style="animation-delay: 0.3s;">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Bot class="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 class="text-xl font-bold">Free Bot Predictor</h3>
                  <p class="text-sm text-text/60">Basic predictions • 20% Accuracy</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span class="text-sm text-blue-400">Active</span>
              </div>
            </div>

            <!-- Free Bot Content -->
            <div class="space-y-4">
              <!-- Live Prediction -->
              <div class="bg-white/5 rounded-xl p-4 border border-blue-500/30">
                <div class="flex items-center justify-between mb-3">
                  <span class="text-sm text-text/70">Next Prediction</span>
                  <span class="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">20% Accurate</span>
                </div>
                <div class="text-3xl font-bold text-blue-400 mb-2">{{ freeBotPrediction }}x</div>
                <div class="flex items-center space-x-2 text-sm text-text/70">
                  <TrendingUp class="w-4 h-4" />
                  <span>Free tier prediction</span>
                </div>
              </div>

              <!-- Risk Level -->
              <div class="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                <span class="text-sm">Accuracy Level</span>
                <div class="flex items-center space-x-2">
                  <div class="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-blue-400 to-cyan-400 w-1/5"></div>
                  </div>
                  <span class="text-sm font-semibold text-blue-400">20%</span>
                </div>
              </div>

              <!-- Free Bot Button -->
              <button @click="showPlatformModal = true" class="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-semibold hover:scale-105 transition-all">
                🤖 Free Bot Active
              </button>
            </div>
          </div>

          <!-- Premium AI Bot (Locked - 85% Accurate) -->
          <div class="glass rounded-2xl p-6 animate-slide-up relative overflow-hidden" style="animation-delay: 0.4s;">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
                  <Bot class="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 class="text-xl font-bold">Premium AI Bot</h3>
                  <p class="text-sm text-text/60">Advanced predictions • 85% Accuracy</p>
                </div>
              </div>
              <span class="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-semibold">Locked</span>
            </div>

            <!-- Locked State -->
            <div class="relative">
              <div class="blur-sm pointer-events-none opacity-50">
                <div class="bg-white/5 rounded-xl p-4 border border-primary/30 mb-4">
                  <div class="text-3xl font-bold text-primary mb-2">3.85x</div>
                  <div class="text-sm text-text/70">Premium prediction</div>
                </div>
                <div class="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <span class="text-sm">Accuracy Level</span>
                  <span class="text-sm font-semibold text-primary">85%</span>
                </div>
              </div>
              
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="glass rounded-2xl p-6 text-center max-w-sm border-2 border-primary/30">
                  <Lock class="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 class="text-xl font-bold mb-2">Unlock Premium Bot</h4>
                  <p class="text-sm text-text/70 mb-2">
                    Get 85% accurate predictions
                  </p>
                  <p class="text-xs text-primary font-semibold mb-4">
                    4x more accurate than free bot!
                  </p>
                  <button @click="upgradePlan" class="px-6 py-3 bg-gradient-to-r from-primary to-accent rounded-xl font-semibold hover:scale-105 transition-all">
                    Unlock Bot Access →
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Predictions -->
          <div class="glass rounded-2xl p-6 animate-slide-up" style="animation-delay: 0.4s;">
            <h3 class="text-xl font-bold mb-4">Recent Predictions</h3>
            <div class="space-y-3">
              <div v-for="(prediction, index) in recentPredictions" :key="index" 
                   class="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                <div class="flex items-center space-x-4">
                  <div class="text-2xl">{{ prediction.icon }}</div>
                  <div>
                    <div class="font-semibold">{{ prediction.multiplier }}x</div>
                    <div class="text-xs text-text/60">{{ prediction.time }}</div>
                  </div>
                </div>
                <div class="text-right">
                  <div :class="prediction.confidence === 'High' ? 'text-green-400' : prediction.confidence === 'Medium' ? 'text-yellow-400' : 'text-red-400'" 
                       class="text-sm font-semibold">
                    {{ prediction.confidence }}
                  </div>
                  <div class="text-xs text-text/60">Confidence</div>
                </div>
              </div>
            </div>
            
            <div v-if="!hasBotAccess" class="mt-4 p-4 bg-accent/10 border border-accent/30 rounded-xl text-center">
              <p class="text-sm text-text/70">Upgrade to see full prediction history</p>
            </div>
          </div>
        </div>

        <!-- Right Column - Sidebar -->
        <div class="space-y-6">
          <!-- Quick Actions -->
          <div class="glass rounded-2xl p-6 animate-slide-up" style="animation-delay: 0.5s;">
            <h3 class="text-lg font-bold mb-4">Quick Actions</h3>
            <div class="space-y-3">
              <button @click="goToAnalysis" class="w-full flex items-center space-x-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                <BarChart3 class="w-5 h-5 text-primary" />
                <span>View Analysis</span>
              </button>
              <button @click="goToRatings" class="w-full flex items-center space-x-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                <Star class="w-5 h-5 text-yellow-400" />
                <span>Ratings & Reviews</span>
              </button>
              <button @click="upgradePlan" class="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-primary to-accent rounded-xl hover:scale-105 transition-all">
                <Crown class="w-5 h-5 text-white" />
                <span class="text-white font-semibold">Upgrade Plan</span>
              </button>
            </div>
          </div>

          <!-- Account Info -->
          <div class="glass rounded-2xl p-6 animate-slide-up" style="animation-delay: 0.6s;">
            <h3 class="text-lg font-bold mb-4">Account Info</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between text-sm">
                <span class="text-text/70">Email</span>
                <span class="font-semibold">{{ userEmail }}</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-text/70">Plan</span>
                <span class="font-semibold text-primary">{{ userPlan }}</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-text/70">Status</span>
                <span class="text-green-400 font-semibold">Active</span>
              </div>
              <div v-if="expiryDate" class="flex items-center justify-between text-sm">
                <span class="text-text/70">Expires</span>
                <span class="font-semibold">{{ expiryDate }}</span>
              </div>
            </div>
          </div>

          <!-- Disclaimer -->
          <div class="glass rounded-2xl p-6 animate-slide-up border border-yellow-500/30" style="animation-delay: 0.7s;">
            <div class="flex items-start space-x-3">
              <AlertTriangle class="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 class="font-semibold text-yellow-400 mb-2">Important Notice</h4>
                <p class="text-xs text-text/70">
                  Aviator AI provides analytical insights only. No guaranteed winnings. Please gamble responsibly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Platform Selection Modal -->
    <div v-if="showPlatformModal" class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" @click="showPlatformModal = false">
      <div class="glass rounded-2xl p-8 max-w-2xl w-full border border-white/20 animate-slide-up" @click.stop>
        <!-- Modal Header -->
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-2xl font-bold mb-2">Choose Your Platform</h3>
            <p class="text-text/70">Select where you want to play Aviator</p>
          </div>
          <button @click="showPlatformModal = false" class="w-10 h-10 glass rounded-xl hover:bg-white/20 transition-all flex items-center justify-center">
            <span class="text-2xl">×</span>
          </button>
        </div>

        <!-- Platform Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Sporty Card -->
          <button @click="selectPlatform('sporty')" class="glass rounded-2xl p-6 hover:scale-105 hover:border-primary/50 border-2 border-transparent transition-all group">
            <div class="aspect-square rounded-xl overflow-hidden mb-4 bg-white/5">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXKFH79Hi1ewAVxqlYC7d2nQrdM7vIqZtnS9JCa4yIWyCMOMVL1g3dQRH-7Lry5vFoCEU&usqp=CAU" 
                alt="Sporty" 
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h4 class="text-xl font-bold mb-2">Sporty</h4>
            <p class="text-sm text-text/70 mb-4">Play Aviator on Sporty platform</p>
            <div class="flex items-center justify-center space-x-2 text-primary">
              <span class="text-sm font-semibold">Select Platform</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </button>

          <!-- Msport Card -->
          <button @click="selectPlatform('msport')" class="glass rounded-2xl p-6 hover:scale-105 hover:border-accent/50 border-2 border-transparent transition-all group">
            <div class="aspect-square rounded-xl overflow-hidden mb-4 bg-white/5">
              <img 
                src="https://play-lh.googleusercontent.com/KTIOJFZff5nOlKJnkvhUBGqfzb0e7bsryCeMKIhbIozG8camnhxwJx5-98wkrqvcOKnE" 
                alt="Msport" 
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h4 class="text-xl font-bold mb-2">Msport</h4>
            <p class="text-sm text-text/70 mb-4">Play Aviator on Msport platform</p>
            <div class="flex items-center justify-center space-x-2 text-accent">
              <span class="text-sm font-semibold">Select Platform</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </button>
        </div>

        <!-- Info Note -->
        <div class="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
          <p class="text-sm text-blue-400 text-center">
            💡 Choose your preferred platform to get AI predictions
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Plane, Crown, LogOut, CheckCircle, Bot, TrendingUp, Lock, 
  BarChart3, Star, AlertTriangle 
} from 'lucide-vue-next'

const router = useRouter()

// User data (from localStorage for now, will use Firebase later)
const userData = ref(JSON.parse(localStorage.getItem('signupData') || '{}'))

const userName = computed(() => userData.value.firstName || 'User')
const userEmail = computed(() => userData.value.email || 'user@example.com')
const userPlan = ref('Free') // Will come from Firebase
const hasBotAccess = ref(false) // Will come from Firebase
const memberSince = ref('Jan 2026')
const expiryDate = ref(null)
const showLogoutMenu = ref(false)
const showPlatformModal = ref(false)

// Free bot prediction (random between 1.5 and 3.0)
const freeBotPrediction = ref((Math.random() * 1.5 + 1.5).toFixed(2))

// Recent predictions (mock data)
const recentPredictions = ref([
  { icon: '🎯', multiplier: '2.45', time: '2 mins ago', confidence: 'High' },
  { icon: '📈', multiplier: '1.85', time: '5 mins ago', confidence: 'Medium' },
  { icon: '⚡', multiplier: '3.20', time: '8 mins ago', confidence: 'High' },
  { icon: '🎲', multiplier: '1.50', time: '12 mins ago', confidence: 'Low' },
])

const handleLogout = () => {
  showLogoutMenu.value = false
  localStorage.removeItem('signupData')
  router.push('/')
}

const upgradePlan = () => {
  alert('Upgrade feature coming soon!')
}

const goToAnalysis = () => {
  alert('Dashboard Analysis coming soon!')
}

const goToRatings = () => {
  alert('Dashboard Ratings coming soon!')
}

const selectPlatform = (platform: string) => {
  showPlatformModal.value = false
  // Store selected platform
  localStorage.setItem('selectedPlatform', platform)
  // Navigate to bot page
  router.push('/dashboard/bot')
}

onMounted(() => {
  // Check if user is logged in
  if (!userData.value.email) {
    router.push('/signup')
  }
})
</script>
