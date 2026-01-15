# Firebase Cloud Functions Setup for Dodo Payments

## 🎯 Overview

This guide shows you how to use Firebase Cloud Functions as your backend for Dodo Payments integration, replacing the Express server.

## ✅ What's Been Created

- ✅ `functions/index.js` - Firebase Cloud Functions (createPayment, verifyPayment, healthCheck)
- ✅ `functions/package.json` - Dependencies configuration
- ✅ `functions/.env` - Environment variables for local development
- ✅ `firebase.json` - Firebase configuration
- ✅ `.firebaserc` - Firebase project configuration
- ✅ `src/composables/useDodoPaymentsFirebase.ts` - Frontend integration

## 📋 Prerequisites

1. **Firebase CLI** (already installed ✓)
2. **Firebase Project** (needs to be created)
3. **Node.js 18+** (you have v20.11.1 ✓)

## 🚀 Setup Steps

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter project name: `aviator-ai-project` (or any name you prefer)
4. Follow the setup wizard:
   - Enable Google Analytics (optional)
   - Accept terms
   - Click "Create project"

### Step 2: Login to Firebase CLI

```bash
firebase login
```

This will open your browser for authentication.

### Step 3: Link Your Project

```bash
cd my-vue-app
firebase use --add
```

- Select your project from the list
- Enter alias: `default`

Or update `.firebaserc` manually with your project ID:
```json
{
  "projects": {
    "default": "your-actual-project-id"
  }
}
```

### Step 4: Set Environment Variables (Production)

For production deployment, set the API key securely:

```bash
cd my-vue-app
firebase functions:config:set dodo.api_key="dyuHw9_V8YH-JzXX.uDP0tIq27MqWjLZi6_CodbE_0Hv84NLUh7T3PZe37dHUWGib"
firebase functions:config:set dodo.api_url="https://api.dodopay.com/v1"
```

Then update `functions/index.js` to use Firebase config:
```javascript
const DODO_API_KEY = functions.config().dodo?.api_key || process.env.DODO_API_KEY;
const DODO_API_URL = functions.config().dodo?.api_url || process.env.DODO_API_URL;
```

### Step 5: Test Locally with Emulator

Start the Firebase emulator:

```bash
cd my-vue-app
firebase emulators:start
```

You should see:
```
✔  functions[us-central1-createPayment]: http function initialized (http://localhost:5001/aviator-ai-project/us-central1/createPayment).
✔  functions[us-central1-verifyPayment]: http function initialized (http://localhost:5001/aviator-ai-project/us-central1/verifyPayment).
✔  functions[us-central1-healthCheck]: http function initialized (http://localhost:5001/aviator-ai-project/us-central1/healthCheck).
```

### Step 6: Test the Functions

**Test Health Check:**
```bash
curl http://localhost:5001/aviator-ai-project/us-central1/healthCheck
```

Expected response:
```json
{
  "status": "ok",
  "message": "Firebase Cloud Functions for Dodo Payments is running",
  "timestamp": "2026-01-14T..."
}
```

**Test Create Payment:**
```bash
curl -X POST http://localhost:5001/aviator-ai-project/us-central1/createPayment \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "productId": "test123",
    "amount": 5000,
    "firstName": "Test",
    "lastName": "User",
    "phone": "+2348012345678"
  }'
```

### Step 7: Update Frontend to Use Firebase Functions

Update `src/views/ChoosePlanView.vue` to import the Firebase composable:

```typescript
// Change this line:
import { useDodoPayments } from '@/composables/useDodoPayments'

// To this:
import { useDodoPaymentsFirebase as useDodoPayments } from '@/composables/useDodoPaymentsFirebase'
```

Or create a new version that uses Firebase.

### Step 8: Deploy to Production

When ready to deploy:

```bash
cd my-vue-app
firebase deploy --only functions
```

