# 📱 AVIATOR AI - FLUTTER MOBILE APP PROMPT

## 🎯 PROJECT OVERVIEW

Build a **native mobile app** for Aviator AI platform using **Flutter**. This app mirrors the web platform functionality with mobile-optimized UI/UX, offline capabilities, and native features like push notifications.

---

## 📋 TECH STACK

- **Framework**: Flutter (Dart)
- **Backend**: Firebase (Firestore, Authentication, Cloud Messaging)
- **State Management**: Provider or Riverpod
- **Local Storage**: Shared Preferences / Hive
- **Animations**: Flutter Animations / Lottie
- **Charts**: fl_chart
- **Icons**: Flutter Icons / Custom Icons
- **Payment**: Dodo Payments API integration
- **Platform**: Android & iOS

---

## 🎨 DESIGN SYSTEM

### Color Palette
```dart
// Primary Colors
const primaryBlue = Color(0xFF3B82F6);
const accentGreen = Color(0xFF10B981);
const redAviator = Color(0xFFEF4444);
const darkBackground = Color(0xFF0B0F1A);

// Gradients
const primaryGradient = LinearGradient(
  colors: [Color(0xFF3B82F6), Color(0xFF10B981)],
);
const aviatorGradient = LinearGradient(
  colors: [Color(0xFFEF4444), Color(0xFFF97316)],
);
```

### Typography
- **Headings**: Poppins Bold
- **Body**: Inter Regular
- **Numbers**: Roboto Mono

### Theme
- Dark mode by default
- Glassmorphism effects
- Smooth animations
- Native feel

---

## 📱 APP STRUCTURE

### Navigation
**Bottom Navigation Bar** (Main App)
1. Home
2. Bot
3. Analysis
4. Profile

**Drawer Menu** (Secondary)
- Settings
- Subscription
- Help & Support
- About
- Logout

---

## 🔐 AUTHENTICATION FLOW

### Splash Screen
- App logo with animation
- Check authentication status
- Navigate to Onboarding or Home

### Onboarding (First Launch)
- 3 screens:
  1. "AI-Powered Predictions"
  2. "Real-Time Analysis"
  3. "Upgrade for Premium"
- Skip button
- Get Started button

### Sign Up Screen
```dart
Fields:
- First Name
- Last Name
- Email
- Phone (with country code picker)
- Password
- Confirm Password
- Country dropdown
- Experience level (Beginner/Intermediate/Pro)
- Terms & Conditions checkbox

Validation:
- Email format
- Password strength (min 8 chars)
- Phone number format
- All fields required

Actions:
- Sign Up button → Create account → Navigate to Dashboard
- Already have account? → Navigate to Login
```

### Login Screen
```dart
Fields:
- Email
- Password

Actions:
- Login button → Authenticate → Navigate to Dashboard
- Forgot Password? → Reset password flow
- Don't have account? → Navigate to Sign Up

Features:
- Remember me checkbox
- Biometric login (fingerprint/face ID)
```

### Password Reset
- Enter email
- Send reset link
- Confirmation message

---

## 🏠 HOME SCREEN (DASHBOARD)

### Header
- Welcome message: "Welcome back, {Name} 👋"
- Profile avatar (top right)
- Notification bell icon

### Stats Cards (Horizontal Scroll)
```dart
1. Account Status
   - Icon: CheckCircle
   - Status: Active
   - Member since: Jan 2026

2. Current Plan
   - Icon: Crown
   - Plan: Free / VIP
   - Upgrade button (if Free)

3. Bot Access
   - Icon: Robot
   - Status: Locked / Unlocked
   - Accuracy: 20% / 85%
```

### Quick Actions Grid
```dart
- Activate Bot
- View Analysis
- Upgrade Plan
- Recent Predictions
```

### Recent Activity Feed
- Last 5 predictions
- Swipe to refresh

### Bottom Sheet Actions
- Share app
- Rate app
- Invite friends

---

## 🤖 BOT SCREEN

### Platform Selection (First Time)
**Modal Bottom Sheet**
```dart
Title: "Choose Your Platform"
Description: "Select where you play Aviator"

Cards:
1. Sporty
   - Logo image
   - Description
   - Select button

2. Msport
   - Logo image
   - Description
   - Select button

Save selection to local storage
```

