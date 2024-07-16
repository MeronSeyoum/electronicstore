import { createContext, useContext, useState, useEffect, useCallback } from "react";

// Create a context for the cart
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};

// CartProvider component to manage cart state and provide it to the rest of the app
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // State to hold the cart items
  const [userId, setUserId] = useState(3); // State to hold the user ID
  const [session_id, setSession_id] = useState(null); // State to hold the session ID
  const [initialCartFetched, setInitialCartFetched] = useState(false); // Flag to prevent multiple cart fetches

  /**
   * Function to create a new shopping session.
   * @param {number} userId - The ID of the user.
   * @returns {Promise<string|null>} - The session ID if created successfully, otherwise null.
   */
  const createShoppingSession = useCallback(async (userId) => {
    const total = 100; // Initial total amount for the shopping session

    try {
      const response = await fetch("/api/shoppingSession/createShoppingSession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, total }),
      });

      if (response.ok) {
        const data = await response.json();
        setSession_id(data.sessionId);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem("shoppingSession", data.sessionId); // Store session ID in session storage
        }
        return data.sessionId;
      } else {
        console.error("Failed to create shopping session:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error creating shopping session:", error);
      return null;
    }
  }, []);

  /**
   * Function to fetch the cart items for a given session ID.
   * @param {string} sessionId - The session ID.
   */
  const fetchCart = useCallback(async (sessionId) => {
    try {
      const response = await fetch(`/api/cart/shoppingCartAPI?session_id=${sessionId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCart(data); // Set the cart state with fetched data
      } else {
        console.error("Error fetching cart:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }, []);

  // Effect to set userId and session_id when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserData = localStorage.getItem("user");
      if (storedUserData) {
        try {
          const parsedUserData = JSON.parse(storedUserData);
          setUserId(parsedUserData.id);
        } catch (error) {
          console.error("Error parsing userData:", error);
        }
      }

      const storedSessionId = sessionStorage.getItem('shoppingSession');
      if (storedSessionId) {
        setSession_id(storedSessionId);
      }
    }
  }, []);

  // Effect to fetch the cart when session_id changes and initial cart has not been fetched yet
  useEffect(() => {
    if (session_id && !initialCartFetched) {
      fetchCart(session_id);
      setInitialCartFetched(true);
    }
  }, [session_id, fetchCart, initialCartFetched]);

  /**
   * Function to add a product to the cart.
   * @param {number} productId - The ID of the product to add.
   * @param {number} quantity - The quantity of the product to add.
   * @param {number} price - The price of the product to add.
   */
  const addToCart = async (productId, quantity, price) => {
    try {
      let currentSessionId = session_id;
      if (!currentSessionId) {
        currentSessionId = await createShoppingSession(userId);
        setSession_id(currentSessionId);
      }

      const response = await fetch("/api/cart/shoppingCartAPI", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session_id: currentSessionId, productId, quantity, price }),
      });

      if (response.ok) {
        const newCartItem = await response.json();
        fetchCart(currentSessionId);
        setCart((prevCart) => [...prevCart, newCartItem]); // Add new item to the cart
      } else {
        console.error("Error adding to cart:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  /**
   * Function to remove a product from the cart.
   * @param {number} cart_item_id - The ID of the product to remove from the cart.
   */
  const removeFromCart = async (cart_item_id) => {
    try {
      const response = await fetch(`/api/cart/shoppingCartAPI`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart_item_id }),
      });
      if (response.ok) {
        // Update the cart state after successful removal
        const updatedCart = cart.filter((item) => item.cart_item_id !== cart_item_id);
        setCart(updatedCart);
      } else {
        console.error("Error removing from cart:", response.statusText);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  /**
   * Function to update the quantity of a product in the cart.
   * @param {number} cart_item_id - The ID of the cart item to update.
   * @param {number} quantity - The new quantity.
   */
  const updateCartQuantity = async (cart_item_id, quantity) => {
    try {
      const response = await fetch(`/api/cart/shoppingCartAPI`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart_item_id, quantity }),
      });
      if (response.ok) {
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.cart_item_id === cart_item_id ? { ...item, quantity } : item
          )
        ); // Update the quantity of the item in the cart
      } else {
        console.error("Error updating cart quantity:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  };


  /**
   * Function to reset the session ID and cart.
   */
  const resetSession = () => {
    setSession_id(null);
    setCart([]);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('shoppingSession');
    }
  };


  // Calculate total price and quantity of the items in the cart
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Provide cart context to the children components
  return (
    <CartContext.Provider
      value={{
        cart,
        totalQuantity,
        totalPrice,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        fetchCart,
        resetSession,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
