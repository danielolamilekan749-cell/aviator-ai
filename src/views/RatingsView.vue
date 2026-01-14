<template>
  <div class="min-h-screen py-20 px-4">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12 animate-fade-in">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          User Reviews
        </h1>
        <p class="text-xl text-text/80">
          What our users are saying about us
        </p>
      </div>

      <!-- Filter & Sort -->
      <div class="flex justify-between items-center mb-6 animate-slide-up">
        <h2 class="text-2xl font-bold">All Reviews ({{ reviews.length }})</h2>
        <select v-model="sortBy" class="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-text transition-all hover:border-primary">
          <option value="newest">Newest First</option>
          <option value="highest">Highest Rated</option>
          <option value="lowest">Lowest Rated</option>
        </select>
      </div>

      <!-- Reviews List -->
      <div class="space-y-6">
        <div
          v-for="(review, index) in sortedReviews"
          :key="review.id"
          class="glass rounded-2xl p-6 animate-slide-up hover:scale-[1.02] transition-all duration-300 hover:border-primary/30 border border-transparent"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center space-x-3">
              <img 
                :src="review.avatar" 
                :alt="review.username"
                class="w-12 h-12 rounded-full border-2 border-primary/30 animate-fade-in"
              />
              <div>
                <div class="font-semibold">{{ review.username }}</div>
                <div class="text-sm text-text/60">{{ review.date }}</div>
              </div>
            </div>
            <div class="flex">
              <Star
                v-for="star in 5"
                :key="star"
                :class="star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-500'"
                class="w-4 h-4 animate-pulse-slow"
              />
            </div>
          </div>
          <p class="text-text/80">{{ review.comment }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Star } from 'lucide-vue-next'

interface Review {
  id: number
  username: string
  rating: number
  comment: string
  date: string
  avatar: string
}

const sortBy = ref('newest')

const reviews = ref<Review[]>([
  {
    id: 1,
    username: 'Chukwuemeka Okafor',
    rating: 5,
    comment: 'This platform is amazing! The predictions helped me understand the game better. Very accurate analysis.',
    date: '2 hours ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces'
  },
  {
    id: 2,
    username: 'Aisha Mohammed',
    rating: 5,
    comment: 'Best aviator predictor I have used! The confidence percentages are really helpful. Highly recommend!',
    date: '3 hours ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces'
  },
  {
    id: 3,
    username: 'Oluwaseun Adeyemi',
    rating: 4,
    comment: 'Good analysis tool. The interface is clean and easy to use. Keep up the good work!',
    date: '5 hours ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces'
  },
  {
    id: 4,
    username: 'Fatima Bello',
    rating: 5,
    comment: 'I love this platform! Very professional and the predictions are quite accurate. Thank you!',
    date: '8 hours ago',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces'
  },
  {
    id: 5,
    username: 'Chidinma Nwosu',
    rating: 5,
    comment: 'Excellent service! The bot predictions have been very helpful. The UI is beautiful too.',
    date: '12 hours ago',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=faces'
  },
  {
    id: 6,
    username: 'Ibrahim Yusuf',
    rating: 4,
    comment: 'Great platform for learning aviator patterns. The analysis page is very detailed.',
    date: '1 day ago',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces'
  },
  {
    id: 7,
    username: 'Ngozi Eze',
    rating: 5,
    comment: 'This is the best aviator analysis tool! Very accurate predictions and easy to understand.',
    date: '1 day ago',
    avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&h=100&fit=crop&crop=faces'
  },
  {
    id: 8,
    username: 'Abdullahi Musa',
    rating: 5,
    comment: 'Amazing work! The confidence percentages help me make better decisions. Highly recommended!',
    date: '2 days ago',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=faces'
  },
  {
    id: 9,
    username: 'Blessing Okoro',
    rating: 4,
    comment: 'Very good platform. The recent analysis feature is my favorite. Keep improving!',
    date: '2 days ago',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop&crop=faces'
  },
  {
    id: 10,
    username: 'Usman Aliyu',
    rating: 5,
    comment: 'Excellent predictions! This platform has helped me understand aviator game mechanics better.',
    date: '3 days ago',
    avatar: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=100&h=100&fit=crop&crop=faces'
  },
  {
    id: 11,
    username: 'Chiamaka Obi',
    rating: 5,
    comment: 'Love the glassmorphism design! Very modern and the predictions are accurate. Great job!',
    date: '3 days ago',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces'
  },
  {
    id: 12,
    username: 'Musa Abdullahi',
    rating: 4,
    comment: 'Good platform with helpful analysis. The bot feature is very useful for beginners.',
    date: '4 days ago',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&h=100&fit=crop&crop=faces'
  },
  {
    id: 13,
    username: 'Adeola Williams',
    rating: 5,
    comment: 'This is fantastic! The predictions have been very helpful. Thank you for this amazing tool!',
    date: '4 days ago',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces'
  },
  {
    id: 14,
    username: 'Zainab Hassan',
    rating: 5,
    comment: 'Best aviator predictor ever! Very accurate and the interface is so beautiful. Highly recommend!',
    date: '5 days ago',
    avatar: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=100&h=100&fit=crop&crop=faces'
  },
  {
    id: 15,
    username: 'Emeka Okonkwo',
    rating: 4,
    comment: 'Great analysis tool. The confidence percentages are quite accurate. Keep up the good work!',
    date: '5 days ago',
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&h=100&fit=crop&crop=faces'
  }
])

const sortedReviews = computed(() => {
  const sorted = [...reviews.value]
  if (sortBy.value === 'highest') {
    return sorted.sort((a, b) => b.rating - a.rating)
  } else if (sortBy.value === 'lowest') {
    return sorted.sort((a, b) => a.rating - b.rating)
  }
  return sorted
})
</script>