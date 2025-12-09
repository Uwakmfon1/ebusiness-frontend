import { useContext, createContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cart from "./Cart";
import { useNavigate } from "react-router-dom";

export default function CheckoutCart() {
  const { id } = useParams();
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(user);

  const cartDetails = async function () {
    useEffect(() => {});
    const res = await axios.post(
      `http://localhost:8000/api/cart/${id}/checkout`,
      {
        cart_id: id,
        user_id: user?.id,
        shipping_address: "20 ata idung rd",
      }
    );
    const data = await res.json();
  };
  cartDetails();
  return (
    // <div>
    //   <Cart />
    // </div>
    <div className="h-full w-full grid grid-cols-[70%_30%] gap-4">
      <div className="border border-black">
        <div className="bg-white p-4 rounded">
          <h2>CUSTOMER DETAILS</h2>
          <hr />
          <p>Name: John Doe</p>
          <p>Address: 20 Ikpa Rd., Uyo</p>
        </div>

        <div className="bg-white p-4 rounded">
          {cart.map((item) => (
            <div key={item.id} style={{ marginBottom: 15 }}>
              <h2>DELIVERY DETAILS</h2>
              <hr />
              <div>
                <p>Pick Up Station</p>
                <p>Delivery between 18 December and 19 December</p>
              </div>
              <div className="border border-green mb-4">
                <h2>Pickup Station</h2>
                <p className="semibold">Ebusiness Pickup Station Uyo</p>
                <p className="">No. 21 Barracks Rd., Uyo</p>
              </div>
              <div>
                <h2>Shipment</h2>
                <p>Item: {item.name}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
        <div></div>
      </div>
      <div className="bg-gray-300 p-4">Right (30%)</div>
    </div>
    // <div>
    //   <h2>Your Cart</h2>

    //   {cart.length === 0 && <p>No items in the cart.</p>}

    //   {cart.map((item) => (
    //     <div key={item.id} style={{ marginBottom: 15 }}>
    //       <h3>{item.name}</h3>
    //       <p>Price: ₦{item.price}</p>
    //       <p>Quantity: {item.quantity}</p>

    //       <button onClick={() => removeFromCart(item.id)}>
    //         Remove
    //       </button>
    //     </div>
    //   ))}

    //   {cart.length > 0 && (
    //     <button onClick={clearCart}>
    //       Clear Cart
    //     </button>
    //   )}

    // </div>
  );
}
