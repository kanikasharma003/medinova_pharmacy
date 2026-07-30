import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMinus, FaPlus, FaTrash, FaShoppingBag, FaCheckCircle } from "react-icons/fa";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import "./Cart.css";

export default function Cart() {
  const { items, increaseQty, decreaseQty, removeFromCart, clearCart, subtotal, deliveryCharge, total, freeDeliveryThreshold } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    setPlaced(true);
    clearCart();
  };

  if (placed) {
    return (
      <div className="container cart-success">
        <FaCheckCircle />
        <h2>Order placed successfully!</h2>
        <p>Thank you for shopping with MediNova. A confirmation has been sent to your email.</p>
        <Link to="/medicines" className="btn btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container empty-state">
        <FaShoppingBag />
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added any products yet.</p>
        <Link to="/medicines" className="btn btn-primary" style={{ marginTop: "20px" }}>
          Browse Medicines
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <h1 className="section-title">Your Cart</h1>

      <div className="cart-page__grid">
        <div className="cart-page__items">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <Link to={`/product/${item.id}`} className="cart-item__image">
                <img src={item.image} alt={item.name} />
              </Link>

              <div className="cart-item__info">
                <Link to={`/product/${item.id}`}>{item.name}</Link>
                <p>₹{item.price} each</p>
              </div>

              <div className="cart-item__qty">
                <button onClick={() => decreaseQty(item.id)} aria-label="Decrease quantity">
                  <FaMinus />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQty(item.id)} aria-label="Increase quantity">
                  <FaPlus />
                </button>
              </div>

              <div className="cart-item__total">₹{item.price * item.quantity}</div>

              <button className="cart-item__remove" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                <FaTrash />
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="cart-summary__row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="cart-summary__row">
            <span>Delivery Charge</span>
            <span>{deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}</span>
          </div>
          {deliveryCharge > 0 && (
            <p className="cart-summary__note">
              Add ₹{freeDeliveryThreshold - subtotal} more to get free delivery.
            </p>
          )}
          <div className="cart-summary__row cart-summary__row--total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
          <button className="btn btn-primary btn-block" onClick={handleCheckout}>
            {isAuthenticated ? "Checkout" : "Login to Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
}
