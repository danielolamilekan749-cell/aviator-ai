import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors()) // Allow cross-origin requests from frontend
app.use(express.json()) // Parse JSON request bodies

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Payment server is running' })
})

// Test endpoint to verify backend connectivity
app.post('/api/test', (req, res) => {
  console.log('✅ Test endpoint called successfully!')
  console.log('📦 Received data:', req.body)
  res.json({
    success: true,
    message: 'Backend is working correctly!',
    receivedData: req.body
  })
})

// Create payment link endpoint
app.post('/api/create-payment', async (req, res) => {
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
    } = req.body

    // Validate required fields
    if (!email || !productId || !amount) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: email, productId, and amount are required'
      })
    }

    console.log('🔄 Creating payment with Dodo Payments...')
    console.log('📧 Customer:', email)
    console.log('💰 Amount:', amount)
    console.log('📦 Product ID:', productId)

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
      return_url: `${req.headers.origin}/aviator-ai/payment-success`,
      cancel_url: `${req.headers.origin}/aviator-ai/choose-plan`
    }

    console.log('📦 Request body:', JSON.stringify(requestBody, null, 2))

    // Call Dodo Payments API
    const apiUrl = `${process.env.VITE_DODO_API_URL}/payments`
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.VITE_DODO_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    })

    console.log('📡 Response status:', response.status, response.statusText)

    // Handle API response
    if (!response.ok) {
      const errorText = await response.text()
      let errorData
      try {
        errorData = JSON.parse(errorText)
      } catch {
        errorData = { message: errorText }
      }
      console.error('❌ Dodo Payment API Error:', errorData)
      
      return res.status(response.status).json({
        success: false,
        error: errorData?.message || errorData?.error || `Payment API returned status ${response.status}`
      })
    }

    const data = await response.json()
    console.log('✅ Payment created successfully!')
    console.log('🔗 Payment Link:', data.payment_link)
    console.log('🆔 Payment ID:', data.payment_id)

    // Return success response to frontend
    res.json({
      success: true,
      paymentLink: data.payment_link,
      paymentId: data.payment_id
    })

  } catch (error) {
    console.error('❌ Server Error:', error)
    
    // Handle different types of errors
    let errorMessage = 'An unknown error occurred'
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      errorMessage = 'Unable to connect to payment gateway. Please check your internet connection.'
    } else if (error instanceof Error) {
      errorMessage = error.message
    }
    
    res.status(500).json({
      success: false,
      error: errorMessage
    })
  }
})

// Verify payment endpoint (optional - for checking payment status)
app.get('/api/verify-payment/:paymentId', async (req, res) => {
  try {
    const { paymentId } = req.params

    const apiUrl = `${process.env.VITE_DODO_API_URL}/payments/${paymentId}`
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.VITE_DODO_API_KEY}`
      }
    })

    if (!response.ok) {
      const errorText = await response.text()
      return res.status(response.status).json({
        success: false,
        error: errorText
      })
    }

    const data = await response.json()
    res.json({
      success: true,
      payment: data
    })

  } catch (error) {
    console.error('❌ Verification Error:', error)
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Verification failed'
    })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Payment server running on http://localhost:${PORT}`)
  console.log(`📍 API endpoint: http://localhost:${PORT}/api/create-payment`)
  console.log(`🔑 Using API key: ${process.env.VITE_DODO_API_KEY ? '✓ Loaded' : '✗ Missing'}`)
  console.log(`🌐 API URL: ${process.env.VITE_DODO_API_URL}`)
})
