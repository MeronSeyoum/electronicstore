'use client'
import { useState, useEffect } from 'react';

const useRetrieveProductInCartItem = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductInCartItem = async () => {
      const sessionId = sessionStorage.getItem('shoppingSession') || null;

      try {
        const response = await fetch(`/api/cart/shoppingCartAPI?session_id=${sessionId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
           if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        const data = await response.json();
        setCarts(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProductInCartItem();

    // Clean-up function (optional)
    return () => {
      // Perform any clean-up if needed
    };
  }, []);

  return { carts, loading, error };
};

export default useRetrieveProductInCartItem;