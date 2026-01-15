# 🎯 SUPER ADMIN DASHBOARD - PROJECT PROMPT

## 📋 PROJECT OVERVIEW

Build a **Super Admin Dashboard** for Aviator AI platform using **Vue 3 + TypeScript + Firebase**. This is a separate admin panel to manage users, monitor bot performance, control predictions, and manage subscriptions.

---

## 🎨 TECH STACK

- **Framework**: Vue 3 + TypeScript
- **Styling**: Tailwind CSS + Glassmorphism
- **Backend**: Firebase (Firestore + Authentication)
- **Charts**: Chart.js / Vue-Chartjs
- **Icons**: Lucide Vue Next
- **State Management**: Pinia
- **Router**: Vue Router

---

## 🔐 AUTHENTICATION

### Admin Login
- Separate admin login page (`/admin/login`)
- Email + Password authentication
- Only specific admin emails can access
- Store admin emails in Firebase config or environment variables
- Redirect to `/admin/dashboard` after login
- Session management with Firebase Auth

### Admin Roles
```typescript
{
  email: "admin@aviatorai.com",
  role: "super_admin",
  permissions: ["all"]
}
```

---

## 📊 DASHBOARD STRUCTURE

### Sidebar Navigation (Desktop)
- Dashboard Overview
- User Management
- Bot Control
- Predictions Manager
- Subscriptions
- Analytics
- Settings
- Logout

### Top Bar
- Admin name + avatar
- Notifications bell
- Quick stats
- Logout dropdown

---

## 🧩 DASHBOARD PAGES

### 1️⃣ OVERVIEW / HOME
**Route**: `/admin/dashboard`

**Display:**
- Total Users (count)
- Active Subscriptions (count)
- Free Users vs VIP Users (chart)
- Revenue This Month (₦)
- Bot Accuracy Stats (Free: 20%, Premium: 85%)
- Recent Activity Feed
- Quick Actions (Add User, Send Notification, etc.)

**Charts:**
- Line chart: User growth over time
- Pie chart: Free vs VIP distribution
- Bar chart: Revenue by plan (Daily, Monthly, Quarterly)

---

### 2️⃣ USER MANAGEMENT
**Route**: `/admin/users`

**Features:**
- **User Table** with columns:
  - Avatar
  - Name
  - Email
  - Plan (Free/VIP/Bot)
  - Status (Active/Inactive)
  - Join Date
  - Expiry Date (if VIP)
  - Actions (View, Edit, Delete, Upgrade)

- **Search & Filter:**
  - Search by name/email
  - Filter by plan (All, Free, VIP, Bot)
  - Filter by status (Active, Inactive, Expired)
  - Sort by date, name, plan

- **Actions:**
  - View user details (modal)
  - Edit user info
  - Upgrade/Downgrade plan
  - Extend subscription
  - Ban/Unban user
  - Delete user (with confirmation)
  - Send email notification

- **Bulk Actions:**
  - Select multiple users
  - Bulk upgrade
  - Bulk email
  - Export to CSV

---

### 3️⃣ BOT CONTROL PANEL
**Route**: `/admin/bot-control`

**Features:**

**Free Bot Settings:**
- Enable/Disable Free Bot globally
- Set accuracy percentage (default: 20%)
- Set prediction range (min/max multiplier)
- Update frequency (seconds)
- Toggle features on/off

**Premium Bot Settings:**
- Enable/Disable Premium Bot
- Set accuracy percentage (default: 85%)
- Set prediction range (min/max multiplier)
- Advanced algorithm settings
- Risk level controls

**Live Bot Status:**
- Current predictions being generated
- Active users using bot
- Success rate monitoring
- Error logs

**Manual Override:**
- Manually set next prediction
- Pause bot temporarily
- Emergency stop button

---

### 4️⃣ PREDICTIONS MANAGER
**Route**: `/admin/predictions`

**Features:**

**Prediction History:**
- Table showing all predictions
- Columns: Time, Multiplier, Accuracy, Bot Type, Result, Users Affected
- Filter by date range
- Filter by bot type (Free/Premium)
- Export to CSV

