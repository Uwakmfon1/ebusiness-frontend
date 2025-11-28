import { createContext, useState } from "react";
import axios from "axios";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // add to cart function
  const addToCart = async (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
        console.log(existing);
      if (existing) {
        // increase quantity
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
    console.log(product);
    // console.log(item.quantity);
    // try {
    //   const token = localStorage.getItem("token");
    //   await axios.post("http://localhost:8000/api/cart/add", {
    //     product_id:product.id,
    //     category_id:product.category.id,
    //     // quantity:this.quantity+1,
    //     price:product.price,
    //     // subtotal:product 
    //   });
    // } catch (err) {}
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);