### Free Bot (Always Available)
```dart
Header:
- Title: "Free Bot Predictor"
- Subtitle: "20% Accuracy"
- Status: Active (green dot)

Prediction Display:
- Large multiplier: "2.45x"
- Confidence badge: "Low/Medium/High"
- Accuracy meter (20%)

Animation:
- Plane icon (red)
- Floating animation
- Glow effect

Controls:
- "Analyze Next Round" button
- Loading state during analysis
- Result animation

Features:
- Haptic feedback on button press
- Sound effects (optional toggle)
- Vibration on result
```

### Premium Bot (Locked for Free Users)
```dart
Display:
- Blurred preview
- Lock icon overlay
- "85% Accuracy" badge
- "Unlock Premium" button

Unlock Modal:
- Feature comparison
- Pricing plans
- Upgrade button → Payment flow
```

### Prediction Animation
```dart
States:
1. Idle
   - Plane at bottom left
   - Pulsing glow
   - "Ready" text

2. Analyzing
   - Plane flies diagonally
   - Trail effect
   - Multiplier counting up (1.00x → final)
   - "Analyzing..." text
   - Progress indicator

3. Result
   - Plane stops
   - Multiplier locks
   - Confidence badge appears
   - Confetti animation (if high multiplier)
   - Result card slides up

Duration: 3-5 seconds
```

### Prediction History
- List of last 10 predictions
- Pull to refresh
- Swipe to delete
- Filter by platform
- Export to CSV

---

## 📊 ANALYSIS SCREEN

### Real-Time Chart
```dart
Chart Type: Line Chart (fl_chart)
Data:
- X-axis: Time
- Y-axis: Multiplier
- Live updates every 5 seconds

Features:
- Zoom in/out
- Pan left/right
- Tap to see details
- Toggle between 1H, 24H, 7D, 30D
```

### Statistics Cards
```dart
- Average Multiplier
- Highest Today
- Success Rate
- Total Predictions
```

### Pattern Analysis
- Most common multipliers
- Hot/Cold numbers
- Trend indicators
- AI insights

### Filters
- Date range picker
- Platform filter (Sporty/Msport)
- Confidence level filter

---

## 👤 PROFILE SCREEN

### User Info Card
```dart
- Profile photo (editable)
- Name
- Email
- Phone
- Member since
- Edit button
```

### Subscription Card
```dart
- Current plan badge
- Expiry date (if VIP)
- Upgrade button
- Manage subscription
```

### Settings List
```dart
- Account Settings
  - Edit profile
  - Change password
  - Delete account

- App Settings
  - Notifications
  - Sound effects
  - Haptic feedback
  - Theme (Dark/Light)
  - Language

- Preferences
  - Default platform
  - Auto-refresh
  - Prediction alerts

- Support
  - Help center
  - Contact us
  - Report bug
  - FAQ

- About
  - App version
  - Terms of service
  - Privacy policy
  - Rate app
  - Share app

- Logout
```

---

## 💳 SUBSCRIPTION & PAYMENT

### Plans Screen
```dart
Title: "Choose Your Plan"

Plans (Cards):
1. Daily Plan
   - Price: ₦5,000
   - Duration: 24 hours
   - Features list
   - Select button

2. Monthly Plan (Most Popular)
   - Price: ₦30,000
   - Save 40% badge
   - Duration: 30 days
   - Features list
   - Select button

3. Quarterly Plan
   - Price: ₦90,000
   - Save 50% badge
   - Duration: 90 days
   - Features list
   - Select button

Features:
- Swipe between plans
- Comparison table
- Money-back guarantee badge
```

### Payment Flow
```dart
1. Select plan
2. Review order
3. Choose payment method
   - Dodo Payments
   - Card
   - Bank transfer
4. Enter payment details
5. Process payment
6. Show success/failure
7. Update user plan in Firebase
8. Navigate to dashboard
```

### Payment Integration
```dart
// Dodo Payments API
- Create payment link
- Handle callback
- Verify payment
- Update Firestore

// Security
- API key in environment variables
- Backend Cloud Functions
- Payment verification
```

---

## 🔔 PUSH NOTIFICATIONS