**Create Manual Prediction:**
- Set multiplier value
- Set confidence level
- Choose bot type (Free/Premium)
- Set expiry time
- Publish to users

**Prediction Analytics:**
- Success rate over time
- Most accurate predictions
- Failed predictions analysis
- User feedback on predictions

---

### 5️⃣ SUBSCRIPTION MANAGEMENT
**Route**: `/admin/subscriptions`

**Features:**

**Active Subscriptions Table:**
- User name
- Plan type (Daily, Monthly, Quarterly)
- Amount paid (₦)
- Start date
- Expiry date
- Status (Active, Expiring Soon, Expired)
- Auto-renewal status
- Actions (Extend, Cancel, Refund)

**Subscription Stats:**
- Total active subscriptions
- Revenue this month
- Expiring this week
- Churn rate
- Average subscription value

**Plan Management:**
- Edit plan prices
- Create new plans
- Disable/Enable plans
- Set discount codes
- Promo campaigns

**Payment History:**
- All transactions
- Payment method
- Status (Success, Failed, Pending)
- Refund requests

---

### 6️⃣ ANALYTICS & REPORTS
**Route**: `/admin/analytics`

**Features:**

**User Analytics:**
- Daily active users (DAU)
- Monthly active users (MAU)
- User retention rate
- Churn rate
- User growth chart

**Revenue Analytics:**
- Total revenue
- Revenue by plan
- Revenue trends (daily, weekly, monthly)
- Average revenue per user (ARPU)
- Lifetime value (LTV)

**Bot Performance:**
- Prediction accuracy over time
- User satisfaction ratings
- Bot usage statistics
- Error rate

**Engagement Metrics:**
- Average session duration
- Features most used
- User feedback scores
- Support tickets

**Export Reports:**
- Generate PDF reports
- Export to Excel
- Schedule automated reports
- Email reports to stakeholders

---

### 7️⃣ SETTINGS
**Route**: `/admin/settings`

**Sections:**

**General Settings:**
- Site name
- Admin email
- Support email
- Maintenance mode toggle

**Bot Configuration:**
- Free bot accuracy (%)
- Premium bot accuracy (%)
- Prediction update interval
- Max predictions per user

**Payment Settings:**
- Dodo Payments API key
- Payment gateway settings
- Currency settings
- Tax configuration

**Email Settings:**
- SMTP configuration
- Email templates
- Notification preferences
- Automated emails

**Security:**
- Change admin password
- Two-factor authentication
- IP whitelist
- Session timeout

**Backup & Restore:**
- Database backup
- Restore from backup
- Export all data
- Import data

---

## 🎨 UI/UX REQUIREMENTS

### Design Theme
- **Dark Mode**: Primary background #0B0F1A
- **Glassmorphism**: Frosted glass cards
- **Color Scheme**:
  - Primary: #3B82F6 (Blue)
  - Accent: #10B981 (Green)
  - Warning: #F59E0B (Orange)
  - Danger: #EF4444 (Red)
  - Success: #10B981 (Green)

### Components
- Modern sidebar with icons
- Responsive design (mobile, tablet, desktop)
- Loading states
- Empty states
- Error states
- Toast notifications
- Confirmation modals
- Data tables with pagination
- Search bars
- Dropdown menus
- Date pickers
- Charts and graphs

### Animations
- Smooth transitions
- Hover effects
- Loading spinners
- Skeleton loaders
- Fade in/out
- Slide animations

---

## 🔥 FIREBASE STRUCTURE

### Collections

**users** (from main app)
```typescript
{
  uid: string
  email: string
  firstName: string
  lastName: string
  plan: 'free' | 'vip' | 'bot'
  hasBotAccess: boolean
  createdAt: timestamp
  expiryDate: timestamp | null
  status: 'active' | 'inactive' | 'banned'
}
```

**admins**
```typescript
{
  uid: string
  email: string
  role: 'super_admin' | 'admin'
  permissions: string[]
  createdAt: timestamp
}
```

