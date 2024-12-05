// src/components/OrderSummary.js
import React from "react";

const OrderSummary = ({ cartItems }) => {
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div style={styles.summary}>
      <h3>Order Summary</h3>
      <p>Total Items: {cartItems.length}</p>
      <p>Total Price: ${total.toFixed(2)}</p>
      <button style={styles.checkoutButton}>Proceed to Checkout</button>
    </div>
  );
};

const styles = {
  summary: {
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  checkoutButton: {
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default OrderSummary;
