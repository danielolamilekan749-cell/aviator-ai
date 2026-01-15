# Quick Start Guide - Payment Integration

## ✅ What's Been Fixed

The CORS error is now **completely resolved**. The frontend no longer calls Dodo Payments API directly.

## 🚀 How to Run (2 Simple Steps)

### Step 1: Start Backend Server
Open a terminal and run:
```bash
cd my-vue-app
npm run server
```

You should see:
```
🚀 Payment server running on http://localhost:3001
🔑 Using API key: ✓ Loaded
```

### Step 2: Start Frontend (in a new terminal)
```bash
cd my-vue-app
npm run dev
```

You should see:
```
➜  Local:   http://localhost:5173/aviator-ai/
```

## 🌐 Open in Browser

Visit: **http://localhost:5173/aviator-ai/**

## ⚠️ Before Testing Payments

You need to create products in Dodo Payments dashboard:

1. Go to: https://app.dodopayments.com/products
2. Create 3 products:
   - Daily: ₦5,000
   - Monthly: ₦30,000  
   - Quarterly: ₦90,000
3. Copy the product IDs
4. Update them in `src/views/ChoosePlanView.vue` (lines 11-13)

## 📊 Current Status

✅ Backend server created (Express.js)  
✅ Frontend updated to use backend  
✅ CORS issue fixed  
✅ Both servers running  
⏳ Need to add real product IDs from Dodo dashboard  

## 🔍 Test the Flow

1. Click "Get Started Now"
2. Fill signup form
3. Choose a plan
4. Click "Proceed to Payment"
5. Check console for logs

## 📝 Detailed Documentation

See `PAYMENT_SETUP.md` for complete documentation.