### Notification Types
```dart
1. Prediction Ready
   - "New prediction available!"
   - Tap to view

2. High Confidence Alert
   - "High confidence prediction: 3.5x"
   - Tap to see details

3. Subscription Expiring
   - "Your VIP plan expires in 3 days"
   - Tap to renew

4. New Features
   - "Check out our new analysis tools!"
   - Tap to explore

5. Daily Reminder
   - "Don't miss today's predictions"
   - Tap to open app
```

### Implementation
```dart
// Firebase Cloud Messaging
- Request permission
- Get FCM token
- Store token in Firestore
- Handle foreground/background notifications
- Custom notification sound
- Notification actions
```

---

## 🎨 UI COMPONENTS

### Custom Widgets
```dart
1. GlassCard
   - Frosted glass effect
   - Border glow
   - Shadow

2. GradientButton
   - Primary/Accent gradients
   - Loading state
   - Disabled state
   - Haptic feedback

3. StatCard
   - Icon
   - Title
   - Value
   - Trend indicator

4. PredictionCard
   - Multiplier
   - Confidence badge
   - Time
   - Platform icon

5. PlaneAnimation
   - Idle state
   - Flying animation
   - Trail effect
   - Glow effect

6. MultiplierDisplay
   - Large number
   - Animated counting
   - Color transitions

7. ConfidenceMeter
   - Progress bar
   - Color gradient
   - Percentage label

8. PlatformSelector
   - Image card
   - Selection state
   - Ripple effect
```

---

## 🔥 FIREBASE STRUCTURE

### Collections

**users**
```dart
{
  uid: String,
  email: String,
  firstName: String,
  lastName: String,
  phone: String,
  country: String,
  plan: String, // 'free', 'vip', 'bot'
  hasBotAccess: bool,
  selectedPlatform: String, // 'sporty', 'msport'
  createdAt: Timestamp,
  expiryDate: Timestamp?,
  fcmToken: String,
  settings: {
    notifications: bool,
    soundEffects: bool,
    hapticFeedback: bool,
    theme: String,
  }
}
```

**predictions**
```dart
{
  id: String,
  userId: String,
  multiplier: double,
  confidence: String, // 'low', 'medium', 'high'
  platform: String,
  botType: String, // 'free', 'premium'
  timestamp: Timestamp,
  result: String?, // 'success', 'failed'
}
```

**subscriptions**
```dart
{
  id: String,
  userId: String,
  plan: String, // 'daily', 'monthly', 'quarterly'
  amount: int,
  currency: String,
  startDate: Timestamp,
  expiryDate: Timestamp,
  status: String, // 'active', 'expired', 'cancelled'
  paymentId: String,
  autoRenew: bool,
}
```

---

## 📦 PACKAGES REQUIRED

```yaml
dependencies:
  flutter:
    sdk: flutter
  
  # Firebase
  firebase_core: ^latest
  firebase_auth: ^latest
  cloud_firestore: ^latest
  firebase_messaging: ^latest
  firebase_analytics: ^latest
  
  # State Management
  provider: ^latest
  # OR
  riverpod: ^latest
  
  # UI
  flutter_svg: ^latest
  cached_network_image: ^latest
  shimmer: ^latest
  lottie: ^latest
  
  # Charts
  fl_chart: ^latest
  
  # Storage
  shared_preferences: ^latest
  hive: ^latest
  hive_flutter: ^latest
  
  # HTTP
  http: ^latest
  dio: ^latest
  
  # Utils
  intl: ^latest
  url_launcher: ^latest
  share_plus: ^latest
  package_info_plus: ^latest
  
  # Animations
  animations: ^latest
  flutter_animate: ^latest
  
  # Forms
  flutter_form_builder: ^latest
  
  # Country Picker
  country_code_picker: ^latest
  
  # Biometrics
  local_auth: ^latest
  
  # Permissions
  permission_handler: ^latest
  
  # Notifications
  flutter_local_notifications: ^latest
  
  # Haptics
  vibration: ^latest
  
  # Icons
  flutter_launcher_icons: ^latest
```

---

## 🎬 ANIMATIONS

### Page Transitions
```dart
- Fade in/out
- Slide left/right
- Scale up/down
- Custom hero animations
```

### Micro-interactions
```dart
- Button press (scale down)
- Card tap (ripple effect)
- Swipe gestures
- Pull to refresh
- Haptic feedback
- Loading spinners
- Skeleton loaders
```

