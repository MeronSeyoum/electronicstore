import { useCart } from 'context/cartContext';
import { useState } from 'react';
import ButtonPrimary from 'shared/Button/ButtonPrimary';
import { useRouter } from 'next/router';

const CheckoutButton = ({ sessionId, total }) => {
  const { resetSession } = useCart();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout/ProcessCheckout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          paymentMethod: 'credit_card',
          paymentStatus: 'completed',
          transactionId: 'txn_123456',
          carrierId: 1,
          shipmentIcon: 'shipment_icon.png',
          shipmentTitle: 'Standard Shipping',
          shipmentDescription: 'Delivery within 5-7 business days',
          total: total,
        }),
      });

      const result = await response.json();

      if (response.ok && result.clearSession) {
        resetSession();
        // Redirect to the Thank You page
        router.push('/checkout/thank-you');
      } else {
        throw new Error('Failed to create order');
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ButtonPrimary className="mt-8 w-full" onClick={handleCheckout} disabled={loading}>
      {loading ? 'Processing...' : 'Confirm Payment'}
    </ButtonPrimary>
  );
};

export default CheckoutButton;
