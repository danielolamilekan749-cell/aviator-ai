<template>
  <footer class="bg-black/30 border-t border-white/10 py-12 px-4">
    <div class="max-w-7xl mx-auto">
      <div class="grid md:grid-cols-4 gap-8">
        <!-- Logo & Description -->
        <div class="md:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <Plane class="w-5 h-5 text-white" />
            </div>
            <span class="text-xl font-bold text-white">AviatorAI</span>
          </div>
          <p class="text-text/70 mb-4 max-w-md">
            Advanced analysis and probability-based predictions for the Aviator game. 
            Educational and entertainment purposes only.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-text/60 hover:text-primary transition-colors">
              <Github class="w-5 h-5" />
            </a>
            <a href="#" class="text-text/60 hover:text-primary transition-colors">
              <Twitter class="w-5 h-5" />
            </a>
            <a href="#" class="text-text/60 hover:text-primary transition-colors">
              <Mail class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="font-semibold text-white mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/" class="text-text/70 hover:text-primary transition-colors">
                Home
              </router-link>
            </li>
            <li>
              <router-link to="/bot" class="text-text/70 hover:text-primary transition-colors">
                Aviator Bot
              </router-link>
            </li>
            <li>
              <router-link to="/analysis" class="text-text/70 hover:text-primary transition-colors">
                Analysis
              </router-link>
            </li>
            <li>
              <router-link to="/about" class="text-text/70 hover:text-primary transition-colors">
                About
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h3 class="font-semibold text-white mb-4">Support</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/contact" class="text-text/70 hover:text-primary transition-colors">
                Contact Us
              </router-link>
            </li>
            <li>
              <a href="#" class="text-text/70 hover:text-primary transition-colors">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" class="text-text/70 hover:text-primary transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" class="text-text/70 hover:text-primary transition-colors">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Disclaimer -->
      <div class="mt-8 pt-8 border-t border-white/10">
        <div class="glass-dark rounded-2xl p-6 border-2 border-accent/30 mb-6">
          <div class="flex items-start space-x-3">
            <AlertTriangle class="w-6 h-6 text-accent flex-shrink-0 mt-1" />
            <div class="text-sm text-text/80">
              <strong class="text-accent">Disclaimer:</strong> This platform provides analysis and simulated predictions for educational and entertainment purposes only. 
              We do not guarantee winnings or accuracy. Please gamble responsibly.
            </div>
          </div>
        </div>

        <div class="text-center text-text/60 text-sm">
          <p>&copy; 2026 AviatorAI. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Plane, Github, Twitter, Mail, AlertTriangle } from 'lucide-vue-next'
</script>