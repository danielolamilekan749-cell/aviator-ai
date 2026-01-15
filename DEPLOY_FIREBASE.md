# 🚀 Firebase Cloud Functions Deployment Checklist

## ✅ Prerequisites (Already Done)
- [x] Firebase CLI installed
- [x] Firebase project created
- [x] Functions folder created
- [x] Dependencies installed
- [x] Cloud Functions code written

## 📋 Step-by-Step Deployment Guide

### Step 1: Login to Firebase (If Not Already)

```bash
firebase login
```

This opens your browser for authentication.

---

### Step 2: Initialize Firebase Project

```bash
cd my-vue-app
firebase use --add
```

**What to do:**
1. Select your Firebase project from the list
2. Enter alias: `default`
3. Press Enter

**Alternative:** If you know your project ID, update `.firebaserc`:
```json
{
  "projects": {
    "default": "your-firebase-project-id"
  }
}
```

---

### Step 3: Test Locally with Emulator (Optional but Recommended)

```bash
cd my-vue-app
firebase emulators:start
```

**Expected output:**
```
✔  functions[us-central1-createPayment]: http function initialized
   http://localhost:5001/YOUR-PROJECT-ID/us-central1/createPayment
✔  functions[us-central1-verifyPayment]: http function initialized
✔  functions[us-central1-healthCheck]: http function initialized
```

**Test the function:**
```bash
# In a new terminal
curl http://localhost:5001/YOUR-PROJECT-ID/us-central1/healthCheck
```

Expected response:
```json
{"status":"ok","message":"Firebase Cloud Functions for Dodo Payments is running"}
```

**Stop emulator:** Press `Ctrl+C`

---

### Step 4: Deploy to Production

```bash
cd my-vue-app
firebase deploy --only functions
```

**Expected output:**
```
=== Deploying to 'your-project-id'...

i  deploying functions
i  functions: ensuring required API cloudfunctions.googleapis.com is enabled...
i  functions: ensuring required API cloudbuild.googleapis.com is enabled...
✔  functions: required API cloudfunctions.googleapis.com is enabled
✔  functions: required API cloudbuild.googleapis.com is enabled
i  functions: preparing codebase default for deployment
i  functions: packaged /path/to/functions (XX.XX KB) for uploading
✔  functions: functions folder uploaded successfully
i  functions: creating Node.js 18 function createPayment(us-central1)...
i  functions: creating Node.js 18 function verifyPayment(us-central1)...
i  functions: creating Node.js 18 function healthCheck(us-central1)...
✔  functions[createPayment(us-central1)]: Successful create operation.
✔  functions[verifyPayment(us-central1)]: Successful create operation.
✔  functions[healthCheck(us-central1)]: Successful create operation.

✔  Deploy complete!

Function URL (createPayment(us-central1)): https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/createPayment
Function URL (verifyPayment(us-central1)): https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/verifyPayment
Function URL (healthCheck(us-central1)): https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/healthCheck
```

**IMPORTANT:** Copy the `createPayment` URL! You'll need it in the next step.

---

### Step 5: Update Frontend Environment Variables

Open `my-vue-app/.env` and update with your deployed function URL:

```env
# Replace YOUR-PROJECT-ID with your actual Firebase project ID
VITE_FIREBASE_FUNCTION_URL=https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/createPayment
VITE_FIREBASE_FUNCTION_URL_VERIFY=https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/verifyPayment
```

**Example:**
```env
VITE_FIREBASE_FUNCTION_URL=https://us-central1-aviator-ai-12345.cloudfunctions.net/createPayment
VITE_FIREBASE_FUNCTION_URL_VERIFY=https://us-central1-aviator-ai-12345.cloudfunctions.net/verifyPayment
```

---

### Step 6: Update Frontend Code

Open `my-vue-app/src/views/ChoosePlanView.vue`

**Find this line (around line 5):**
```typescript
import { useDodoPayments } from '@/composables/useDodoPayments'
```

**Replace with:**
```typescript
import { useDodoPaymentsFirebase as useDodoPayments } from '@/composables/useDodoPaymentsFirebase'
```

**Save the file.**

---

### Step 7: Restart Frontend Dev Server

```bash
# Stop current server (Ctrl+C in the terminal running npm run dev)
# Then restart:
cd my-vue-app
npm run dev
```

---

### Step 8: Test the Payment Flow

1. **Open browser:** http://localhost:5173/aviator-ai/

2. **Open Developer Console:**
   - Windows/Linux: `F12` or `Ctrl+Shift+I`
   - Mac: `Cmd+Option+I`

3. **Test the flow:**
   - Click "Get Started Now"
   - Fill in signup form
   - Choose a plan
   - Click "Proceed to Payment"

4. **Check console logs:**
   ```
   🔄 Creating payment via Firebase Cloud Function...
   📍 Function URL: https://us-central1-...
   📧 Customer: test@example.com
   💰 Amount: 5000
   ```

