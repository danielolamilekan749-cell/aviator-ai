<template>
  <div class="min-h-screen py-20 px-4">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12 animate-fade-in">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          About AviatorAI
        </h1>
        <p class="text-xl text-text/80">
          Understanding our platform and mission
        </p>
      </div>

      <div class="space-y-8">
        <!-- What is Aviator -->
        <div class="glass rounded-2xl p-8 animate-slide-up hover:scale-[1.02] transition-all duration-300 hover:border-primary/30 border border-transparent">
          <h2 class="text-2xl font-bold mb-4 flex items-center">
            <Plane class="w-6 h-6 mr-2 text-primary" />
            What is Aviator?
          </h2>
          <p class="text-text/80 leading-relaxed">
            Aviator is a popular crash game where players watch a plane take off and must cash out before it crashes. 
            The multiplier increases as the plane flies higher, but the risk of crashing also increases. Our platform 
            provides educational analysis and simulated predictions to help users understand game patterns and trends.
          </p>
        </div>

        <!-- How Analysis Works -->
        <div class="glass rounded-2xl p-8 animate-slide-up hover:scale-[1.02] transition-all duration-300 hover:border-accent/30 border border-transparent" style="animation-delay: 0.1s;">
          <h2 class="text-2xl font-bold mb-4 flex items-center">
            <BarChart3 class="w-6 h-6 mr-2 text-accent" />
            How Our Analysis Works
          </h2>
          <div class="space-y-4 text-text/80">
            <p>Our analysis system uses:</p>
            <ul class="list-disc list-inside space-y-2 ml-4">
              <li class="hover:text-primary transition-colors">Historical data pattern recognition</li>
              <li class="hover:text-primary transition-colors">Statistical probability calculations</li>
              <li class="hover:text-primary transition-colors">Trend analysis algorithms</li>
              <li class="hover:text-primary transition-colors">Frequency distribution modeling</li>
            </ul>
            <p>
              All predictions are generated using simulated algorithms and mathematical models designed for 
              educational purposes only.
            </p>
          </div>
        </div>

        <!-- Transparency -->
        <div class="glass rounded-2xl p-8 animate-slide-up hover:scale-[1.02] transition-all duration-300 hover:border-primary/30 border border-transparent" style="animation-delay: 0.2s;">
          <h2 class="text-2xl font-bold mb-4 flex items-center">
            <Shield class="w-6 h-6 mr-2 text-primary" />
            Transparency & Fairness
          </h2>
          <div class="space-y-4 text-text/80">
            <p>We believe in complete transparency:</p>
            <ul class="list-disc list-inside space-y-2 ml-4">
              <li class="hover:text-primary transition-colors">No guaranteed winnings or promises of success</li>
              <li class="hover:text-primary transition-colors">Clear disclaimer on all prediction features</li>
              <li class="hover:text-primary transition-colors">Educational and entertainment focus</li>
              <li class="hover:text-primary transition-colors">Open about the limitations of our predictions</li>
              <li class="hover:text-primary transition-colors">Responsible gambling advocacy</li>
            </ul>
          </div>
        </div>

        <!-- Mission -->
        <div class="glass rounded-2xl p-8 animate-slide-up hover:scale-[1.02] transition-all duration-300 hover:border-accent/30 border border-transparent" style="animation-delay: 0.3s;">
          <h2 class="text-2xl font-bold mb-4 flex items-center">
            <Target class="w-6 h-6 mr-2 text-accent" />
            Our Mission
          </h2>
          <p class="text-text/80 leading-relaxed">
            To provide educational tools and insights that help users understand game mechanics and probability theory. 
            We aim to promote responsible gaming through education and awareness, never encouraging excessive gambling 
            or unrealistic expectations.
          </p>
        </div>

        <!-- Important Notice -->
        <div class="glass-dark rounded-2xl p-8 border-2 border-accent/30 animate-slide-up hover:scale-[1.02] transition-all duration-300" style="animation-delay: 0.4s;">
          <div class="flex items-start space-x-4">
            <AlertTriangle class="w-8 h-8 text-accent flex-shrink-0 mt-1 animate-pulse" />
            <div>
              <h3 class="text-2xl font-bold mb-4 text-accent">Important Notice</h3>
              <p class="text-text/80 leading-relaxed">
                This platform provides analysis and simulated predictions for educational and entertainment purposes only. 
                We do not guarantee winnings or accuracy. All predictions are probability-based and should not be considered 
                as financial advice. Please gamble responsibly and never bet more than you can afford to lose.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plane, BarChart3, Shield, Target, AlertTriangle } from 'lucide-vue-next'
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
