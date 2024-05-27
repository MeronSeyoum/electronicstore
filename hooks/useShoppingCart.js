/**
 * useShoppingCart Hook
 *
 * This hook manages the state and behavior of a shopping cart in an e-commerce application.
 * It handles adding products to the cart, managing user sessions, and interacting with the backend API.
 *
 * State Variables:
 * - cart: An array storing the items in the shopping cart.
 * - userData: An object representing the user data retrieved from localStorage.
 * - userId: A number representing the ID of the logged-in user or 0 for guest users.
 *
 * Effect Hook:
 * - Sets the user data and user ID from localStorage on component mount.
 *
 * Functions:
 * - getSessionId: Retrieves the shopping session ID from session storage.
 * - createShoppingSession: Creates a new shopping session for a user if it doesn't exist.
 *   - Parameters: userId (number) - The ID of the user.
 * - addToCart: Adds a product to the shopping cart.
 *   - Parameters: productId (number) - The ID of the product to add.
 *                quantity (number) - The quantity of the product to add.
 *
 * The hook ensures that a shopping session is created if it doesn't exist and associates the cart
 * items with the appropriate session. It also provides error handling for various operations.
 *
 * Usage:
 * Import and use the `useShoppingCart` hook in your component to manage the shopping cart state
 * and add items to the cart.
 *
 * Example:
 * const { cart, addToCart } = useShoppingCart();
 * addToCart(1, 1); // Adds product with ID 1 and quantity 1 to the cart.
 */

import { useState, useEffect } from "react";
// Custom hook for managing shopping cart functionality

const useShoppingCart = () => {
  const [cart, setCart] = useState();
  const [userData, setUserData] = useState(null); // State for storing user data
  const [userId, setUserId] = useState(0); // State for storing the user ID

  // Effect hook to set user data and user ID from localStorage on component mount
  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
        setUserId(parsedUserData.id);
      } catch (error) {
        console.error("Error parsing userData:", error);
      }
    }
  }, []);

  // Retrieve shopping session ID from session storage
  const getSessionId = () => sessionStorage.getItem("shoppingSession") || 0;

  /**
   * Function to create a new shopping session if it does not exist already
   * @param {number} userId - The ID of the user
   */
  const createShoppingSession = async (userId) => {
    const total = 200; // Total amount for the shopping session
    try {
      // Make a POST request to create a new shopping session
      const response = await fetch(
        "/api/shoppingSession/createShoppingSession",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, total }), // Include user ID and total amount in request body
        }
      );

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem("shoppingSession", data.sessionId); // Save the shopping session ID to session storage
        console.log("Created shopping session for user:", userId);
      } else {
        console.error(
          "Failed to create shopping session:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error creating shopping session:", error);
    }
  };

  /**
   * Function to add a product to the shopping cart
   * @param {number} productId - The ID of the product to add
   * @param {number} quantity - The quantity of the product to add
   */
  const addToCart = async (productId, quantity, price) => {
    // Include price parameter
    try {
      const userSessionId = userId || 3;

      if (!sessionStorage.getItem("shoppingSession")) {
        await createShoppingSession(userSessionId);
      }

      const session_id = getSessionId();

      const response = await fetch("/api/cart/addProductToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session_id, productId, quantity }),
      });

      if (response.ok) {
        const data = await response.json();
       setCart(data) ;
         console.log()
      } else {
        console.error("Error adding to cart:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Return cart items, total price, total quantity, and addToCart function
  return {
    cart,
    addToCart,
  };
};

export default useShoppingCart; // Export the useShoppingCart hook
