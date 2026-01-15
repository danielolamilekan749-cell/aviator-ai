export interface DodoPaymentData {
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  city: string
  state: string
  addressLine: string
  zipCode: string
  productId: string
  amount: number
  planName: string
}

export const useDodoPaymentsFirebase = () => {
  const createPaymentLink = async (paymentData: DodoPaymentData) => {
    try {
      // Firebase Cloud Function URL
      // For local development (emulator): http://localhost:5001/aviator-ai-project/us-central1/createPayment
      // For production: https://us-central1-aviator-ai-project.cloudfunctions.net/createPayment
      const functionUrl = import.meta.env.VITE_FIREBASE_FUNCTION_URL || 
                         'http://localhost:5001/aviator-ai-project/us-central1/createPayment'
      
      console.log('🔄 Creating payment via Firebase Cloud Function...')
      console.log('📍 Function URL:', functionUrl)
      console.log('📧 Customer:', paymentData.email)
      console.log('💰 Amount:', paymentData.amount)
      
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
      })

      console.log('📡 Response status:', response.status, response.statusText)
      
      const data = await response.json()
      
      if (!response.ok || !data.success) {
        console.error('❌ Payment Error:', data.error)
        throw new Error(data.error || `Payment failed with status ${response.status}`)
      }

      console.log('✅ Payment created successfully!')
      console.log('🔗 Payment Link:', data.paymentLink)
      console.log('🆔 Payment ID:', data.paymentId)
      
      return {
        success: true,
        paymentLink: data.paymentLink,
        paymentId: data.paymentId
      }
    } catch (error) {
      console.error('❌ Payment Error:', error)
      
      // Provide more specific error messages
      let errorMessage = 'An unknown error occurred'
      
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        errorMessage = 'Network error: Unable to connect to payment server. Please make sure Firebase Functions are running.'
      } else if (error instanceof Error) {
        errorMessage = error.message
      }
      
      return {
        success: false,
        error: errorMessage
      }
    }
  }

  const verifyPayment = async (paymentId: string) => {
    try {
      const functionUrl = import.meta.env.VITE_FIREBASE_FUNCTION_URL_VERIFY || 
                         `http://localhost:5001/aviator-ai-project/us-central1/verifyPayment?paymentId=${paymentId}`
      
      console.log('🔍 Verifying payment:', paymentId)
      
      const response = await fetch(functionUrl)
      const data = await response.json()
      
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Verification failed')
      }
      
      console.log('✅ Payment verified:', data.payment)
      
      return {
        success: true,
        payment: data.payment
      }
    } catch (error) {
      console.error('❌ Verification Error:', error)
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Verification failed'
      }
    }
  }

  return {
    createPaymentLink,
    verifyPayment
  }
}
