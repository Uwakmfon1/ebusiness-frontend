import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const cartDetails = async function () {
    const res = await axios.get(`http://localhost:8000/api/cart/${id}`);
    const data = await res.json();
  };
  console.log(cart);
  cartDetails();
  return (
    <div>
      <div>
        <button
          onClick={() => navigate(-1)}
          className="bg-brown-500 text-black text-2xl font-bold px-4 py-2 rounded-lg hover:bg-brown-600"
        >
          Go Back
        </button>
      </div>
      <h2>Your Cart</h2>

      {cart.length === 0 && <p>No items in the cart.</p>}

      {cart.map((item) => (
        <div key={item.id} style={{ marginBottom: 15 }}>
          <h3>{item.name}</h3>
          <p>Price: ₦{item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <p></p>

          <div>

          {/* <button onClick={() => checkoutCart())}>Checkout Cart</button> */}
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        </div>
      ))}

      {cart.length > 0 && <button onClick={clearCart}>Clear Cart</button>}
    </div>
  );
}