### Plane Animation
```dart
// Using AnimationController
1. Idle: Floating up/down (2s loop)
2. Flying: Move from bottom-left to top-right (3s)
3. Trail: Fade out gradient (1s)
4. Glow: Pulsing opacity (1.5s loop)
```

---

## 🔒 SECURITY

### Authentication
```dart
- Firebase Auth
- Email verification
- Password strength validation
- Biometric authentication
- Session management
- Auto logout after inactivity
```

### Data Protection
```dart
- Encrypt sensitive data
- Secure storage (Hive encrypted)
- API key in environment variables
- Certificate pinning
- ProGuard (Android)
- Code obfuscation
```

### Permissions
```dart
Required:
- Internet
- Notifications

Optional:
- Camera (profile photo)
- Storage (export data)
- Biometrics (fingerprint/face)
```

---

## 📱 PLATFORM-SPECIFIC FEATURES

### Android
```dart
- Material Design 3
- Adaptive icons
- Splash screen (Android 12+)
- App shortcuts
- Widgets (home screen)
```

### iOS
```dart
- Cupertino widgets
- SF Symbols
- Face ID / Touch ID
- App Clips
- Widgets (iOS 14+)
```

---

## 🚀 APP FLOW

### First Launch
```
Splash Screen
  ↓
Onboarding (3 screens)
  ↓
Sign Up / Login
  ↓
Dashboard
```

### Returning User (Logged In)
```
Splash Screen
  ↓
Dashboard
```

### Bot Usage Flow
```
Dashboard
  ↓
Tap "Activate Bot"
  ↓
Platform Selection Modal (first time)
  ↓
Bot Screen
  ↓
Tap "Analyze"
  ↓
Animation (3-5s)
  ↓
Result Display
  ↓
Save to History
```

### Upgrade Flow
```
Dashboard / Bot Screen
  ↓
Tap "Upgrade"
  ↓
Plans Screen
  ↓
Select Plan
  ↓
Payment Screen
  ↓
Process Payment
  ↓
Success Screen
  ↓
Dashboard (Updated Plan)
```

---

## 🧪 TESTING

### Unit Tests
```dart
- Authentication logic
- Prediction generation
- Payment processing
- Data models
```

### Widget Tests
```dart
- UI components
- Forms validation
- Navigation
- State changes
```

### Integration Tests
```dart
- Complete user flows
- Firebase integration
- Payment flow
- Notification handling
```

---

## 📊 ANALYTICS

### Track Events
```dart
- App opened
- User signed up
- User logged in
- Bot activated
- Prediction generated
- Plan upgraded
- Payment completed
- Screen views
- Button clicks
- Errors
```

### Firebase Analytics
```dart
- User demographics
- Retention rate
- Session duration
- Popular features
- Conversion funnel
```

---

## 🎯 FEATURES CHECKLIST

### Phase 1 (MVP)
- [ ] Authentication (Sign up, Login, Logout)
- [ ] Dashboard with stats
- [ ] Free Bot (20% accuracy)
- [ ] Platform selection (Sporty/Msport)
- [ ] Prediction animation
- [ ] Prediction history
- [ ] Profile screen
- [ ] Basic settings

### Phase 2
- [ ] Premium Bot (85% accuracy)
- [ ] Subscription plans
- [ ] Payment integration
- [ ] Push notifications
- [ ] Analysis screen with charts
- [ ] Biometric login
- [ ] Dark/Light theme toggle

### Phase 3
- [ ] Offline mode
- [ ] Export predictions
- [ ] Share predictions
- [ ] Referral system
- [ ] In-app chat support
- [ ] App widgets
- [ ] Advanced analytics

---

## 📝 SCREENS LIST

### Authentication
1. Splash Screen
2. Onboarding (3 screens)
3. Sign Up Screen
4. Login Screen
5. Forgot Password Screen

### Main App
6. Dashboard (Home)
7. Bot Screen
8. Analysis Screen
9. Profile Screen

### Secondary
10. Platform Selection Modal
11. Plans Screen
12. Payment Screen
13. Payment Success Screen
14. Settings Screen
15. Edit Profile Screen
16. Change Password Screen
17. Notification Settings Screen
18. Help & Support Screen
19. About Screen
20. Terms & Conditions Screen
21. Privacy Policy Screen

