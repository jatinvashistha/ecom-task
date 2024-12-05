// src/pages/Checkout/Checkout.js
import React, { useState, useEffect } from "react";
import axios from "axios";

import { buyFromCart } from "../../services/api"; // Import the API function to place the order
import { backend_url } from "../../config/url";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [shippingDetails, setShippingDetails] = useState({
    shippingAddress: "", // Single field for shipping address
  });

  const [paymentMethod, setPaymentMethod] = useState("COD"); // Default to COD
  const [showModal, setShowModal] = useState(false); // To control the modal visibility



  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails({ ...shippingDetails, [name]: value });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Fetch cart items on component mount
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${backend_url}/api/admin/getMyCart`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });

        setCartItems(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load cart items.");
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [backend_url]);

  // Handle form submission (checkout action)
  const handleCheckout = async () => {
    if (!shippingDetails.shippingAddress) {
      alert("Please fill in all shipping details.");
      return;
    }

    try {
      const response = await buyFromCart(
        shippingDetails.shippingAddress,
        paymentMethod
      );
      alert("Order successfully placed!");

      // Show the modal with the confirmation message
      setShowModal(true);

      // Set a timeout to navigate to the homepage after the modal closes
      setTimeout(() => {
        window.location.href = "/"; // Redirect to the home page after a short delay
      }, 3000);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong, please try again."
      );
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Checkout</h2>

      {/* Cart items section */}
      <div style={styles.cartSummary}>
        <h3>Your Cart</h3>
        {loading ? (
          <p>Loading cart items...</p>
        ) : error ? (
          <p>{error}</p>
        ) : cartItems.length === 0 ? (
          <p>Your cart is empty. Add items to your cart to proceed.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item._id} style={styles.cartItem}>
              <p>{item.product.name}</p>
              <p>Size: {item.size}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ₹{item.price}</p>
            </div>
          ))
        )}
        {cartItems.length > 0 && (
          <p style={styles.totalPrice}>Total: ₹{calculateTotal()}</p>
        )}
      </div>

      {/* Shipping Details Form */}
      <div style={styles.formContainer}>
        <h3>Shipping Details</h3>
        <input
          type="text"
          name="shippingAddress"
          value={shippingDetails.shippingAddress}
          onChange={handleChange}
          placeholder="Enter your shipping address"
          style={styles.input}
        />
      </div>

      {/* Payment Method Selection */}
      <div style={styles.paymentMethodContainer}>
        <h3>Payment Method</h3>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={handlePaymentMethodChange}
          />
          Cash on Delivery (COD)
        </label>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="Online"
            checked={paymentMethod === "Online"}
            onChange={handlePaymentMethodChange}
          />
          Online Payment
        </label>
      </div>

      {/* Checkout Button */}
      <div style={styles.buttons}>
        <button style={styles.checkoutButton} onClick={handleCheckout}>
          Confirm and Pay
        </button>
      </div>

      {/* Modal for Order Confirmation */}
      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Thanks for Shopping!</h3>
            <p>Your order will be delivered in 2 days.</p>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f8f8f8",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    fontSize: "32px",
    marginBottom: "20px",
    color: "#333",
  },
  cartSummary: {
    width: "80%",
    maxWidth: "800px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  },
  cartItem: {
    marginBottom: "10px",
    fontSize: "16px",
  },
  totalPrice: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#007BFF",
    marginTop: "20px",
  },
  formContainer: {
    width: "80%",
    maxWidth: "800px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  paymentMethodContainer: {
    width: "80%",
    maxWidth: "800px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  },
  buttons: {
    width: "80%",
    maxWidth: "800px",
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
  },
  checkoutButton: {
    padding: "12px 20px",
    fontSize: "18px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  modal: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
};

export default Checkout;
