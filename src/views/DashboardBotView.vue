<template>
  <div class="min-h-screen bg-background relative overflow-hidden">
    <!-- Animated Background Grid -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0" style="background-image: linear-gradient(#3B82F6 1px, transparent 1px), linear-gradient(90deg, #3B82F6 1px, transparent 1px); background-size: 50px 50px;"></div>
    </div>

    <!-- Back Button -->
    <div class="absolute top-4 left-4 z-50">
      <button @click="goBack" class="glass px-4 py-2 rounded-xl hover:bg-white/20 transition-all flex items-center space-x-2">
        <ArrowLeft class="w-5 h-5" />
        <span>Back to Dashboard</span>
      </button>
    </div>

    <!-- Platform Badge -->
    <div class="absolute top-4 right-4 z-50">
      <div class="glass px-4 py-2 rounded-xl flex items-center space-x-2">
        <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span class="text-sm font-semibold">{{ selectedPlatform.toUpperCase() }}</span>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 py-8 relative z-10">
      <!-- Header -->
      <div class="text-center mb-8 animate-fade-in">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          Aviator AI Bot
        </h1>
        <p class="text-text/70">AI-Powered Prediction Analysis • 20% Accuracy</p>
      </div>

      <!-- Main Game Area -->
      <div class="glass rounded-3xl p-8 mb-6 relative overflow-hidden border-2" :class="gameState === 'analyzing' ? 'border-red-500/50' : 'border-white/20'">
        <!-- Multiplier Display -->
        <div class="text-center mb-8">
          <div class="inline-block glass rounded-2xl px-8 py-4 mb-4">
            <div class="text-6xl md:text-8xl font-bold" :class="getMultiplierColor()">
              {{ currentMultiplier }}x
            </div>
          </div>
          
          <!-- Status Text -->
          <div class="text-xl font-semibold" :class="getStatusColor()">
            {{ statusText }}
          </div>
        </div>

        <!-- Plane Animation Area -->
        <div class="relative h-64 md:h-96 mb-8 rounded-2xl bg-gradient-to-b from-blue-900/20 to-transparent overflow-hidden">
          <!-- Plane -->
          <div 
            ref="planeRef"
            class="absolute transition-all duration-1000 ease-out"
            :style="planeStyle"
          >
            <div class="relative">
              <!-- Plane Icon (Red) -->
              <div class="text-6xl md:text-8xl transform -rotate-45" :class="gameState === 'analyzing' ? 'animate-pulse' : ''">
                ✈️
              </div>
              
              <!-- Engine Glow -->
              <div v-if="gameState === 'idle' || gameState === 'analyzing'" class="absolute -bottom-2 -right-2 w-8 h-8 bg-red-500 rounded-full blur-xl animate-pulse"></div>
              
              <!-- Trail Effect -->
              <div v-if="gameState === 'analyzing'" class="absolute top-1/2 right-full w-32 h-1 bg-gradient-to-r from-red-500 to-transparent"></div>
            </div>
          </div>

          <!-- Particle Effects -->
          <div v-if="gameState === 'analyzing'" class="absolute inset-0">
            <div v-for="i in 10" :key="i" class="absolute w-2 h-2 bg-red-500 rounded-full animate-ping" :style="getParticleStyle(i)"></div>
          </div>
        </div>

        <!-- Confidence Meter -->
        <div v-if="gameState === 'result'" class="mb-6 animate-slide-up">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-text/70">Confidence Level</span>
            <span class="text-sm font-semibold" :class="getConfidenceColor()">{{ confidence }}</span>
          </div>
          <div class="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-1000" :style="{ width: confidenceWidth }"></div>
          </div>
        </div>

        <!-- Result Card -->
        <div v-if="gameState === 'result'" class="glass rounded-2xl p-6 mb-6 animate-slide-up border-2 border-red-500/30">
          <div class="flex items-center justify-between mb-4">
            <div>
              <div class="text-sm text-text/70 mb-1">🎯 Suggested Cashout</div>
              <div class="text-3xl font-bold text-red-500">{{ finalMultiplier }}x</div>
            </div>
            <div class="text-right">
              <div class="text-sm text-text/70 mb-1">Confidence</div>
              <div class="px-4 py-2 rounded-xl font-semibold" :class="getConfidenceBadgeClass()">
                {{ confidence }}
              </div>
            </div>
          </div>
          
          <div class="text-xs text-text/60 text-center pt-4 border-t border-white/10">
            AI Analysis based on {{ selectedPlatform.toUpperCase() }} patterns
          </div>
        </div>

        <!-- Controls -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            @click="startAnalysis" 
            :disabled="gameState === 'analyzing'"
            class="px-8 py-4 rounded-xl font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            :class="gameState === 'analyzing' ? 'bg-gray-600' : 'bg-gradient-to-r from-red-500 to-orange-500 hover:scale-105'"
          >
            <span v-if="gameState === 'analyzing'">⏳ Analyzing...</span>
            <span v-else>🤖 Analyze Next Round</span>
          </button>
          
          <button 
            v-if="gameState === 'result'"
            @click="reset" 
            class="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-lg transition-all hover:scale-105"
          >
            🔄 Reset
          </button>
        </div>
      </div>

      <!-- Prediction History -->
      <div class="glass rounded-2xl p-6 mb-6">
        <h3 class="text-xl font-bold mb-4">Recent Predictions</h3>
        <div class="space-y-3">
          <div v-for="(prediction, index) in predictionHistory" :key="index" 
               class="flex items-center justify-between p-4 bg-white/5 rounded-xl">
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
              <div class="text-xs text-text/60">{{ prediction.platform }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Disclaimer -->
      <div class="glass rounded-2xl p-6 border-2 border-yellow-500/30">
        <div class="flex items-start space-x-3">
          <AlertTriangle class="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
          <div>
            <h4 class="font-bold text-yellow-400 mb-2">⚠️ Important Disclaimer</h4>
            <p class="text-sm text-text/70">
              This is an AI analysis tool for educational purposes only. Predictions are not guaranteed and should not be used as the sole basis for gambling decisions. The 20% accuracy rate is for free tier users. Always gamble responsibly.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, AlertTriangle } from 'lucide-vue-next'

const router = useRouter()

// Game State
type GameState = 'idle' | 'analyzing' | 'result'
const gameState = ref<GameState>('idle')
const currentMultiplier = ref('1.00')
const finalMultiplier = ref('0.00')
const confidence = ref<'Low' | 'Medium' | 'High'>('Medium')
const selectedPlatform = ref(localStorage.getItem('selectedPlatform') || 'sporty')

// Plane Animation
const planeRef = ref<HTMLElement | null>(null)
const planeStyle = ref({
  left: '10%',
  bottom: '20%',
  transform: 'rotate(-45deg)'
})

// Prediction History
const predictionHistory = ref<Array<{
  icon: string
  multiplier: string
  time: string
  confidence: string
  platform: string
}>>([])

// Status Text
const statusText = computed(() => {
  switch (gameState.value) {
    case 'idle':
      return 'Ready to analyze'
    case 'analyzing':
      return 'AI analyzing patterns...'
    case 'result':
      return 'Prediction ready!'
    default:
      return ''
  }
})

// Confidence Width
const confidenceWidth = computed(() => {
  switch (confidence.value) {
    case 'Low':
      return '33%'
    case 'Medium':
      return '66%'
    case 'High':
      return '100%'
    default:
      return '50%'
  }
})

// Generate random multiplier (biased towards 1.2x - 3.0x)
const generateMultiplier = () => {
  const random = Math.random()
  if (random < 0.7) {
    // 70% chance: 1.2x - 3.0x
    return (Math.random() * 1.8 + 1.2).toFixed(2)
  } else if (random < 0.95) {
    // 25% chance: 3.0x - 5.0x
    return (Math.random() * 2 + 3).toFixed(2)
  } else {
    // 5% chance: 5.0x - 10.0x
    return (Math.random() * 5 + 5).toFixed(2)
  }
}

// Generate confidence based on multiplier
const generateConfidence = (multiplier: number): 'Low' | 'Medium' | 'High' => {
  if (multiplier < 2) return 'High'
  if (multiplier < 4) return 'Medium'
  return 'Low'
}

// Start Analysis
const startAnalysis = async () => {
  gameState.value = 'analyzing'
  currentMultiplier.value = '1.00'
  
  // Animate plane
  planeStyle.value = {
    left: '10%',
    bottom: '20%',
    transform: 'rotate(-45deg)'
  }
  
  // Simulate analysis time
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Animate plane flying
  planeStyle.value = {
    left: '80%',
    bottom: '80%',
    transform: 'rotate(-45deg) scale(0.8)'
  }
  
  // Count up multiplier
  const targetMultiplier = parseFloat(generateMultiplier())
  const steps = 20
  const increment = (targetMultiplier - 1) / steps
  
  for (let i = 0; i < steps; i++) {
    await new Promise(resolve => setTimeout(resolve, 100))
    currentMultiplier.value = (1 + increment * (i + 1)).toFixed(2)
  }
  
  // Final result
  finalMultiplier.value = targetMultiplier.toFixed(2)
  currentMultiplier.value = finalMultiplier.value
  confidence.value = generateConfidence(targetMultiplier)
  gameState.value = 'result'
  
  // Add to history
  predictionHistory.value.unshift({
    icon: getRandomIcon(),
    multiplier: finalMultiplier.value,
    time: 'Just now',
    confidence: confidence.value,
    platform: selectedPlatform.value.toUpperCase()
  })
  
  // Keep only last 5
  if (predictionHistory.value.length > 5) {
    predictionHistory.value.pop()
  }
}

// Reset
const reset = () => {
  gameState.value = 'idle'
  currentMultiplier.value = '1.00'
  planeStyle.value = {
    left: '10%',
    bottom: '20%',
    transform: 'rotate(-45deg)'
  }
}

// Go Back
const goBack = () => {
  router.push('/dashboard')
}

// Helper Functions
const getMultiplierColor = () => {
  if (gameState.value === 'analyzing') return 'text-red-500 animate-pulse'
  if (gameState.value === 'result') return 'text-red-500'
  return 'text-text/50'
}

const getStatusColor = () => {
  if (gameState.value === 'analyzing') return 'text-red-400'
  if (gameState.value === 'result') return 'text-green-400'
  return 'text-text/70'
}

const getConfidenceColor = () => {
  switch (confidence.value) {
    case 'High': return 'text-green-400'
    case 'Medium': return 'text-yellow-400'
    case 'Low': return 'text-red-400'
    default: return 'text-text/70'
  }
}

const getConfidenceBadgeClass = () => {
  switch (confidence.value) {
    case 'High': return 'bg-green-500/20 text-green-400'
    case 'Medium': return 'bg-yellow-500/20 text-yellow-400'
    case 'Low': return 'bg-red-500/20 text-red-400'
    default: return 'bg-white/10 text-text/70'
  }
}

const getParticleStyle = (index: number) => {
  const randomX = Math.random() * 100
  const randomY = Math.random() * 100
  const randomDelay = Math.random() * 2
  return {
    left: `${randomX}%`,
    top: `${randomY}%`,
    animationDelay: `${randomDelay}s`
  }
}

const getRandomIcon = (): string => {
  const icons = ['🎯', '📈', '⚡', '🎲', '🔥', '💎', '⭐', '🚀']
  return icons[Math.floor(Math.random() * icons.length)] || '🎯'
}

onMounted(() => {
  // Check if platform was selected
  if (!localStorage.getItem('selectedPlatform')) {
    router.push('/dashboard')
  }
})
</script>
