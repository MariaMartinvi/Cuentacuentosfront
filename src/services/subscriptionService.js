import axios from 'axios';
import { getAuthHeader } from './authService';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

// Configure axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export const createCheckoutSession = async (email) => {
  try {
    console.log('Creating checkout session for email:', email);
    console.log('Using API URL:', API_URL);
    
    if (!email) {
      throw new Error('Email is required');
    }

    // Get auth header
    const authHeader = getAuthHeader();
    console.log('Auth header:', authHeader);

    const response = await axiosInstance.post('/api/stripe/create-checkout-session', {
      email
    }, {
      headers: {
        ...authHeader
      }
    });

    console.log('Server response:', response.data);

    if (!response.data) {
      throw new Error('Empty response from server');
    }

    // Check for both sessionId and id in the response
    const sessionId = response.data.sessionId || response.data.id;
    if (!sessionId) {
      console.error('Invalid response format:', response.data);
      throw new Error('Invalid response format: missing sessionId or id');
    }

    console.log('Checkout session created successfully:', sessionId);
    return { id: sessionId };
  } catch (error) {
    console.error('Error creating checkout session:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: `${API_URL}/api/stripe/create-checkout-session`,
      email: email,
      error: error
    });
    
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    } else if (error.response?.data?.details) {
      throw new Error(`${error.response.data.error}: ${error.response.data.details}`);
    } else if (!error.response) {
      throw new Error('Network error - Unable to connect to the server. Please check if the backend server is running.');
    } else {
      throw new Error(error.message || 'Error creating checkout session');
    }
  }
};

export const loadStripe = async () => {
  try {
    const stripe = await import('@stripe/stripe-js');
    const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
    
    if (!stripePublicKey) {
      throw new Error('Stripe public key is not configured');
    }

    console.log('Loading Stripe with public key:', stripePublicKey);
    const stripeInstance = await stripe.loadStripe(stripePublicKey);
    
    if (!stripeInstance) {
      throw new Error('Failed to initialize Stripe');
    }
    
    return stripeInstance;
  } catch (error) {
    console.error('Error loading Stripe:', error);
    throw new Error('Error loading Stripe: ' + error.message);
  }
};

export const redirectToCheckout = async (sessionId) => {
  try {
    console.log('Redirecting to checkout with session ID:', sessionId);
    const stripe = await loadStripe();
    
    const { error } = await stripe.redirectToCheckout({
      sessionId: sessionId
    });
    
    if (error) {
      console.error('Stripe redirect error:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in redirectToCheckout:', error);
    throw error;
  }
}; 