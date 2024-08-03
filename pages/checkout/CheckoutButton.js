import { useCart } from "context/cartContext";
import { useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { useRouter } from "next/router";
import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import stripeImage from "images/stripe.png";
import ssl from "images/ssl.svg";
import Link from "next/link";

const CheckoutButton = ({ sessionId, total }) => {
  const { resetSession } = useCart();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout/ProcessCheckout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: sessionId,
          paymentMethod: "credit_card",
          paymentStatus: "completed",
          transactionId: "txn_123456",
          carrierId: 1,
          shipmentIcon: "/shipment_icon.png",
          shipmentTitle: "Standard Shipping",
          shipmentDescription: "Delivery within 5-7 business days",
          total,
        }),
      });

      const result = await response.json();

      if (response.ok && result.clearSession) {
        resetSession();
        router.push("/checkout/thank-you");
      } else {
        throw new Error("Failed to create order");
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-6 ">
      <ButtonPrimary
        className="mt-4 w-full"
        onClick={handleCheckout}
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay now"}
      </ButtonPrimary>
      {error && <div id="error-message" className="mt-2 text-red-600">{error}</div>}

      <div className="mt-5">
        <h5 className="text-lg font-semibold">Your payment is protected by</h5>
        <div className="flex items-center mt-2 gap-8">
          <Image src={ssl} alt="SSL secure" width={90} height={20} />
          <Image src={stripeImage} alt="Stripe secure" width={65} height={20} className="mt-1"/>
        </div>

        <div className="mt-4 space-y-2">
          <p className="flex items-center">
            <FaCheck className="text-green-600 mr-2" /> SSL Secure / 256-bit SSL secure checkout
          </p>
          <p className="flex items-center">
            <FaCheck className="text-green-600 mr-2" /> Cancel Anytime
          </p>
          <p className="flex items-center">
            <FaCheck className="text-green-600 mr-2" /> 7-day money back guarantee
          </p>
        </div>
        
        <small className="block text-gray-400 mt-5">
          By clicking `Pay Now` you agree to electronic store {" "}
          <a href="/tos" target="_blank" className="text-primary">
            Terms and Conditions
          </a>{" "}
          and{" "}
          <Link href="/privacy" target="_blank" className="text-primary">
            Privacy Policy
          </Link>
        
        </small>
      </div>
    </div>
  );
};

export default CheckoutButton;
