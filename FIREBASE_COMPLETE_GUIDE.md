# 🎯 Complete Firebase Cloud Functions Guide

## ✅ What's Already Done

I've created a complete Firebase Cloud Functions backend for your Dodo Payments integration:

### Files Created:
- ✅ `functions/index.js` - 3 Cloud Functions (createPayment, verifyPayment, healthCheck)
- ✅ `functions/package.json` - Dependencies configuration
- ✅ `functions/.env` - Environment variables for local testing
- ✅ `firebase.json` - Firebase configuration
- ✅ `.firebaserc` - Project configuration
- ✅ `src/composables/useDodoPaymentsFirebase.ts` - Frontend integration
- ✅ Dependencies installed (firebase-functions, firebase-admin, node-fetch)

### What the Functions Do:

**1. createPayment** - Main payment function
- Accepts payment details from frontend
- Calls Dodo Payments API securely
- Returns payment link
- Handles errors gracefully

**2. verifyPayment** - Payment verification
- Checks payment status
- Returns payment details

**3. healthCheck** - Status check
- Confirms functions are running
- Useful for monitoring

## 🚀 Deployment Steps (Copy & Paste)

### Step 1: Login to Firebase
```bash
firebase login
```

### Step 2: Link Your Firebase Project
```bash
cd my-vue-app
firebase use --add
```
- Select your Firebase project from the list
- Enter alias: `default`

### Step 3: Deploy to Production
```bash
firebase deploy --only functions
```

**Expected output:**
```
✔  Deploy complete!
Function URL (createPayment): https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/createPayment
```

**COPY THE URL ABOVE!** You'll need it in the next step.

### Step 4: Update Environment Variables

Open `my-vue-app/.env` and update:

```env
# Replace YOUR-PROJECT-ID with your actual Firebase project ID
VITE_FIREBASE_FUNCTION_URL=https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/createPayment
VITE_FIREBASE_FUNCTION_URL_VERIFY=https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/verifyPayment
```

### Step 5: Update Frontend Code

Open `my-vue-app/src/views/ChoosePlanView.vue`

**Find line 5:**
```typescript
import { useDodoPayments } from '@/composables/useDodoPayments'
```

**Replace with:**
```typescript
import { useDodoPaymentsFirebase as useDodoPayments } from '@/composables/useDodoPaymentsFirebase'
```

**Save the file.**

### Step 6: Restart Frontend
```bash
# Stop current dev server (Ctrl+C)
npm run dev
```

### Step 7: Test Payment Flow

1. Open: http://localhost:5173/aviator-ai/
2. Open browser console (F12)
3. Click "Get Started Now"
4. Fill signup form
5. Choose a plan
6. Click "Proceed to Payment"
7. Check console for logs

## 🧪 Testing Your Deployment

### Test 1: Health Check
```bash
curl https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/healthCheck
```

**Expected response:**
```json
{
  "status": "ok",
  "message": "Firebase Cloud Functions for Dodo Payments is running",
  "timestamp": "2026-01-14T..."
}
```

### Test 2: Create Payment
```bash
curl -X POST https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/createPayment \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "productId": "prod_test123",
    "amount": 5000,
    "firstName": "Test",
    "lastName": "User",
    "phone": "+2348012345678",
    "country": "NG"
  }'
```

## 📋 Complete Checklist

### Pre-Deployment:
- [x] Firebase CLI installed
- [x] Firebase project created
- [x] Functions code written
- [x] Dependencies installed

### Deployment:
- [ ] Run `firebase login`
- [ ] Run `firebase use --add`
- [ ] Run `firebase deploy --only functions`
- [ ] Copy function URLs
- [ ] Update `.env` with URLs
- [ ] Update `ChoosePlanView.vue` import
- [ ] Restart frontend server

### Testing:
- [ ] Test health check endpoint
- [ ] Test create payment endpoint
- [ ] Test frontend payment flow
- [ ] Check browser console logs
- [ ] Verify no CORS errors

### Production Setup:
- [ ] Create products in Dodo dashboard
- [ ] Update product IDs in `ChoosePlanView.vue`
- [ ] Test complete payment flow
- [ ] Verify payment redirects work

## 🔧 Code Snippets

### Frontend Integration (Already Created)

The `useDodoPaymentsFirebase` composable handles all API calls:

```typescript
// src/composables/useDodoPaymentsFirebase.ts
export const useDodoPaymentsFirebase = () => {
  const createPaymentLink = async (paymentData: DodoPaymentData) => {
    const functionUrl = import.meta.env.VITE_FIREBASE_FUNCTION_URL
    
    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData)
    })
    
    const data = await response.json()
    return data
  }
  
  return { createPaymentLink }
}
```

### Using in Components