**predictions**
```typescript
{
  id: string
  multiplier: number
  botType: 'free' | 'premium'
  accuracy: number
  timestamp: timestamp
  result: 'success' | 'failed'
  usersAffected: number
}
```

**subscriptions**
```typescript
{
  id: string
  userId: string
  plan: 'daily' | 'monthly' | 'quarterly'
  amount: number
  currency: 'NGN'
  startDate: timestamp
  expiryDate: timestamp
  status: 'active' | 'expired' | 'cancelled'
  autoRenew: boolean
  paymentId: string
}
```

**analytics**
```typescript
{
  date: string
  dau: number
  mau: number
  revenue: number
  newUsers: number
  churnedUsers: number
}
```

---

## 🚀 ROUTES

```typescript
/admin/login              // Admin login page
/admin/dashboard          // Overview
/admin/users              // User management
/admin/bot-control        // Bot settings
/admin/predictions        // Predictions manager
/admin/subscriptions      // Subscription management
/admin/analytics          // Analytics & reports
/admin/settings           // Settings
```

---

## 🔐 SECURITY REQUIREMENTS

1. **Authentication:**
   - Only whitelisted admin emails can login
   - Session timeout after 30 minutes of inactivity
   - Logout on browser close

2. **Authorization:**
   - Check admin role before accessing any admin route
   - Redirect to login if not authenticated
   - Show 403 error if insufficient permissions

3. **Data Protection:**
   - Never expose user passwords
   - Encrypt sensitive data
   - Audit logs for all admin actions
   - Rate limiting on API calls

4. **Firebase Rules:**
   - Only admins can read/write admin collections
   - Users can only read their own data
   - Validate all writes on server side

---

## 📱 RESPONSIVE DESIGN

- **Desktop** (1024px+): Full sidebar + content
- **Tablet** (768px - 1023px): Collapsible sidebar
- **Mobile** (< 768px): Bottom navigation + hamburger menu

---

## ✅ FEATURES CHECKLIST

### Phase 1 (MVP)
- [ ] Admin authentication
- [ ] Dashboard overview
- [ ] User management (view, edit, delete)
- [ ] Basic bot control
- [ ] Subscription list

### Phase 2
- [ ] Advanced analytics
- [ ] Prediction manager
- [ ] Bulk actions
- [ ] Email notifications
- [ ] Export reports

### Phase 3
- [ ] Real-time updates
- [ ] Advanced bot settings
- [ ] Automated reports
- [ ] Two-factor authentication
- [ ] Audit logs

---

## 🎯 SUCCESS CRITERIA

1. Admin can login securely
2. Admin can view all users and their plans
3. Admin can upgrade/downgrade user plans
4. Admin can control bot settings (accuracy, predictions)
5. Admin can view revenue and analytics
6. Admin can manage subscriptions
7. All actions are logged
8. UI is responsive and fast
9. Data is secure and protected
10. Real-time updates work correctly

---

## 📝 NOTES

- This is a **separate Vue project** from the main Aviator AI app
- Use the **same Firebase project** but different routes
- Admin dashboard should be at `/admin/*` routes
- Keep admin credentials secure (environment variables)
- Test thoroughly before production
- Add loading states for all async operations
- Handle errors gracefully
- Add confirmation dialogs for destructive actions

---

## 🚀 GETTING STARTED

1. Create new Vue 3 project with TypeScript
2. Install dependencies (Tailwind, Firebase, Chart.js, etc.)
3. Set up Firebase config
4. Create admin authentication
5. Build dashboard layout
6. Implement each page one by one
7. Test with real data
8. Deploy to production

---

## 💡 ADDITIONAL FEATURES (Optional)

- Push notifications to users
- SMS notifications
- WhatsApp integration
- Live chat support
- AI-powered insights
- Predictive analytics
- A/B testing dashboard
- User behavior tracking
- Heatmaps
- Session recordings

---

**This prompt provides everything needed to build a complete Super Admin Dashboard for Aviator AI!** 🎉
