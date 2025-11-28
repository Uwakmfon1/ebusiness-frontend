import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
const { id } = useParams(); 
const { cart, removeFromCart, clearCart } = useContext(CartContext);
const cartDetails = async function() {
    
    const res = await axios.get(`http://localhost:8000/api/cart/${id}`);
    const data = await res.json();
}
cartDetails();
  return (
    <div>
      <h2>Your Cart</h2>

      {cart.length === 0 && <p>No items in the cart.</p>}

      {cart.map((item) => (
        <div key={item.id} style={{ marginBottom: 15 }}>
          <h3>{item.name}</h3>
          <p>Price: ₦{item.price}</p>
          <p>Quantity: {item.quantity}</p>

          <button onClick={() => removeFromCart(item.id)}>
            Remove
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <button onClick={clearCart}>
          Clear Cart
        </button>
      )}
    </div>
  );
}
