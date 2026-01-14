<template>
  <div class="min-h-screen py-20 px-4">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <!-- Aviator Plane Image -->
        <div class="mb-6 flex justify-center">
          <img 
            src="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=300&h=200&fit=crop" 
            alt="Aviator"
            class="w-48 h-32 object-cover rounded-2xl shadow-2xl border-2 border-accent/30"
          />
        </div>
        
        <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Predictor Bot
        </h1>
        <p class="text-xl text-text/80">
          AI-powered analysis for entertainment purposes only
        </p>
      </div>

      <!-- Prediction Card -->
      <div class="glass rounded-2xl p-8 mb-8">
        <div class="text-center mb-8">
          <div class="inline-flex items-center space-x-2 bg-accent/20 rounded-full px-4 py-2 mb-4">
            <Bot class="w-5 h-5 text-accent" />
            <span class="text-accent font-semibold">Entertainment Only</span>
          </div>
          
          <div v-if="currentPrediction" class="space-y-4">
            <div class="text-6xl font-bold text-primary">
              {{ currentPrediction.multiplier }}
            </div>
            <div class="text-lg text-text/80">
              Confidence: <span class="text-accent font-semibold">{{ currentPrediction.confidence }}%</span>
            </div>
            <div class="text-sm text-text/60">
              Generated at {{ currentPrediction.timestamp }}
            </div>
          </div>
          
          <div v-else class="text-text/60">
            Click the button below to generate a prediction
          </div>
        </div>

        <div class="text-center">
          <button 
            @click="generatePrediction" 
            :disabled="isGenerating"
            class="btn-primary text-lg px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Zap v-if="!isGenerating" class="w-5 h-5 inline mr-2" />
            <Loader v-else class="w-5 h-5 inline mr-2 animate-spin" />
            {{ isGenerating ? 'Analyzing...' : 'Generate Prediction' }}
          </button>
        </div>
      </div>

      <!-- Prediction History -->
      <div class="glass rounded-2xl p-8">
        <h2 class="text-2xl font-bold mb-6 flex items-center">
          <History class="w-6 h-6 mr-2 text-primary" />
          Prediction History
        </h2>
        
        <div v-if="predictionHistory.length === 0" class="text-center text-text/60 py-8">
          No predictions generated yet
        </div>
        
        <div v-else class="space-y-4">
          <div 
            v-for="prediction in predictionHistory" 
            :key="prediction.id"
            class="flex justify-between items-center p-4 bg-white/5 rounded-xl"
          >
            <div class="flex items-center space-x-4">
              <div class="text-2xl font-bold text-primary">
                {{ prediction.multiplier }}
              </div>
              <div class="text-sm text-text/60">
                {{ prediction.timestamp }}
              </div>
            </div>
            <div class="text-accent font-semibold">
              {{ prediction.confidence }}%
            </div>
          </div>
        </div>
      </div>

      <!-- Disclaimer -->
      <div class="mt-8 glass-dark rounded-2xl p-6 border-2 border-accent/30">
        <div class="flex items-start space-x-3">
          <AlertTriangle class="w-6 h-6 text-accent flex-shrink-0 mt-1" />
          <div class="text-sm text-text/80">
            <strong class="text-accent">Disclaimer:</strong> This predictor uses simulated algorithms for entertainment purposes only. 
            Predictions are not guaranteed and should not be used for actual gambling decisions.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Bot, Zap, Loader, History, AlertTriangle } from 'lucide-vue-next'

interface Prediction {
  id: number
  multiplier: string
  confidence: number
  timestamp: string
}

const currentPrediction = ref<Prediction | null>(null)
const predictionHistory = ref<Prediction[]>([])
const isGenerating = ref(false)

const generatePrediction = async () => {
  isGenerating.value = true
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Generate random prediction
  const multipliers = ['1.2x - 2.1x', '1.5x - 3.2x', '2.0x - 4.5x', '1.8x - 2.8x', '1.1x - 1.9x']
  const confidence = Math.floor(Math.random() * 30) + 60 // 60-90%
  const multiplier = multipliers[Math.floor(Math.random() * multipliers.length)] || '1.5x - 2.5x'
  
  const prediction: Prediction = {
    id: Date.now(),
    multiplier,
    confidence,
    timestamp: new Date().toLocaleTimeString()
  }
  
  currentPrediction.value = prediction
  predictionHistory.value.unshift(prediction)
  
  // Keep only last 10 predictions
  if (predictionHistory.value.length > 10) {
    predictionHistory.value = predictionHistory.value.slice(0, 10)
  }
  
  isGenerating.value = false
}
</script>