5. **Expected result:**
   - If product IDs are correct: Redirects to Dodo checkout
   - If product IDs are wrong: Error message (this is normal until you create products)

---

### Step 9: Create Products in Dodo Dashboard

1. Go to: https://app.dodopayments.com/products

2. Create 3 products:
   - **Daily Plan**: ₦5,000
   - **Monthly Plan**: ₦30,000
   - **Quarterly Plan**: ₦90,000

3. Copy each product ID (looks like: `prod_xxxxxxxxxxxxx`)

4. Update `src/views/ChoosePlanView.vue` (lines 11-13):
   ```typescript
   const productIds = {
     daily: 'prod_YOUR_DAILY_ID',
     monthly: 'prod_YOUR_MONTHLY_ID',
     quarterly: 'prod_YOUR_QUARTERLY_ID'
   }
   ```

5. Save and test again!

---

## 🧪 Testing Commands

### Test Health Check
```bash
curl https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/healthCheck
```

### Test Create Payment
```bash
curl -X POST https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/createPayment \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "productId": "prod_test123",
    "amount": 5000,
    "firstName": "Test",
    "lastName": "User",
    "phone": "+2348012345678"
  }'
```

---

## 🔧 Troubleshooting

### Error: "Project not found"
**Solution:**
```bash
firebase projects:list
firebase use YOUR-PROJECT-ID
```

### Error: "Permission denied"
**Solution:**
1. Go to Firebase Console
2. Click on your project
3. Go to "Functions" in left sidebar
4. Enable Cloud Functions API if prompted

### Error: "Billing account required"
**Solution:**
Firebase Functions require the Blaze (pay-as-you-go) plan, but it has a generous free tier:
- 2M invocations/month free
- Only pay if you exceed free tier

To upgrade:
1. Go to Firebase Console
2. Click "Upgrade" in bottom left
3. Add billing information
4. Select "Blaze" plan

### Error: "CORS issues"
**Solution:** CORS is already configured in the functions. Make sure you're calling the correct URL.

### Error: "Function not found"
**Solution:**
```bash
# Redeploy functions
firebase deploy --only functions
```

---

## 📊 Deployment Checklist

- [ ] Firebase CLI logged in (`firebase login`)
- [ ] Project linked (`firebase use --add`)
- [ ] Functions tested locally (`firebase emulators:start`)
- [ ] Functions deployed (`firebase deploy --only functions`)
- [ ] Function URLs copied
- [ ] `.env` updated with production URLs
- [ ] Frontend code updated to use Firebase composable
- [ ] Frontend restarted
- [ ] Payment flow tested
- [ ] Products created in Dodo dashboard
- [ ] Product IDs updated in code
- [ ] End-to-end payment tested

---

## 🎉 Success Indicators

### Deployment Success:
```
✔  Deploy complete!
Function URL (createPayment): https://us-central1-...
```

### Function Working:
```bash
curl https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/healthCheck
# Returns: {"status":"ok","message":"..."}
```

### Frontend Working:
- Browser console shows Firebase function URL
- No CORS errors
- Payment redirects to Dodo checkout (with correct product IDs)

---

## 📞 Quick Reference

### Deploy Functions
```bash
firebase deploy --only functions
```

### View Logs
```bash
firebase functions:log
```

### Delete a Function
```bash
firebase functions:delete FUNCTION_NAME
```

### Update Environment Variables
```bash
firebase functions:config:set dodo.api_key="YOUR_KEY"
firebase functions:config:get
```

---

## 🔐 Security Notes

✅ **Good:**
- API key stored in Firebase Functions (secure)
- Never exposed to browser
- CORS properly configured

❌ **Don't:**
- Don't commit `functions/.env` to Git
- Don't put API keys in frontend code
- Don't share function URLs publicly (they're meant for your app)

---

## 🎯 Next Steps After Deployment

1. ✅ Functions deployed
2. ✅ Frontend updated
3. ✅ Payment flow tested
4. ⏳ Create products in Dodo dashboard
5. ⏳ Update product IDs
6. ⏳ Test complete payment
7. ⏳ Deploy frontend to production (Vercel, Netlify, etc.)

---

## 💡 Pro Tips

1. **Monitor your functions:**
   - Go to Firebase Console → Functions
   - View logs, metrics, and errors

2. **Set up alerts:**
   - Firebase Console → Functions → Metrics
   - Set up email alerts for errors

3. **Optimize cold starts:**
   - Keep functions warm with scheduled pings
   - Or use Cloud Run for faster cold starts

4. **Cost optimization:**
   - Monitor usage in Firebase Console
   - Free tier is usually enough for small apps
   - Only pay for what you use

---

## 🚀 You're Ready!

Follow the steps above in order, and you'll have Firebase Cloud Functions running in production!

**Estimated time:** 10-15 minutes

**Need help?** Check the logs:
```bash
firebase functions:log --only createPayment
```
