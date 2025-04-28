import React from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const SubscriptionButton = ({ email, onError }) => {
  const handleSubscribe = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/stripe/create-checkout-session`, {
        email
      });

      // Redirect to Stripe Checkout
      const { sessionId } = response.data;
      const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
      await stripe.redirectToCheckout({
        sessionId
      });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      onError?.(error.message);
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Subscribe Now
    </button>
  );
};

export default SubscriptionButton; 