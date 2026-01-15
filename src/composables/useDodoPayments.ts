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

export const useDodoPayments = () => {
  const createPaymentLink = async (paymentData: DodoPaymentData) => {
    try {
      // Call our backend server instead of Dodo API directly (fixes CORS issue)
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'
      const apiUrl = `${backendUrl}/api/create-payment`
      
      console.log('🔄 Creating payment via backend server...')
      console.log('📍 Backend URL:', apiUrl)
      console.log('📧 Customer:', paymentData.email)
      console.log('💰 Amount:', paymentData.amount)
      
      const response = await fetch(apiUrl, {
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
        errorMessage = 'Network error: Unable to connect to payment server. Please make sure the backend server is running on port 3001.'
      } else if (error instanceof Error) {
        errorMessage = error.message
      }
      
      return {
        success: false,
        error: errorMessage
      }
    }
  }

  return {
    createPaymentLink
  }
}
