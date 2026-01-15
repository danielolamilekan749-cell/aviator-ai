# Dodo Payments Integration Setup

## Problem Solved
The frontend was trying to call Dodo Payments API directly, which caused CORS (Cross-Origin Resource Sharing) errors. Payment APIs don't allow direct browser calls for security reasons.

## Solution
Created a **backend proxy server** that:
- Receives payment requests from the frontend
- Securely stores the API key on the server (never exposed to browser)
- Calls Dodo Payments API on behalf of the frontend
- Returns the payment link to the frontend

## Architecture

```
Frontend (Vue) → Backend Server (Express) → Dodo Payments API
   Port 5173          Port 3001              api.dodopay.com
```

## Files Created/Modified

### New Files:
- `server.js` - Express backend server that handles payment requests
- `PAYMENT_SETUP.md` - This documentation file

### Modified Files:
- `src/composables/useDodoPayments.ts` - Now calls backend instead of Dodo API
- `.env` - Added `VITE_BACKEND_URL=http://localhost:3001`
- `package.json` - Added `server` and `dev:all` scripts

## How to Run

### Option 1: Run Both Servers Separately (Recommended for Development)

**Terminal 1 - Backend Server:**
```bash
cd my-vue-app
npm run server
```
You should see:
```
🚀 Payment server running on http://localhost:3001
📍 API endpoint: http://localhost:3001/api/create-payment
🔑 Using API key: ✓ Loaded
```

**Terminal 2 - Frontend Dev Server:**
```bash
cd my-vue-app
npm run dev
```
You should see:
```
VITE v5.4.11  ready in 462 ms
➜  Local:   http://localhost:5173/aviator-ai/
```

### Option 2: Run Both Together (macOS/Linux)
```bash
npm run dev:all
```

## Testing the Payment Flow

1. Open browser: `http://localhost:5173/aviator-ai/`
2. Click "Get Started Now"
3. Fill in the signup form
4. Choose a plan (Daily, Monthly, or Quarterly)
5. Click "Proceed to Payment"
6. Check browser console for detailed logs

## Important: Product IDs

Before testing payments, you MUST:

1. Go to Dodo Payments Dashboard: https://app.dodopayments.com/products
2. Create 3 products with these prices:
   - **Daily Plan**: ₦5,000
   - **Monthly Plan**: ₦30,000
   - **Quarterly Plan**: ₦90,000
3. Copy the product IDs from the dashboard
4. Update `src/views/ChoosePlanView.vue` lines 11-13:

```typescript
const productIds = {
  daily: 'prod_xxxxxxxxxxxxx',      // Replace with actual ID
  monthly: 'prod_xxxxxxxxxxxxx',    // Replace with actual ID
  quarterly: 'prod_xxxxxxxxxxxxx'   // Replace with actual ID
}
```

## API Endpoints

### Backend Server Endpoints:

1. **Health Check**
   - URL: `GET http://localhost:3001/api/health`
   - Response: `{ "status": "ok", "message": "Payment server is running" }`

2. **Create Payment**
   - URL: `POST http://localhost:3001/api/create-payment`
   - Body: Payment data (firstName, lastName, email, phone, productId, amount, etc.)
   - Response: `{ "success": true, "paymentLink": "...", "paymentId": "..." }`

3. **Verify Payment** (Optional)
   - URL: `GET http://localhost:3001/api/verify-payment/:paymentId`
   - Response: Payment status and details

## Environment Variables

Your `.env` file should contain:
```env
VITE_DODO_API_KEY=dyuHw9_V8YH-JzXX.uDP0tIq27MqWjLZi6_CodbE_0Hv84NLUh7T3PZe37dHUWGib
VITE_DODO_API_URL=https://api.dodopay.com/v1
VITE_BACKEND_URL=http://localhost:3001
```

## Troubleshooting

### Error: "Unable to connect to payment server"
- Make sure backend server is running on port 3001
- Check if `npm run server` is active in a terminal
- Verify `.env` has `VITE_BACKEND_URL=http://localhost:3001`

### Error: "Port 3001 already in use"
- Stop the existing process: `lsof -ti:3001 | xargs kill -9`
- Or change the port in `server.js` and `.env`

### Error: "Missing required fields"
- Make sure you completed the signup form first
- Check browser console for detailed error messages

### CORS Errors (Should be fixed now)
- If you still see CORS errors, the backend server might not be running
- Restart both servers

## Production Deployment

For production, you'll need to:

1. Deploy the backend server to a hosting service (Heroku, Railway, Render, etc.)
2. Update `.env` with production backend URL:
   ```env
   VITE_BACKEND_URL=https://your-backend-domain.com
   ```
3. Ensure the backend has the Dodo API key in its environment variables
4. Build and deploy the frontend as usual

## Security Notes

✅ **Good:**
- API key is stored on the backend server (never exposed to browser)
- Backend validates all requests before calling Dodo API
- CORS is properly configured

❌ **Never:**
- Don't commit `.env` file to Git (it's in `.gitignore`)
- Don't expose API keys in frontend code
- Don't call payment APIs directly from the browser

## Next Steps

1. ✅ Backend server created and running
2. ✅ Frontend updated to use backend
3. ✅ CORS issue fixed
4. ⏳ Create products in Dodo dashboard
5. ⏳ Update product IDs in `ChoosePlanView.vue`
6. ⏳ Test the complete payment flow
7. ⏳ Deploy to production

## Support

If you encounter issues:
- Check both server logs (backend and frontend)
- Look at browser console for detailed error messages
- Verify all environment variables are set correctly
- Ensure product IDs match your Dodo dashboard