You'll get URLs like:
```
✔  functions[createPayment(us-central1)]: https://us-central1-aviator-ai-project.cloudfunctions.net/createPayment
✔  functions[verifyPayment(us-central1)]: https://us-central1-aviator-ai-project.cloudfunctions.net/verifyPayment
✔  functions[healthCheck(us-central1)]: https://us-central1-aviator-ai-project.cloudfunctions.net/healthCheck
```

### Step 9: Update Frontend for Production

Update `.env` with production URLs:

```env
# Production Firebase Functions
VITE_FIREBASE_FUNCTION_URL=https://us-central1-aviator-ai-project.cloudfunctions.net/createPayment
VITE_FIREBASE_FUNCTION_URL_VERIFY=https://us-central1-aviator-ai-project.cloudfunctions.net/verifyPayment
```

## 🔄 Switching Between Express and Firebase

### Current Setup (Express):
- Backend: `npm run server` (port 3001)
- Frontend uses: `useDodoPayments` composable
- Good for: Local development, simple deployment

### Firebase Setup:
- Backend: `firebase emulators:start` (port 5001)
- Frontend uses: `useDodoPaymentsFirebase` composable
- Good for: Production, scalability, serverless

### To Switch to Firebase:

1. **Stop Express server** (if running)
2. **Start Firebase emulator**:
   ```bash
   firebase emulators:start
   ```
3. **Update ChoosePlanView.vue**:
   ```typescript
   import { useDodoPaymentsFirebase as useDodoPayments } from '@/composables/useDodoPaymentsFirebase'
   ```
4. **Restart frontend** to load new env variables

## 📊 Architecture Comparison

### Express Backend (Current):
```
Vue Frontend → Express Server (Port 3001) → Dodo API
```

### Firebase Backend (New):
```
Vue Frontend → Firebase Cloud Functions → Dodo API
```

## 🎯 Advantages of Firebase

✅ **Serverless** - No server management  
✅ **Auto-scaling** - Handles traffic spikes  
✅ **Free tier** - 2M invocations/month  
✅ **Global CDN** - Fast worldwide  
✅ **Built-in monitoring** - Firebase Console  
✅ **Easy deployment** - One command  

## 💰 Firebase Pricing

**Free Tier (Spark Plan):**
- 2M function invocations/month
- 400,000 GB-seconds compute time
- 200,000 CPU-seconds
- 5GB outbound networking

**Paid Tier (Blaze Plan):**
- Pay as you go
- $0.40 per million invocations
- $0.0000025 per GB-second
- $0.10 per GB outbound

For most small to medium apps, the free tier is sufficient.

## 🧪 Testing Checklist

- [ ] Firebase project created
- [ ] Firebase CLI logged in
- [ ] Project linked (`.firebaserc` updated)
- [ ] Dependencies installed (`npm install` in functions/)
- [ ] Emulator started successfully
- [ ] Health check endpoint responds
- [ ] Create payment endpoint tested
- [ ] Frontend updated to use Firebase composable
- [ ] Payment flow tested end-to-end
- [ ] Functions deployed to production (optional)

## 🐛 Troubleshooting

### Error: "Project not found"
- Create project in Firebase Console
- Update `.firebaserc` with correct project ID
- Run `firebase use --add`

### Error: "Port 5001 already in use"
- Stop other processes using port 5001
- Or change port in `firebase.json`

### Error: "Functions not deploying"
- Check Node.js version (should be 18+)
- Verify `functions/package.json` is correct
- Run `npm install` in `functions/` directory

### Error: "CORS issues"
- CORS is already configured in functions
- Check that frontend is calling correct URL
- Verify emulator is running

## 📞 Support

For Firebase-specific issues:
- [Firebase Documentation](https://firebase.google.com/docs/functions)
- [Firebase Console](https://console.firebase.google.com/)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)

## 🎉 Next Steps

1. Create Firebase project
2. Start emulator: `firebase emulators:start`
3. Test locally
4. Deploy to production: `firebase deploy --only functions`
5. Update frontend with production URLs
6. Test payment flow

You now have two backend options:
- **Express** (simple, local)
- **Firebase** (scalable, production-ready)

Choose based on your needs!