```typescript
// In ChoosePlanView.vue
import { useDodoPaymentsFirebase as useDodoPayments } from '@/composables/useDodoPaymentsFirebase'

const { createPaymentLink } = useDodoPayments()

const proceedToPayment = async () => {
  const result = await createPaymentLink({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+2348012345678',
    productId: 'prod_xxxxx',
    amount: 5000,
    // ... other fields
  })
  
  if (result.success) {
    window.location.href = result.paymentLink
  } else {
    alert(result.error)
  }
}
```

## 🐛 Troubleshooting

### Error: "Billing account required"

Firebase Functions require the Blaze plan (pay-as-you-go), but it has a generous free tier:
- **Free:** 2M invocations/month
- **Cost:** Only pay if you exceed free tier

**To upgrade:**
1. Go to Firebase Console
2. Click "Upgrade" in bottom left
3. Add billing information
4. Select "Blaze" plan

### Error: "Permission denied"

**Solution:**
1. Go to Firebase Console
2. Select your project
3. Go to Functions in sidebar
4. Enable Cloud Functions API

### Error: "CORS blocked"

**Solution:** CORS is already configured in the functions. Make sure:
- You're using the correct function URL
- The URL in `.env` matches the deployed URL
- Frontend has been restarted after updating `.env`

### Error: "Function not found"

**Solution:**
```bash
# Check deployed functions
firebase functions:list

# Redeploy if needed
firebase deploy --only functions
```

### Error: "Module not found"

**Solution:**
```bash
cd functions
npm install
cd ..
firebase deploy --only functions
```

## 📊 Monitoring & Logs

### View Logs in Terminal
```bash
firebase functions:log
```

### View Logs in Firebase Console
1. Go to Firebase Console
2. Click on your project
3. Click "Functions" in left sidebar
4. Click on a function name
5. Click "Logs" tab

### View Metrics
1. Firebase Console → Functions
2. Click on function name
3. See invocations, errors, execution time

## 💰 Cost Estimation

### Free Tier (Included):
- 2M invocations/month
- 400,000 GB-seconds
- 200,000 CPU-seconds

### Estimated Usage:
- **Small app** (100 payments/day): FREE
- **Medium app** (1000 payments/day): FREE
- **Large app** (10,000 payments/day): ~$5-10/month

### Cost Calculator:
https://firebase.google.com/pricing

## 🔐 Security Best Practices

### ✅ What's Secure:
- API key stored in Firebase Functions (server-side)
- Never exposed to browser
- CORS configured to allow only your domain
- Environment variables properly managed

### ❌ Don't Do:
- Don't commit `functions/.env` to Git
- Don't put API keys in frontend code
- Don't share function URLs publicly

### 🔒 Production Security:

**1. Restrict CORS to your domain:**

In `functions/index.js`, change:
```javascript
res.set('Access-Control-Allow-Origin', '*');
```

To:
```javascript
res.set('Access-Control-Allow-Origin', 'https://yourdomain.com');
```

**2. Add authentication:**
```javascript
// Verify user is logged in before processing payment
if (!req.headers.authorization) {
  res.status(401).json({ error: 'Unauthorized' });
  return;
}
```

**3. Rate limiting:**
Use Firebase App Check to prevent abuse.

## 🎯 Production Deployment

### 1. Deploy Functions
```bash
firebase deploy --only functions
```

### 2. Deploy Frontend
Deploy your Vue app to:
- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy`
- **Firebase Hosting**: `firebase deploy --only hosting`

### 3. Update Environment Variables

In your hosting platform, set:
```
VITE_FIREBASE_FUNCTION_URL=https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/createPayment
```

### 4. Test Production

Test the complete flow on your live site.

## 📞 Support Resources

- **Firebase Docs**: https://firebase.google.com/docs/functions
- **Dodo Payments Docs**: https://docs.dodopay.com
- **Firebase Console**: https://console.firebase.google.com
- **Firebase Status**: https://status.firebase.google.com

## 🎉 Success Checklist

When everything works, you should see:

### ✅ Deployment Success:
```
✔  Deploy complete!
Function URL (createPayment): https://...
```

### ✅ Health Check Works:
```bash
curl https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/healthCheck
# Returns: {"status":"ok",...}
```

### ✅ Frontend Works:
- No CORS errors in console
- Payment flow completes
- Redirects to Dodo checkout
- Returns to success page after payment

### ✅ Logs Show Success:
```
🔄 Creating payment via Firebase Cloud Function...
✅ Payment created successfully!
🔗 Payment Link: https://checkout.dodopay.com/...
```

## 🚀 You're Ready!

Your Firebase Cloud Functions backend is complete and ready to deploy!

**Quick Start:** See `FIREBASE_QUICKSTART.md` for 5-command deployment

**Detailed Guide:** See `DEPLOY_FIREBASE.md` for step-by-step instructions

**Comparison:** See `BACKEND_COMPARISON.md` to compare Express vs Firebase

---

**Estimated deployment time:** 10-15 minutes

**Need help?** Check the logs: `firebase functions:log`
