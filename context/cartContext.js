/**
 * This code defines a React context and provider component for managing a shopping cart.
 * 
 * Features:
 * 1. **Cart Context**: A React Context is created to hold and manage cart state, allowing easy sharing of the cart
 *    data and related functionalities across components in the application.
 *
 * 2. **State Variables**:
 *    - `cart`: Stores the items in the cart.
 *    - `userId`: Stores the ID of the current user.
 *    - `sessionId`: Stores the ID of the current shopping session.
 *    - `initialCartFetched`: A flag to determine if the initial cart has been fetched from the server.
 *
 * 3. **Functions**:
 *    - `createShoppingSession`: Initializes a new shopping session on the server and saves the session ID in state
 *      and session storage.
 *    - `updateTotal`: Updates the total amount of the current shopping session on the server.
 *    - `fetchCart`: Fetches the current cart items from the server using the session ID.
 *    - `addToCart`: Adds a new item to the cart, creates a new session if necessary, and updates the cart state.
 *    - `removeFromCart`: Removes an item from the cart and updates the server and local state accordingly.
 *    - `updateCartQuantity`: Updates the quantity of a cart item and reflects the change on the server and locally.
 *    - `resetSession`: Clears the current session ID and cart, effectively resetting the cart.
 *
 * 4. **Effects**:
 *    - On component mount, the effect retrieves stored user data and session ID from local and session storage.
 *    - Another effect ensures the cart is fetched once when the session ID is available and the cart hasn't been
 *      fetched yet.
 *
 * 5. **Computed Values**:
 *    - `totalPrice`: Computes the total price of the items in the cart.
 *    - `totalQuantity`: Computes the total quantity of items in the cart.
 *
 * 6. **Cart Provider**: Wraps the application's children components with `CartContext.Provider` to expose cart
 *    management functions and state, enabling any component in the app to access and modify the cart.
 *
 * This context makes it easy to manage cart operations in a scalable and maintainable way, abstracting complex
 * state management logic away from the individual components that need to use the cart.
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

// Create a context for the cart
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => {
  return useContext(CartContext);
};

// CartProvider component to manage cart state and provide it to the rest of the app
export const CartProvider = ({ children }) => {
  // State variables to manage cart, user, session, and initial cart fetch status
  const [cart, setCart] = useState([]); // State to hold the cart items
  const [userId, setUserId] = useState(3); // State to hold the user ID
  const [session_id, setSession_id] = useState(null); // State to hold the session ID
  const [initialCartFetched, setInitialCartFetched] = useState(false); // Flag to prevent multiple cart fetches

 /**
   * Creates a new shopping session and stores the session ID in state and session storage.
   * @param {number} userId - The ID of the user.
   * @param {number} total - The initial total amount for the shopping session.
   * @returns {Promise<string|null>} - The session ID if created successfully, otherwise null.
   */
  const createShoppingSession = useCallback(async (userId, total) => {
    try {
      const response = await fetch(
        "/api/shoppingSession/createShoppingSession",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, total }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSession_id(data.sessionId);
        if (typeof window !== "undefined") {
          sessionStorage.setItem("shoppingSession", data.sessionId); // Store session ID in session storage
        }
        return data.sessionId;
      } else {
        console.error(
          "Failed to create shopping session:",
          response.statusText
        );
        return null;
      }
    } catch (error) {
      console.error("Error creating shopping session:", error);
      return null;
    }
  }, []);

 /**
   * Updates the total price amount of the shopping session.
   * @param {number} sessionId - The session ID of the current user.
   * @param {number} total - Total amount of the price.
   * @param {number} userId - The ID of the user.
   */
  const updateTotal = async (sessionId, total, userId) => {
    try {

      const response = await fetch(
        "/api/shoppingSession/UpdateShoppingSession",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId, total ,userId}),
        }
      );

      if (!response.ok) {
        console.error("Failed to update total:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating total:", error);
    }
  };

  /**
   * Fetches the cart items for a given session ID.
   * @param {string} sessionId - The session ID.
   */
  const fetchCart = useCallback(async (sessionId) => {
    try {
      const response = await fetch(
        `/api/cart/shoppingCartAPI?session_id=${sessionId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
    if (typeof window !== "undefined") {
      const storedUserData = localStorage.getItem("user");
      if (storedUserData) {
        try {
          const parsedUserData = JSON.parse(storedUserData);
          setUserId(parsedUserData.id);
        } catch (error) {
          console.error("Error parsing userData:", error);
        }
      }

      const storedSessionId = sessionStorage.getItem("shoppingSession");
      if (storedSessionId) {
        setSession_id(storedSessionId);
      }
    }
  }, [userId, session_id]);

  // Effect to fetch the cart when session_id changes and initial cart has not been fetched yet
  useEffect(() => {
    if (session_id && !initialCartFetched) {
      fetchCart(session_id);
      setInitialCartFetched(true);
    }
  }, [session_id, fetchCart, initialCartFetched]);

 /**
   * Adds a product to the cart and calls to create shopping session if the session id doesn't exist  .
   * @param {number} productId - The ID of the product to add.
   * @param {number} quantity - The quantity of the product to add.
   * @param {number} price - The price of the product to add.
   */
  const addToCart = async (productId, quantity, price) => {
    try {
      let currentSessionId = session_id;
      if (!currentSessionId) {
        const total = price * quantity;
        currentSessionId = await createShoppingSession(userId, total);
        setSession_id(currentSessionId);
      } else {
        // Calculate total amount by summing up all item prices in the cart
        const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const totalAmount = cartTotal + price * quantity;
        await updateTotal(currentSessionId, parseFloat(totalAmount), userId);
       
       
      }
  
      const response = await fetch("/api/cart/shoppingCartAPI", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: currentSessionId,
          productId,
          quantity,
          price,
        }),
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
        const updatedCart = cart.filter(
          (item) => item.cart_item_id !== cart_item_id
        );
        setCart(updatedCart);

        // Calculate the new total
      const newTotal = updatedCart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      // Update the total in the shopping session
      if (session_id) {
        await updateTotal(session_id, newTotal, userId);
      }

      } else {
        console.error("Error removing from cart:", response.statusText);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

 /**
   * Updates the quantity of a product in the cart.
   * @param {number} cartItemId - The ID of the cart item to update.
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
        
         // Calculate the new total
      const updatedCart = cart.map((item) =>
        item.cart_item_id === cart_item_id ? { ...item, quantity } : item
      );

      const newTotal = updatedCart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      // Update the total in the shopping session
      if (session_id) {
        await updateTotal(session_id, newTotal, userId);
      }

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
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("shoppingSession");
    }
  };

  // Calculate total price and quantity of the items in the cart
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
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
