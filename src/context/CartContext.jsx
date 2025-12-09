import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();


export function CartProvider({ children }) {
  //load cart on first render
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // add to cart function
  const addToCart = async (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        console.log(existing);
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
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // update quantity of specific item
  const updateQuantity = (productId, newQuantity) => {
    console.log(CartContext);
    if(newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart => prevCart.map(item => item.id === productId ? {...item, quantity: newQuantity} : item));
    
    // try{
    //     axios.post(`http://localhost:8000/api/cart/${id}/update`,
    //         {
    //           'cart_item_id':id,
    //           'product_id':productId,
    //           'quantity':newQuantity,
    //         }
    //       )
    // }catch(error){
    //   console.log(error);
    // }
  }
  
  //increment quantity by 1
  const incrementQuantity = (productId) => {
    setCart(prevCart => prevCart.map(item=> item.id === productId ? {...item, quantity: item.quantity + 1} : item ))
  }

  //decrement quantity by 1
  const decrementQuantity = (productId) => {
    setCart(prevCart => prevCart.map(item=> item.id === productId ? {...item, quantity: item.quantity - 1} : item ))
  }

  //clear cart
  const clearCart = () => setCart([]);

  //calculate total items in cart
  const getCartTotalItems = ()=>{
    return cart.reduce((total,item) => total + item.quantity, 0);
  };

  //calculate total price
  const getCartTotalPrice = ()=>{
    return cart.reduce((total,item)=> total +(item.price * item.quantity),0);
  }

  // check if item is in cart
  const isInCart = (productId) =>{
    return cart.some(item =>item.id===productId);
  }
  
  //get quantity of specific item
  const getItemQuantity = (productId) => {
    const item =cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  } 

    const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    getCartTotalItems,
    getCartTotalPrice,
    isInCart,
    getItemQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
