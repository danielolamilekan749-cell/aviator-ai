# 🚀 Firebase Quick Start - 5 Commands

## Copy and paste these commands one by one:

### 1. Login to Firebase
```bash
firebase login
```

### 2. Link Your Project
```bash
cd my-vue-app
firebase use --add
```
Select your project, enter alias: `default`

### 3. Deploy Functions
```bash
firebase deploy --only functions
```

### 4. Copy the Function URL
After deployment, you'll see:
```
Function URL (createPayment): https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/createPayment
```
**Copy this URL!**

### 5. Update .env File
Open `my-vue-app/.env` and add:
```env
VITE_FIREBASE_FUNCTION_URL=https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/createPayment
```
Replace `YOUR-PROJECT-ID` with your actual project ID.

### 6. Update Frontend Code
Open `my-vue-app/src/views/ChoosePlanView.vue`

Change line 5 from:
```typescript
import { useDodoPayments } from '@/composables/useDodoPayments'
```

To:
```typescript
import { useDodoPaymentsFirebase as useDodoPayments } from '@/composables/useDodoPaymentsFirebase'
```

### 7. Restart Frontend
```bash
# Stop current server (Ctrl+C)
npm run dev
```

### 8. Test
Open: http://localhost:5173/aviator-ai/
- Click "Get Started Now"
- Fill form → Choose plan → Proceed to Payment
- Check browser console for logs

## ✅ Done!

Your Firebase Cloud Functions are now live and handling payments!

**Next:** Create products in Dodo dashboard and update product IDs in `ChoosePlanView.vue`

See `DEPLOY_FIREBASE.md` for detailed instructions.
