/**
 * Firebase Cloud Functions for Dodo Payments Integration
 * 
 * This function acts as a secure backend proxy between your Vue frontend
 * and the Dodo Payments API, solving CORS issues and keeping API keys secure.
 */

const functions = require('firebase-functions');
const fetch = require('node-fetch');

// Dodo Payment API Configuration
// IMPORTANT: Set these in Firebase Functions config or environment variables
const DODO_API_KEY = process.env.DODO_API_KEY || 'dyuHw9_V8YH-JzXX.uDP0tIq27MqWjLZi6_CodbE_0Hv84NLUh7T3PZe37dHUWGib';
const DODO_API_URL = process.env.DODO_API_URL || 'https://api.dodopay.com/v1';

/**
 * Create Payment Link
 * 
 * HTTP Endpoint: POST /createPayment
 * 
 * Request Body:
 * {
 *   firstName: string,
 *   lastName: string,
 *   email: string,
 *   phone: string,
 *   country: string,
 *   city: string,
 *   state: string,
 *   addressLine: string,
 *   zipCode: string,
 *   productId: string,
 *   amount: number,
 *   planName: string
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   paymentLink?: string,
 *   paymentId?: string,
 *   error?: string
 * }
 */
exports.createPayment = functions.https.onRequest(async (req, res) => {
  // Enable CORS for your frontend
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({
      success: false,
      error: 'Method not allowed. Use POST.'
    });
    return;
  }

  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      country,
      city,
      state,
      addressLine,
      zipCode,
      productId,
      amount,
      planName
    } = req.body;

    // Validate required fields
    if (!email || !productId || !amount) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: email, productId, and amount are required'
      });
      return;
    }

    console.log('🔄 Creating payment with Dodo Payments...');
    console.log('📧 Customer:', email);
    console.log('💰 Amount:', amount);
    console.log('📦 Product ID:', productId);

    // Get origin from request headers for return URLs
    const origin = req.headers.origin || req.headers.referer || 'http://localhost:5173';
    const baseUrl = origin.replace(/\/$/, ''); // Remove trailing slash

    // Prepare request body for Dodo Payments API
    const requestBody = {
      payment_link: true,
      billing: {
        city: city || 'Lagos',
        country: country || 'NG',
        state: state || 'Lagos',
        street: addressLine || 'N/A',
        zipcode: parseInt(zipCode) || 100001
      },
      customer: {
        email: email,
        name: `${firstName} ${lastName}`,
        phone_number: phone
      },
      product_cart: [
        {
          product_id: productId,
          quantity: 1
        }
      ],
      return_url: `${baseUrl}/aviator-ai/payment-success`,
      cancel_url: `${baseUrl}/aviator-ai/choose-plan`
    };

    console.log('📦 Request body:', JSON.stringify(requestBody, null, 2));

    // Call Dodo Payments API
    const apiUrl = `${DODO_API_URL}/payments`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DODO_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });

    console.log('📡 Response status:', response.status, response.statusText);

    // Handle API response
    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText };
      }
      console.error('❌ Dodo Payment API Error:', errorData);
      
      res.status(response.status).json({
        success: false,
        error: errorData?.message || errorData?.error || `Payment API returned status ${response.status}`
      });
      return;
    }

    const data = await response.json();
    console.log('✅ Payment created successfully!');
    console.log('🔗 Payment Link:', data.payment_link);
    console.log('🆔 Payment ID:', data.payment_id);

    // Return success response to frontend
    res.json({
      success: true,
      paymentLink: data.payment_link,
      paymentId: data.payment_id
    });

  } catch (error) {
    console.error('❌ Server Error:', error);
    
    // Handle different types of errors
    let errorMessage = 'An unknown error occurred';
    
    if (error.message && error.message.includes('fetch')) {
      errorMessage = 'Unable to connect to payment gateway. Please check your internet connection.';
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
});

/**
 * Verify Payment Status
 * 
 * HTTP Endpoint: GET /verifyPayment?paymentId=xxx
 * 
 * Query Parameters:
 * - paymentId: string (required)
 * 
 * Response:
 * {
 *   success: boolean,
 *   payment?: object,
 *   error?: string
 * }
 */
exports.verifyPayment = functions.https.onRequest(async (req, res) => {
  // Enable CORS
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    res.status(405).json({
      success: false,
      error: 'Method not allowed. Use GET.'
    });
    return;
  }

  try {
    const { paymentId } = req.query;

    if (!paymentId) {
      res.status(400).json({
        success: false,
        error: 'Missing required parameter: paymentId'
      });
      return;
    }

    console.log('🔍 Verifying payment:', paymentId);

    const apiUrl = `${DODO_API_URL}/payments/${paymentId}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${DODO_API_KEY}`
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      res.status(response.status).json({
        success: false,
        error: errorText
      });
      return;
    }

    const data = await response.json();
    console.log('✅ Payment verified:', data);

    res.json({
      success: true,
      payment: data
    });

  } catch (error) {
    console.error('❌ Verification Error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Verification failed'
    });
  }
});

/**
 * Health Check Endpoint
 * 
 * HTTP Endpoint: GET /healthCheck
 * 
 * Response:
 * {
 *   status: string,
 *   message: string,
 *   timestamp: string
 * }
 */
exports.healthCheck = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.json({
    status: 'ok',
    message: 'Firebase Cloud Functions for Dodo Payments is running',
    timestamp: new Date().toISOString()
  });
});
