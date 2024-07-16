// pages/thank-you.js

import Link from 'next/link';

const ThankYouPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-green-600">Thank You for Your Order!</h1>
      <p className="mt-4 text-lg text-gray-700">Your order has been successfully processed.</p>
      <p className="mt-2 text-gray-600">You will receive a confirmation email shortly.</p>
      <Link href="/" className="mt-6 px-4 py-2 bg-primary text-white rounded hover:bg-red-600 transition">
        Go to Homepage
      </Link>
    </div>
  );
};

export default ThankYouPage;
