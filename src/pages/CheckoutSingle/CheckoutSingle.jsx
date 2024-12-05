import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { backend_url } from "../../config/url";

const CheckoutSingle = ({ product, quantity, size }) => {
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [shippingDetails, setShippingDetails] = useState({ shippingAddress: "" });
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [showModal, setShowModal] = useState(false);
    const [checkoutLoading, setCheckoutLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShippingDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleCheckout = async () => {
        if (!shippingDetails.shippingAddress.trim()) {
            alert("Please enter a valid shipping address.");
            return;
        }

        setCheckoutLoading(true);
        try {
            const orderDetails = {
                productId: product._id,
                quantity,
                size: product?.size || "XL",
                shippingAddress: shippingDetails.shippingAddress,
                paymentMethod,
            };
            await axios.post(`${backend_url}/api/admin/buy-now`, orderDetails, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            });
            setShowModal(true);
        } catch (err) {
            setError("Checkout failed. Please try again.");
        } finally {
            setCheckoutLoading(false);
        }
    };

    const closeModal = () => setShowModal(false);

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Checkout</h2>
            <div style={styles.checkoutContainer}>
                {product ? (
                    <div style={styles.productDetails}>
                        <img src={product.image} alt={product.name || "Product"} style={styles.productImage} />
                        <div style={styles.productInfo}>
                            <h3>{product.name || "Unnamed Product"}</h3>
                            <p>Size: {size || "N/A"}</p>
                            <p>Quantity: {quantity || "N/A"}</p>

                            <p>Price: ₹{product.price || "N/A"}</p>
                        </div>
                    </div>
                ) : (
                    <p style={styles.error}>Product details not available.</p>
                )}
            </div>

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

            <div style={styles.paymentContainer}>
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

            <div style={styles.buttons}>
                <button
                    style={styles.checkoutButton}
                    onClick={handleCheckout}
                    disabled={checkoutLoading}
                >
                    {checkoutLoading ? "Processing..." : "Confirm and Pay"}
                </button>
            </div>

            {showModal && (
                <div style={styles.modal} role="dialog" aria-labelledby="modal-title" aria-modal="true">
                    <div style={styles.modalContent}>
                        <h3 id="modal-title">Thanks for Shopping!</h3>
                        <p>Your order will be delivered in 2 days.</p>
                        <button style={styles.closeModalButton} onClick={closeModal}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            {error && <p style={styles.error}>{error}</p>}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "'Arial', sans-serif",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
    heading: {
        textAlign: "center",
        color: "#333",
    },
    checkoutContainer: {
        margin: "20px 0",
    },
    productDetails: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    productImage: {
        width: "80px",
        height: "80px",
        objectFit: "cover",
        borderRadius: "5px",
    },
    productInfo: {
        flex: 1,
    },
    formContainer: {
        margin: "20px 0",
    },
    input: {
        width: "100%",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        marginTop: "10px",
    },
    paymentContainer: {
        margin: "20px 0",
    },
    buttons: {
        textAlign: "center",
        marginTop: "20px",
    },
    checkoutButton: {
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
    },
    modal: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
    },
    modalContent: {
        textAlign: "center",
    },
    closeModalButton: {
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer",
    },
    error: {
        color: "red",
        textAlign: "center",
    },
};

export default CheckoutSingle;
