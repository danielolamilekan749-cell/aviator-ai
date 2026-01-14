<template>
  <div class="min-h-screen py-20 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12 animate-fade-in">
        <!-- Aviator Image -->
        <div class="mb-6 flex justify-center">
          <img 
            src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=300&h=200&fit=crop" 
            alt="Analysis"
            class="w-48 h-32 object-cover rounded-2xl shadow-2xl border-2 border-primary/30 hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Recent Analysis
        </h1>
        <p class="text-xl text-text/80">
          Real-time data and trend analysis
        </p>
      </div>

      <!-- Live Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-slide-up">
        <div class="glass rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 hover:border-primary/30 border border-transparent">
          <div class="text-3xl font-bold text-primary mb-2">{{ liveStats.avgMultiplier }}x</div>
          <div class="text-sm text-text/60">Avg Multiplier</div>
        </div>
        <div class="glass rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 hover:border-accent/30 border border-transparent">
          <div class="text-3xl font-bold text-accent mb-2">{{ liveStats.highestToday }}x</div>
          <div class="text-sm text-text/60">Highest Today</div>
        </div>
        <div class="glass rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 hover:border-primary/30 border border-transparent">
          <div class="text-3xl font-bold text-primary mb-2">{{ liveStats.totalRounds }}</div>
          <div class="text-sm text-text/60">Total Rounds</div>
        </div>
        <div class="glass rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 hover:border-accent/30 border border-transparent">
          <div class="text-3xl font-bold text-accent mb-2 flex items-center justify-center">
            <Activity class="w-6 h-6 mr-2 animate-pulse" />
            Live
          </div>
          <div class="text-sm text-text/60">Status</div>
        </div>
      </div>

      <!-- Filters -->
      <div class="glass rounded-2xl p-6 mb-8 animate-slide-up" style="animation-delay: 0.1s;">
        <div class="flex flex-wrap gap-4 items-center">
          <div class="flex items-center space-x-2">
            <Filter class="w-5 h-5 text-primary" />
            <span class="font-semibold">Filters:</span>
          </div>
          <select v-model="selectedTimeRange" class="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-text hover:border-primary transition-colors">
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <select v-model="selectedRange" class="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-text hover:border-primary transition-colors">
            <option value="all">All Multipliers</option>
            <option value="low">Low (1.0x - 2.0x)</option>
            <option value="medium">Medium (2.0x - 5.0x)</option>
            <option value="high">High (5.0x+)</option>
          </select>
        </div>
      </div>

      <!-- Charts Grid -->
      <div class="grid lg:grid-cols-2 gap-8 mb-8">
        <!-- Multiplier Trends Chart -->
        <div class="glass rounded-2xl p-6 animate-slide-up hover:scale-[1.02] transition-all duration-300" style="animation-delay: 0.2s;">
          <h2 class="text-xl font-bold mb-4 flex items-center">
            <TrendingUp class="w-5 h-5 mr-2 text-primary" />
            Multiplier Trends
          </h2>
          <div class="h-64">
            <canvas ref="lineChartRef"></canvas>
          </div>
        </div>

        <!-- Frequency Analysis -->
        <div class="glass rounded-2xl p-6 animate-slide-up hover:scale-[1.02] transition-all duration-300" style="animation-delay: 0.3s;">
          <h2 class="text-xl font-bold mb-4 flex items-center">
            <PieChart class="w-5 h-5 mr-2 text-accent" />
            Multiplier Distribution
          </h2>
          <div class="h-64">
            <canvas ref="pieChartRef"></canvas>
          </div>
        </div>
      </div>

      <!-- Recent Rounds Table -->
      <div class="glass rounded-2xl p-6 animate-slide-up hover:border-primary/30 border border-transparent transition-all duration-300" style="animation-delay: 0.4s;">
        <h2 class="text-xl font-bold mb-6 flex items-center">
          <Clock class="w-5 h-5 mr-2 text-primary animate-pulse" />
          Recent Game Rounds
        </h2>
        
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-white/20">
                <th class="text-left py-3 px-4 font-semibold">Round ID</th>
                <th class="text-left py-3 px-4 font-semibold">Multiplier</th>
                <th class="text-left py-3 px-4 font-semibold">Time</th>
                <th class="text-left py-3 px-4 font-semibold">Category</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="round in recentRounds" 
                :key="round.id"
                class="border-b border-white/10 hover:bg-white/5 transition-all duration-300 hover:scale-[1.01]"
              >
                <td class="py-3 px-4 text-text/80">#{{ round.id }}</td>
                <td class="py-3 px-4">
                  <span 
                    class="font-bold transition-all duration-300 hover:scale-110 inline-block"
                    :class="{
                      'text-red-400': round.multiplier < 2,
                      'text-yellow-400': round.multiplier >= 2 && round.multiplier < 5,
                      'text-green-400': round.multiplier >= 5
                    }"
                  >
                    {{ round.multiplier }}x
                  </span>
                </td>
                <td class="py-3 px-4 text-text/80">{{ round.time }}</td>
                <td class="py-3 px-4">
                  <span 
                    class="px-2 py-1 rounded-full text-xs font-semibold transition-all duration-300 hover:scale-110 inline-block"
                    :class="{
                      'bg-red-500/20 text-red-400': round.category === 'Low',
                      'bg-yellow-500/20 text-yellow-400': round.category === 'Medium',
                      'bg-green-500/20 text-green-400': round.category === 'High'
                    }"
                  >
                    {{ round.category }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { TrendingUp, PieChart, Clock, Filter, Activity } from 'lucide-vue-next'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const selectedTimeRange = ref('24h')
const selectedRange = ref('all')
const lineChartRef = ref<HTMLCanvasElement | null>(null)
const pieChartRef = ref<HTMLCanvasElement | null>(null)
let lineChart: Chart | null = null
let pieChart: Chart | null = null
let updateInterval: number | null = null

interface GameRound {
  id: number
  multiplier: number
  time: string
  category: 'Low' | 'Medium' | 'High'
}

const recentRounds = ref<GameRound[]>([])

const liveStats = ref({
  avgMultiplier: '2.45',
  highestToday: '15.8',
  totalRounds: '1,247',
})

const generateMockData = () => {
  const rounds: GameRound[] = []
  for (let i = 1; i <= 20; i++) {
    const multiplier = Math.random() * 10 + 1
    const category = multiplier < 2 ? 'Low' : multiplier < 5 ? 'Medium' : 'High'
    const time = new Date(Date.now() - i * 60000).toLocaleTimeString()
    
    rounds.push({
      id: 1000 + i,
      multiplier: Math.round(multiplier * 100) / 100,
      time,
      category
    })
  }
  recentRounds.value = rounds
}

const createLineChart = () => {
  if (!lineChartRef.value) return

  const ctx = lineChartRef.value.getContext('2d')
  if (!ctx) return

  const labels = Array.from({ length: 20 }, (_, i) => `${20 - i}m ago`)
  const data = Array.from({ length: 20 }, () => Math.random() * 8 + 1)

  lineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Multiplier',
        data,
        borderColor: '#22C55E',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#22C55E',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          titleColor: '#22C55E',
          bodyColor: '#E5E7EB',
          borderColor: '#22C55E',
          borderWidth: 1,
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#E5E7EB'
          }
        },
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#E5E7EB'
          }
        }
      }
    }
  })
}

