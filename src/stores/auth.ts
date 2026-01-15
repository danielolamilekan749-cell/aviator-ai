import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/firebase/config'

export interface UserProfile {
  uid: string
  email: string
  firstName: string
  lastName: string
  plan: 'free' | 'vip' | 'bot'
  hasBotAccess: boolean
  createdAt: string
  expiryDate?: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const userProfile = ref<UserProfile | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value)
  const isVIP = computed(() => userProfile.value?.plan === 'vip' || userProfile.value?.plan === 'bot')
  const hasBotAccess = computed(() => userProfile.value?.hasBotAccess === true)

  // Initialize auth state listener
  const initAuth = () => {
    loading.value = true
    onAuthStateChanged(auth, async (firebaseUser) => {
      user.value = firebaseUser
      if (firebaseUser) {
        await loadUserProfile(firebaseUser.uid)
      } else {
        userProfile.value = null
      }
      loading.value = false
    })
  }

  // Load user profile from Firestore
  const loadUserProfile = async (uid: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid))
      if (userDoc.exists()) {
        userProfile.value = userDoc.data() as UserProfile
      }
    } catch (err) {
      console.error('Error loading user profile:', err)
    }
  }

  // Sign up new user
  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      error.value = null
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
      // Create user profile in Firestore
      const profile: UserProfile = {
        uid: userCredential.user.uid,
        email: email,
        firstName: firstName,
        lastName: lastName,
        plan: 'free',
        hasBotAccess: false,
        createdAt: new Date().toISOString()
      }
      
      await setDoc(doc(db, 'users', userCredential.user.uid), profile)
      userProfile.value = profile
      
      return { success: true }
    } catch (err: any) {
      error.value = err.message
      return { success: false, error: err.message }
    }
  }

  // Sign in existing user
  const signIn = async (email: string, password: string) => {
    try {
      error.value = null
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      await loadUserProfile(userCredential.user.uid)
      return { success: true }
    } catch (err: any) {
      error.value = err.message
      return { success: false, error: err.message }
    }
  }

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth)
      user.value = null
      userProfile.value = null
      return { success: true }
    } catch (err: any) {
      error.value = err.message
      return { success: false, error: err.message }
    }
  }

  // Update user plan
  const updatePlan = async (plan: 'free' | 'vip' | 'bot', hasBotAccess: boolean, expiryDate?: string) => {
    if (!user.value) return
    
    try {
      const updates: Partial<UserProfile> = {
        plan,
        hasBotAccess,
        expiryDate
      }
      
      await setDoc(doc(db, 'users', user.value.uid), updates, { merge: true })
      
      if (userProfile.value) {
        userProfile.value = { ...userProfile.value, ...updates }
      }
      
      return { success: true }
    } catch (err: any) {
      error.value = err.message
      return { success: false, error: err.message }
    }
  }

  return {
    user,
    userProfile,
    loading,
    error,
    isAuthenticated,
    isVIP,
    hasBotAccess,
    initAuth,
    signUp,
    signIn,
    logout,
    updatePlan
  }
})
