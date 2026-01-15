# Setup Checklist - Payment Integration

## ✅ What's Already Done

- [x] Backend server created (`server.js`)
- [x] Frontend updated to use backend
- [x] CORS issue fixed
- [x] Dependencies installed (express, cors, dotenv)
- [x] Environment variables configured
- [x] Both servers running

## 📋 What You Need to Do

### Step 1: Verify Servers Are Running

**Check Backend:**
```bash
curl http://localhost:3001/api/health
```
Should return: `{"status":"ok","message":"Payment server is running"}`

**Check Frontend:**
Open browser: http://localhost:5173/aviator-ai/

### Step 2: Create Products in Dodo Dashboard

1. **Login to Dodo Payments**
   - Go to: https://app.dodopayments.com/
   - Login with your account

2. **Navigate to Products**
   - Click "Products" in the sidebar
   - Or go directly to: https://app.dodopayments.com/products

3. **Create Product 1: Daily Plan**
   - Click "Create Product" or "New Product"
   - Fill in:
     - **Name**: Daily Plan
     - **Price**: 5000
     - **Currency**: NGN (Nigerian Naira)
     - **Description**: 24-hour access to Aviator AI predictions
   - Click "Save" or "Create"
   - **COPY THE PRODUCT ID** (looks like: `prod_xxxxxxxxxxxxx`)

4. **Create Product 2: Monthly Plan**
   - Click "Create Product" again
   - Fill in:
     - **Name**: Monthly Plan
     - **Price**: 30000
     - **Currency**: NGN
     - **Description**: 30-day access to Aviator AI predictions
   - Click "Save"
   - **COPY THE PRODUCT ID**

5. **Create Product 3: Quarterly Plan**
   - Click "Create Product" again
   - Fill in:
     - **Name**: Quarterly Plan
     - **Price**: 90000
     - **Currency**: NGN
     - **Description**: 90-day access to Aviator AI predictions
   - Click "Save"
   - **COPY THE PRODUCT ID**

### Step 3: Update Product IDs in Code

1. **Open the file**: `my-vue-app/src/views/ChoosePlanView.vue`

2. **Find lines 11-13** (near the top of the `<script setup>` section):
   ```typescript
   const productIds = {
     daily: 'prod_daily_5000',
     monthly: 'prod_monthly_30000',
     quarterly: 'prod_quarterly_90000'
   }
   ```

3. **Replace with your actual product IDs**:
   ```typescript
   const productIds = {
     daily: 'prod_YOUR_DAILY_ID_HERE',
     monthly: 'prod_YOUR_MONTHLY_ID_HERE',
     quarterly: 'prod_YOUR_QUARTERLY_ID_HERE'
   }
   ```

4. **Save the file**

### Step 4: Test the Payment Flow

1. **Open browser**: http://localhost:5173/aviator-ai/

2. **Open Developer Console**:
   - Windows/Linux: Press `F12` or `Ctrl+Shift+I`
   - Mac: Press `Cmd+Option+I`
   - Click the "Console" tab

3. **Start the signup flow**:
   - Click "Get Started Now" button
   - Fill in the form:
     - First Name: Test
     - Last Name: User
     - Country: Nigeria
     - Phone: +2348012345678
     - Email: your-email@example.com
     - Experience: Select any
     - Check "I agree to terms"
   - Click "Continue"

4. **Choose a plan**:
   - Click on any plan (Daily, Monthly, or Quarterly)
   - Click "Proceed to Payment"

5. **Check the console**:
   - You should see logs starting with 🔄, 📧, 💰
   - If successful, you'll be redirected to Dodo checkout page

### Step 5: Verify Success

**If everything works:**
- ✅ No errors in console
- ✅ Browser redirects to Dodo Payments checkout
- ✅ Checkout page shows correct amount
- ✅ You can complete test payment

**If you see errors:**
- Check `TESTING_GUIDE.md` for troubleshooting
- Verify product IDs are correct
- Make sure both servers are running

## 🚀 Quick Commands Reference

### Start Backend Server
```bash
cd my-vue-app
npm run server
```

### Start Frontend Server (in new terminal)
```bash
cd my-vue-app
npm run dev
```

### Test Backend
```bash
curl http://localhost:3001/api/health
```

### Stop Servers
Press `Ctrl+C` in each terminal

## 📁 Important Files

- `server.js` - Backend server (handles Dodo API calls)
- `src/composables/useDodoPayments.ts` - Frontend payment logic
- `src/views/ChoosePlanView.vue` - Plan selection page (UPDATE PRODUCT IDs HERE)
- `.env` - Environment variables (API key, URLs)

## 🎯 Current Task

**YOU ARE HERE** → Update product IDs in `ChoosePlanView.vue`

After updating:
1. Save the file
2. Refresh browser
3. Test payment flow
4. Should redirect to Dodo checkout

## 📞 Need Help?

See detailed guides:
- `TESTING_GUIDE.md` - Complete testing instructions
- `PAYMENT_SETUP.md` - Full setup documentation
- `QUICK_START.md` - Quick start guide

## ✨ Summary

**What works now:**
- ✅ Backend server running
- ✅ Frontend calling backend
- ✅ No CORS errors
- ✅ No 404 errors

**What you need to do:**
1. Create 3 products in Dodo dashboard
2. Copy product IDs
3. Update `ChoosePlanView.vue` with real IDs
4. Test payment flow

That's it! 🎉
