# Payment Integration Testing Guide

## ✅ Current Status

**Backend Server**: ✓ Running on http://localhost:3001  
**Frontend Server**: ✓ Running on http://localhost:5173/aviator-ai/  
**CORS Issue**: ✓ Fixed  
**404 Error**: ✓ Fixed  

## 🧪 Test Backend Connectivity

### Test 1: Health Check
```bash
curl http://localhost:3001/api/health
```
Expected response:
```json
{"status":"ok","message":"Payment server is running"}
```

### Test 2: Backend Test Endpoint
```bash
curl -X POST http://localhost:3001/api/test \
  -H "Content-Type: application/json" \
  -d '{"test":"data"}'
```
Expected response:
```json
{"success":true,"message":"Backend is working correctly!","receivedData":{"test":"data"}}
```

### Test 3: Payment Endpoint (Will fail without real product IDs)
```bash
curl -X POST http://localhost:3001/api/create-payment \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "productId":"test123",
    "amount":5000,
    "firstName":"Test",
    "lastName":"User",
    "phone":"+2348012345678"
  }'
```

## 🌐 Test Frontend Integration

### Step 1: Open Browser
Navigate to: **http://localhost:5173/aviator-ai/**

### Step 2: Open Browser Console
- Chrome/Edge: Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
- Look at the "Console" tab

### Step 3: Test Payment Flow
1. Click **"Get Started Now"** button
2. Fill in the signup form:
   - First Name: John
   - Last Name: Doe
   - Country: Nigeria
   - Phone: +2348012345678
   - Email: test@example.com
   - Experience: Select any option
   - Check "I agree to terms"
3. Click **"Continue"**
4. Select any plan (Daily, Monthly, or Quarterly)
5. Click **"Proceed to Payment"**

### Step 4: Check Console Output

You should see logs like:
```
🔄 Creating payment via backend server...
📍 Backend URL: http://localhost:3001/api/create-payment
📧 Customer: test@example.com
💰 Amount: 5000
```

## 🔍 Expected Errors (Before Product Setup)

### Error 1: Invalid Product ID
If you see this error, it's **NORMAL**:
```
❌ Payment Error: Page Error !
```

This means:
- ✅ Backend is working
- ✅ Frontend is calling backend correctly
- ✅ Backend is calling Dodo API correctly
- ❌ Product IDs don't exist in Dodo dashboard yet

### Error 2: Network Error
If you see:
```
Network error: Unable to connect to payment server
```

This means the backend server is not running. Start it with:
```bash
npm run server
```

## 📋 Next Steps to Complete Integration

### 1. Create Products in Dodo Dashboard

Go to: https://app.dodopayments.com/products

Create 3 products:

**Product 1: Daily Plan**
- Name: Daily Plan
- Price: ₦5,000
- Currency: NGN (Nigerian Naira)
- Copy the Product ID (looks like: `prod_xxxxxxxxxxxxx`)

**Product 2: Monthly Plan**
- Name: Monthly Plan
- Price: ₦30,000
- Currency: NGN
- Copy the Product ID

**Product 3: Quarterly Plan**
- Name: Quarterly Plan (3 Months)
- Price: ₦90,000
- Currency: NGN
- Copy the Product ID

### 2. Update Product IDs in Code

Open `src/views/ChoosePlanView.vue` and find lines 11-13:

```typescript
const productIds = {
  daily: 'prod_daily_5000',      // ← Replace with actual ID
  monthly: 'prod_monthly_30000',  // ← Replace with actual ID
  quarterly: 'prod_quarterly_90000' // ← Replace with actual ID
}
```

Replace with your actual product IDs from Dodo dashboard:

```typescript
const productIds = {
  daily: 'prod_abc123xyz',      // Your actual daily product ID
  monthly: 'prod_def456uvw',    // Your actual monthly product ID
  quarterly: 'prod_ghi789rst'   // Your actual quarterly product ID
}
```

### 3. Test Again

After updating product IDs:
1. Refresh the browser
2. Go through the signup flow again
3. Choose a plan
4. Click "Proceed to Payment"
5. You should be redirected to Dodo Payments checkout page

## 🎯 Success Indicators

### Backend Server Logs
When payment is created successfully, you'll see:
```
🔄 Creating payment with Dodo Payments...
📧 Customer: test@example.com
💰 Amount: 5000
📦 Product ID: prod_abc123xyz
📦 Request body: {...}
📡 Response status: 200 OK
✅ Payment created successfully!
🔗 Payment Link: https://checkout.dodopay.com/...
🆔 Payment ID: pay_xxxxxxxxxxxxx
```

### Browser Console Logs
```
🔄 Creating payment via backend server...
📍 Backend URL: http://localhost:3001/api/create-payment
📧 Customer: test@example.com
💰 Amount: 5000
📡 Response status: 200 OK
✅ Payment created successfully!
🔗 Payment Link: https://checkout.dodopay.com/...
🆔 Payment ID: pay_xxxxxxxxxxxxx
```

### Browser Behavior
- Browser redirects to Dodo Payments checkout page
- You see a payment form with the correct amount
- After payment, redirects back to your success page

## 🐛 Troubleshooting

### Problem: "Failed to fetch" or Network Error
**Solution**: Make sure backend server is running
```bash
# Check if server is running
curl http://localhost:3001/api/health

# If not running, start it
cd my-vue-app
npm run server
```

### Problem: "Page Error" from Dodo API
**Solution**: Product IDs are invalid or don't exist
- Create products in Dodo dashboard
- Update product IDs in `ChoosePlanView.vue`

### Problem: CORS Error
**Solution**: Should be fixed, but if you see it:
- Make sure you're calling `http://localhost:3001` not `https://api.dodopay.com`
- Check `useDodoPayments.ts` - it should call backend, not Dodo API directly

### Problem: 404 Not Found
**Solution**: Backend server not running or wrong URL
- Verify backend is running: `curl http://localhost:3001/api/health`
- Check `.env` has: `VITE_BACKEND_URL=http://localhost:3001`
- Restart frontend server after changing `.env`

## 📊 Architecture Diagram

```
User Browser
    ↓
Vue Frontend (Port 5173)
    ↓ (HTTP POST)
Express Backend (Port 3001)
    ↓ (HTTPS POST with API Key)
Dodo Payments API
    ↓ (Returns payment link)
Express Backend
    ↓ (Returns payment link)
Vue Frontend
    ↓ (Redirects user)
Dodo Checkout Page
```

## 🔐 Security Notes

✅ **What's Secure:**
- API key stored in backend `.env` file
- Never exposed to browser
- Backend validates requests
- CORS properly configured

❌ **Don't Do This:**
- Don't commit `.env` to Git
- Don't put API key in frontend code
- Don't call Dodo API directly from browser

## 📞 Support

If you're still having issues:

1. Check both server logs (backend terminal and browser console)
2. Verify both servers are running
3. Test backend with curl commands above
4. Make sure product IDs are correct
5. Check Dodo dashboard for API key validity

## 🎉 When Everything Works

You'll see:
1. User fills signup form ✓
2. User selects a plan ✓
3. User clicks "Proceed to Payment" ✓
4. Browser redirects to Dodo checkout ✓
5. User completes payment ✓
6. Browser redirects back to success page ✓

That's it! Your payment integration is complete.
