 import React, { useState, useEffect } from "react";
 import { useNavigate } from "react-router-dom";
 import axios from "axios";
 import { backend_url } from "../../config/url";
 import ProductCard from "../../components/ProductCard";

 const Cart = () => {
   const navigate = useNavigate();
   const [cartItems, setCartItems] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   // Fetch cart items from the API
   useEffect(() => {
     const fetchCartItems = async () => {
       try {
         const response = await axios.get(
           `${backend_url}/api/admin/getMyCart`,
           {
             headers: {
               Authorization: `Bearer ${localStorage.getItem("userToken")}`,
             },
           }
         );
         setCartItems(response.data.data);
       } catch (err) {
         setError("Failed to load cart items.");
       } finally {
         setLoading(false);
       }
     };

     fetchCartItems();
   }, []);

   // Calculate total price
   const calculateTotal = () =>
     cartItems.reduce(
       (total, item) => total + item.product.price * item.quantity,
       0
     );

   // Handle Remove Item
   const handleRemove = async (productId, size) => {
     try {
       const response = await axios.delete(
         `${backend_url}/api/admin/removeFromCart`,
         {
           headers: {
             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
           },
           data: {
             productId,
             size,
           },
         }
       );

       if (response.data.success) {
         setCartItems(
           cartItems.filter(
             (item) => !(item.product._id === productId && item.size === size)
           )
         );
       } else {
         console.error("Failed to remove item:", response.data.message);
       }
     } catch (err) {
       console.error("Error removing item:", err.message);
     }
   };

   return (
     <div style={styles.container}>
       <h2 style={styles.heading}>Your Cart</h2>
       {loading ? (
         <p style={styles.loading}>Loading...</p>
       ) : error ? (
         <p style={styles.error}>{error}</p>
       ) : cartItems.length === 0 ? (
         <div style={styles.emptyCart}>
           <p>Your cart is empty</p>
           <button
             onClick={() => navigate("/")}
             style={styles.continueShoppingButton}
           >
             Continue Shopping
           </button>
         </div>
       ) : (
         <div style={styles.cartContent}>
           <div style={styles.cartItems}>
             {cartItems.map((item) => (
               <div key={item._id || item.product._id} style={styles.cartItem}>
                 <ProductCard
                   key={item.product._id}
                   product={item.product}
                   showDetails
                 />
                 <div style={styles.itemInfo}>
                   <p style={styles.itemName}>{item.product.name}</p>
                   <p style={styles.itemPrice}>
                     Price: ₹{item.product.price.toFixed(2)}
                   </p>
                   <p style={styles.itemQuantity}>Quantity: {item.quantity}</p>
                   <p style={styles.itemSubtotal}>
                     Subtotal: ₹
                     {(item.product.price * item.quantity).toFixed(2)}
                   </p>
                   <button
                     onClick={() => handleRemove(item.product._id, item.size)}
                     style={styles.removeButton}
                   >
                     Remove
                   </button>
                 </div>
               </div>
             ))}
           </div>

           <div style={styles.cartSummary}>
             <h3>Order Summary</h3>
             <p>Total Items: {cartItems.length}</p>
             <p style={styles.totalAmount}>
               Total: ₹{calculateTotal().toFixed(2)}
             </p>
             <button
               onClick={() => navigate("/checkout")}
               style={styles.checkoutButton}
             >
               Proceed to Checkout
             </button>
             <button
               onClick={() => navigate("/")}
               style={styles.continueShoppingButton}
             >
               Continue Shopping
             </button>
           </div>
         </div>
       )}
     </div>
   );
 };

 // Styles remain the same as in the previous example.
 const styles = {
   container: {
     padding: "20px",
     maxWidth: "1200px",
     margin: "0 auto",
     fontFamily: "Arial, sans-serif",
   },
   heading: {
     textAlign: "center",
     marginBottom: "20px",
   },
   loading: {
     textAlign: "center",
   },
   error: {
     textAlign: "center",
     color: "red",
   },
   emptyCart: {
     textAlign: "center",
     marginTop: "50px",
   },
   continueShoppingButton: {
     marginTop: "10px",
     padding: "10px 20px",
     backgroundColor: "#007BFF",
     color: "#fff",
     border: "none",
     borderRadius: "5px",
     cursor: "pointer",
   },
   cartContent: {
     display: "flex",
     gap: "20px",
     flexWrap: "wrap",
   },
   cartItems: {
     flex: "2",
     display: "flex",
     flexDirection: "column",
     gap: "20px",
   },
   cartItem: {
     display: "flex",
     gap: "20px",
     padding: "20px",
     border: "1px solid #ddd",
     borderRadius: "8px",
     alignItems: "center",
   },
   itemInfo: {
     flex: "1",
   },
   itemName: {
     fontSize: "18px",
     fontWeight: "bold",
   },
   itemPrice: {
     color: "#555",
   },
   itemQuantity: {
     color: "#555",
   },
   itemSubtotal: {
     fontWeight: "bold",
   },
   removeButton: {
     marginTop: "10px",
     padding: "5px 10px",
     backgroundColor: "#FF4D4D",
     color: "#fff",
     border: "none",
     borderRadius: "5px",
     cursor: "pointer",
   },
   cartSummary: {
     flex: "1",
     padding: "20px",
     border: "1px solid #ddd",
     borderRadius: "8px",
     backgroundColor: "#f9f9f9",
   },
   totalAmount: {
     fontWeight: "bold",
     fontSize: "18px",
   },
   checkoutButton: {
     marginTop: "20px",
     padding: "10px 20px",
     backgroundColor: "#28A745",
     color: "#fff",
     border: "none",
     borderRadius: "5px",
     cursor: "pointer",
     width: "100%",
   },
 };

 export default Cart;
