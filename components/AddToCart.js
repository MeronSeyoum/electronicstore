/*
  AddToCart Component

  This component represents a button to add a product to the shopping cart.
  It utilizes the useShoppingCart hook to interact with the shopping cart functionality.

  Props:
  - isVisible: A boolean indicating whether the AddToCart button is visible or not.
  - productId: The ID of the product to be added to the cart.

  State:
  - isClicked: A boolean state to track whether the AddToCart button has been clicked.

  Dependencies:
  - React: Used for creating functional components and managing component state.
  - BsCart2: A React component representing the cart icon from the react-icons/bs library.
  - useShoppingCart: A custom hook for managing shopping cart functionality.

  Functions:
  - handleAddToCart: Event handler function called when the AddToCart button is clicked.
    It sets the isClicked state to true and invokes the addToCart function from useShoppingCart
    with the productId and a quantity of 1 as parameters.

  Returns:
  - A button component with the cart icon, which when clicked triggers the handleAddToCart function.

  Additional Notes:
  - The useShoppingCart hook is initialized with the isClicked state as a parameter to ensure
    that addToCart is only called when the button is clicked.
  - The button's visibility is controlled by the isVisible prop.
  - The component is styled with absolute positioning to appear at the bottom center of its container.
*/
import React, { useState } from "react";
import { BsCart3, BsCheck } from "react-icons/bs";
import { useCart } from "context/cartContext";

const AddToCart = ({ productId }) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addToCart(productId, 1);
      setIsAdded(true);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="justify-end">
      <button
        className="bg-primary text-white text-[13px] flex px-3 py-2 gap-2 rounded-md items-center"
        onClick={handleAddToCart}
        disabled={isAdding || isAdded}
      >
        {isAdding ? (
          <span className="spinner-border spinner-border-sm me-1"></span>
        ) : isAdded ? (
          <BsCheck className="text-base text-green-500" />
        ) : (
          <BsCart3 className="text-sm justify-between font-bold" />
        )}
        {isAdding ? "Adding..." : isAdded ? "Added" : "Add"}
      </button>
    </div>
  );
};

export default AddToCart;