const createPieChart = () => {
  if (!pieChartRef.value) return

  const ctx = pieChartRef.value.getContext('2d')
  if (!ctx) return

  pieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Low (1-2x)', 'Medium (2-5x)', 'High (5x+)'],
      datasets: [{
        data: [45, 40, 15],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(234, 179, 8, 0.8)',
          'rgba(34, 197, 94, 0.8)'
        ],
        borderColor: [
          '#EF4444',
          '#EAB308',
          '#22C55E'
        ],
        borderWidth: 2,
        hoverOffset: 10
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#E5E7EB',
            padding: 15,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          titleColor: '#22C55E',
          bodyColor: '#E5E7EB',
          borderColor: '#22C55E',
          borderWidth: 1,
        }
      }
    }
  })
}

const updateCharts = () => {
  if (lineChart && lineChart.data.datasets[0]) {
    const newData = Math.random() * 8 + 1
    lineChart.data.datasets[0].data.shift()
    lineChart.data.datasets[0].data.push(newData)
    lineChart.update('none')
  }

  // Update stats
  liveStats.value.avgMultiplier = (Math.random() * 2 + 1.5).toFixed(2)
  liveStats.value.totalRounds = (1247 + Math.floor(Math.random() * 10)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

onMounted(() => {
  generateMockData()
  createLineChart()
  createPieChart()
  
  // Update charts every 3 seconds
  updateInterval = window.setInterval(updateCharts, 3000)
})

onUnmounted(() => {
  if (lineChart) lineChart.destroy()
  if (pieChart) pieChart.destroy()
  if (updateInterval) clearInterval(updateInterval)
})
</script>