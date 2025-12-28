import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
// import { useCart } from '@/contexts/CartContext'; // or however you expose it
import { toast } from "sonner"; // or your toast library

export const CartContext = createContext();

export function CartProvider({ children }) {
  //load cart on first render
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [cartId, setCartId] = useState(() => {
    return localStorage.getItem("cartId") || null;
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // add to cart function
  const addToCart = async (product) => {
    console.log(product.category_id);
      try {
      await axios.post(`http://localhost:8000/api/cart/add`, {
          'product_id':product.id,
          'category_id':product.category_id,
          'quantity':product.quantity,
          'price':product.price,
          'subtotal':product.price * product.quantity
      });
    } catch (error) {
      console.log("Error adding to cart", error);
      return;
    }
    
  
    setCart((prev) => {
      // increase quantity
      const existing = cart.find((item) => item.id === product.id);
      if (existing) {
        console.log(existing);
        } else {
        // return [...prev, { ...product, quantity: 1 }];
        return prev.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
  }
  });


  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = async (productId, newQuantity) => {
    const oldQuantity = cart.find((item) => item.id === productId)?.quantity;
    // Optimistic update first (instant UI)
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });

    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    try {
      if (!cartId) {
        console.error("cartId is undefined!");
        return;
      }
      const token = localStorage.getItem("token");
      console.log(token);

      await axios.patch(
        `http://localhost:8000/api/cart/2/update`,
        {
          product_id: productId,
          quantity: newQuantity,
        },
        {
          // withCredentials: true, // if using Sanctum/Laravel session
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Cart updated");
    } catch (error) {
      // Revert optimistic update on failure
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: oldQuantity } // ✅ revert to old value
            : item
        )
      );

      toast.error(error.response?.data?.message || "Failed to update cart");
      console.error(error);
    }
  };

  //increment quantity by 1
  const incrementQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  //decrement quantity by 1
  const decrementQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  //clear cart
  const clearCart = () => setCart([]);

  //calculate total items in cart
  const getCartTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  //calculate total price
  const getCartTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // check if item is in cart
  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  //get quantity of specific item
  const getItemQuantity = (productId) => {
    const item = cart.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  const value = {
    cart,
    cartId,
    addToCart,
    removeFromCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    getCartTotalItems,
    getCartTotalPrice,
    isInCart,
    getItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
}

export const useCart = () => useContext(CartContext);