---

## 🎨 DESIGN ASSETS NEEDED

### Images
- App logo (1024x1024)
- App icon (Android & iOS)
- Splash screen background
- Onboarding illustrations (3)
- Sporty logo
- Msport logo
- Plane icon/image
- Empty state illustrations

### Icons
- Custom tab bar icons
- Feature icons
- Status icons
- Platform icons

### Animations
- Lottie animations (optional)
- Loading animations
- Success/Error animations

---

## 🚀 DEPLOYMENT

### Android
```dart
1. Generate keystore
2. Configure build.gradle
3. Build APK/AAB
4. Test on devices
5. Upload to Play Console
6. Fill store listing
7. Submit for review
```

### iOS
```dart
1. Configure Xcode project
2. Set up certificates
3. Build IPA
4. Test on devices
5. Upload to App Store Connect
6. Fill store listing
7. Submit for review
```

### Store Listing
```dart
Title: Aviator AI - Prediction Bot

Description:
"Aviator AI is your intelligent companion for Aviator game analysis. 
Get AI-powered predictions with up to 85% accuracy, real-time analysis, 
and smart insights to enhance your gaming experience.

Features:
✈️ Free Bot with 20% accuracy
🤖 Premium Bot with 85% accuracy
📊 Real-time analysis and charts
🎯 Platform support (Sporty & Msport)
📈 Prediction history and trends
🔔 Smart notifications
💎 Flexible subscription plans

Download now and experience the power of AI!"

Keywords:
- Aviator
- AI prediction
- Game analysis
- Betting assistant
- Multiplier predictor

Screenshots: 8-10 screenshots
Video: 30-second demo video
```

---

## ⚠️ IMPORTANT DISCLAIMERS

### In-App Disclaimer
```dart
Display on:
- First launch
- Bot screen
- Before each prediction

Text:
"⚠️ Important Notice

This app provides AI-based analysis for educational purposes only. 
Predictions are not guaranteed and should not be used as the sole 
basis for gambling decisions.

Free Bot: 20% accuracy
Premium Bot: 85% accuracy

Always gamble responsibly. Only bet what you can afford to lose."

Buttons:
- I Understand
- Learn More
```

### Store Disclaimer
```
This app is for entertainment and educational purposes only. 
It does not guarantee winnings or profits. Users must be 18+ 
and comply with local gambling laws.
```

---

## 💡 ADDITIONAL FEATURES (OPTIONAL)

### Social Features
- Share predictions with friends
- Leaderboard
- Community chat
- User reviews

### Gamification
- Achievement badges
- Daily streaks
- Reward points
- Referral bonuses

### Advanced AI
- Machine learning models
- Pattern recognition
- Personalized predictions
- Historical data analysis

### Premium Features
- Multiple platform support
- Custom alerts
- Priority support
- Ad-free experience
- Advanced statistics

---

## 🎯 SUCCESS METRICS

### KPIs
- Daily Active Users (DAU)
- Monthly Active Users (MAU)
- Retention rate (D1, D7, D30)
- Conversion rate (Free → VIP)
- Average session duration
- Prediction accuracy feedback
- App store rating
- Revenue per user

---

## 📞 SUPPORT & MAINTENANCE

### User Support
- In-app chat
- Email support
- FAQ section
- Video tutorials
- Knowledge base

### App Updates
- Bug fixes
- Performance improvements
- New features
- UI/UX enhancements
- Security patches

### Monitoring
- Crash reporting (Firebase Crashlytics)
- Performance monitoring
- User feedback
- Analytics dashboard

---

## ✅ FINAL CHECKLIST

- [ ] Flutter project created
- [ ] Firebase configured
- [ ] All screens implemented
- [ ] Authentication working
- [ ] Bot animation smooth
- [ ] Payment integration tested
- [ ] Push notifications working
- [ ] App tested on Android
- [ ] App tested on iOS
- [ ] Store assets prepared
- [ ] Privacy policy added
- [ ] Terms of service added
- [ ] App submitted to stores

---

**This comprehensive prompt provides everything needed to build a production-ready Aviator AI mobile app with Flutter!** 🚀📱

**Estimated Development Time:** 6-8 weeks for MVP
**Team Size:** 2-3 Flutter developers + 1 UI/UX designer
