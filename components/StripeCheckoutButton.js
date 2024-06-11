import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

const StripeCheckoutButton = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const response = await fetch('/api/checkout/', {
      method: 'POST',
    });

    if (response.ok) {
      const session = await response.json();
      const stripe = await loadStripe('YOUR_STRIPE_PUBLIC_KEY');
      stripe.redirectToCheckout({ sessionId: session.id });
    } else {
      console.error('Failed to initiate checkout:', response.statusText);
      setLoading(false);
    }
  };

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? 'Processing...' : 'Checkout'}
    </button>
  );
};

export default StripeCheckoutButton;
