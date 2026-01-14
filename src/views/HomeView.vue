<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative overflow-hidden py-12 md:py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <div class="text-center md:text-left animate-slide-up">
            <div class="inline-block mb-4 px-4 py-2 bg-primary/20 rounded-full border border-primary/30">
              <span class="text-primary font-semibold">🎯 AI-Powered Predictions</span>
            </div>
            
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span class="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Aviator Game
              </span>
              <br />
              <span class="text-white">Predictor AI</span>
            </h1>
            
            <p class="text-xl md:text-2xl text-text/80 mb-8 leading-relaxed">
              Advanced analysis and probability-based predictions for smarter gameplay. 
              Get real-time insights and boost your winning strategy.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8">
              <router-link to="/signup" class="btn-primary text-lg px-8 py-4 flex items-center justify-center">
                <Zap class="w-5 h-5 mr-2" />
                Get Started Now
              </router-link>
              <router-link to="/analysis" class="btn-accent text-lg px-8 py-4 flex items-center justify-center">
                <TrendingUp class="w-5 h-5 mr-2" />
                View Analysis
              </router-link>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-4 mt-12">
              <div class="text-center">
                <div class="text-3xl font-bold text-primary">98%</div>
                <div class="text-sm text-text/60">Accuracy</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-accent">10K+</div>
                <div class="text-sm text-text/60">Users</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-primary">24/7</div>
                <div class="text-sm text-text/60">Support</div>
              </div>
            </div>
          </div>

          <!-- Right Image -->
          <div class="relative animate-fade-in">
            <div class="relative z-10">
              <img 
                src="https://cgtwiles.com/wp-content/uploads/2025/07/download-aviator-game-app.png" 
                alt="Aviator Game App"
                class="w-full h-auto rounded-2xl shadow-2xl"
              />
              <!-- Glow Effect -->
              <div class="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-3xl -z-10"></div>
            </div>
            
            <!-- Floating Elements -->
            <div class="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl animate-pulse-slow"></div>
            <div class="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-pulse-slow" style="animation-delay: 1s;"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 px-4 bg-gradient-to-b from-transparent to-black/20">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16 animate-fade-in">
          <h2 class="text-4xl md:text-5xl font-bold mb-4">
            <span class="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Why Choose Us?
            </span>
          </h2>
          <p class="text-xl text-text/70">
            Powerful features to enhance your gaming experience
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="(feature, index) in features" :key="feature.title" 
            class="glass rounded-2xl p-8 hover:scale-105 transition-all duration-300 hover:border-primary/30 border border-transparent animate-slide-up"
            :style="{ animationDelay: `${index * 0.2}s` }">
            <div class="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-6">
              <component :is="feature.icon" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-2xl font-bold mb-4">{{ feature.title }}</h3>
            <p class="text-text/70 leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Video Demo Section -->
    <section class="py-20 px-4 bg-gradient-to-b from-transparent to-black/20">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold mb-4">
            <span class="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              See It In Action
            </span>
          </h2>
          <p class="text-xl text-text/70">
            Watch how our AI-powered predictions work in real-time
          </p>
        </div>

        <!-- Video with Side Content -->
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Video -->
          <div class="animate-slide-up">
            <div class="glass rounded-2xl p-3 hover:border-primary/30 border border-transparent transition-all duration-300">
              <div class="relative rounded-xl overflow-hidden shadow-2xl">
                <video 
                  class="w-full h-auto"
                  controls
                  autoplay
                  muted
                  loop
                  playsinline
                >
                  <source src="/generated_video.mp4" type="video/mp4">
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>

          <!-- Side Content -->
          <div class="animate-slide-up" style="animation-delay: 0.2s;">
            <div class="space-y-6">
              <div>
                <h3 class="text-3xl font-bold mb-4">
                  Real-Time Predictions
                </h3>
                <p class="text-lg text-text/80 leading-relaxed">
                  Our advanced AI algorithm analyzes thousands of data points in real-time to provide you with accurate predictions and insights for the Aviator game.
                </p>
              </div>

              <div class="space-y-4">
                <div class="flex items-start space-x-4 p-4 glass rounded-xl hover:border-primary/30 border border-transparent transition-all duration-300">
                  <div class="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp class="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 class="font-bold mb-1">Live Data Analysis</h4>
                    <p class="text-sm text-text/70">Track multiplier trends and patterns as they happen</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4 p-4 glass rounded-xl hover:border-accent/30 border border-transparent transition-all duration-300">
                  <div class="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BarChart3 class="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 class="font-bold mb-1">Statistical Insights</h4>
                    <p class="text-sm text-text/70">Comprehensive charts showing probability distributions</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4 p-4 glass rounded-xl hover:border-primary/30 border border-transparent transition-all duration-300">
                  <div class="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap class="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 class="font-bold mb-1">Instant Notifications</h4>
                    <p class="text-sm text-text/70">Get alerts for high-probability opportunities</p>
                  </div>
                </div>
              </div>

              <div class="pt-4">
                <router-link to="/signup" class="btn-primary text-lg px-8 py-4 inline-flex items-center">
                  Get Started Now
                  <ArrowRight class="w-5 h-5 ml-2" />
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->

    <!-- CTA Section -->
    <section class="py-20 px-4">
      <div class="max-w-4xl mx-auto">
        <div class="glass-dark rounded-3xl p-12 text-center border-2 border-primary/30 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10"></div>
          <div class="relative z-10">
            <h2 class="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p class="text-xl text-text/80 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already using our AI-powered predictions to enhance their gaming experience.
            </p>
            <router-link to="/analysis" class="btn-primary text-lg px-10 py-4 inline-flex items-center">
              <Zap class="w-5 h-5 mr-2" />
              Start Analyzing Now
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Disclaimer Section -->
    <section class="py-20 px-4">
      <div class="max-w-4xl mx-auto">
        <div class="glass-dark rounded-2xl p-8 border-2 border-accent/30">
          <div class="flex items-start space-x-4">
            <AlertTriangle class="w-8 h-8 text-accent flex-shrink-0 mt-1" />
            <div>
              <h3 class="text-2xl font-bold mb-4 text-accent">Important Disclaimer</h3>
              <p class="text-text/80 leading-relaxed">
                This platform provides analysis and simulated predictions for educational and entertainment purposes only. 
                We do not guarantee winnings or accuracy. All predictions are probability-based and should not be considered 
                as financial advice. Please gamble responsibly and never bet more than you can afford to lose.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { TrendingUp, BarChart3, Bot, AlertTriangle, Star, Zap, Shield, Clock, ArrowRight } from 'lucide-vue-next'

const features = [
  {
    icon: TrendingUp,
    title: 'Real-time Analysis',
    description: 'Track crash multiplier trends and patterns in real-time with advanced AI algorithms for accurate predictions.'
  },
  {
    icon: BarChart3,
    title: 'Statistical Insights',
    description: 'Comprehensive charts and data visualization showing high vs low frequency patterns and historical trends.'
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Your data is protected with enterprise-grade security. We prioritize your privacy and safety above all.'
  }
]

const steps = [
  {
    title: 'Sign Up',
    description: 'Create your free account in seconds and get instant access to all features.'
  },
  {
    title: 'Analyze Data',
    description: 'View real-time analysis, charts, and probability-based predictions.'
  },
  {
    title: 'Make Decisions',
    description: 'Use insights to make informed decisions and improve your strategy.'
  }
]
</script>