import axios from 'axios';
import { loadStripe as loadStripeJs } from '@stripe/stripe-js';

// Determine the correct API URL based on environment
const isProduction = window.location.hostname !== 'localhost';
const API_URL = isProduction 
  ? 'https://backmielda.onrender.com'
  : 'http://localhost:5001';

// Configure axios defaults
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add auth token to requests
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Create a checkout session
export const createCheckoutSession = async (email) => {
  try {
    console.log('Creating checkout session for:', email);
    console.log('Using API URL:', API_URL);

    // IMPORTANT: Fix the endpoint path here - use /api/stripe/ instead of /api/subscription/
    const response = await axiosInstance.post('/api/stripe/create-checkout-session', {
      email
    });

    console.log('Checkout session created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating checkout session:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: `${API_URL}/api/stripe/create-checkout-session`,
      email: email,
      error: error
    });
    throw error;
  }
};

// Load Stripe
let stripePromise;
export const loadStripe = async () => {
  if (!stripePromise) {
    const publishableKey = isProduction
      ? 'pk_test_51Plm0fBiI8gG3OUxnzpg4BQF2Hcp9nVLGexD9wfDsXNzIUZTCvbVWD2cQwL6G1d0x27f29zYjmIz9WYDTHIzlPOQ00vUbsODXJ'
      : 'pk_test_51Plm0fBiI8gG3OUxnzpg4BQF2Hcp9nVLGexD9wfDsXNzIUZTCvbVWD2cQwL6G1d0x27f29zYjmIz9WYDTHIzlPOQ00vUbsODXJ';
    
    stripePromise = loadStripeJs(publishableKey);
  }
  return stripePromise;
};

// Verify subscription after successful payment
export const verifySubscription = async (sessionId) => {
  try {
    console.log('Verifying subscription with session ID:', sessionId);
    // Also update this endpoint if needed
    const response = await axiosInstance.get('/api/stripe/success', {
      params: { session_id: sessionId }
    });
    console.log('Subscription verification response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Subscription verification error:', error);
    throw error;
  }
};

// Other subscription-related functions
export const getSubscriptionStatus = async () => {
  try {
    const response = await axiosInstance.get('/api/stripe/subscription-status');
    return response.data;
  } catch (error) {
    console.error('Error getting subscription status:', error);
    throw error;
  }
};

export const cancelSubscription = async () => {
  try {
    const response = await axiosInstance.post('/api/stripe/cancel-subscription');
    return response.data;
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw error;
  }
};