 import React, { useEffect, useState } from "react";
 import { backend_url } from "../../config/url";

 const MyOrders = () => {
   const [orders, setOrders] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");

   useEffect(() => {
     const fetchOrders = async () => {
       try {
         const response = await fetch(`${backend_url}/api/admin/my-orders`, {
           method: "GET",
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
           },
         });

         if (!response.ok) {
           throw new Error("Failed to fetch orders. Please try again.");
         }

         const data = await response.json();
         setOrders(data.data || []);
       } catch (error) {
         setError(error.message);
       } finally {
         setLoading(false);
       }
     };

     fetchOrders();
   }, []);

   return (
     <div style={styles.container}>
       <h1 style={styles.heading}>My Orders</h1>
       {loading ? (
         <p>Loading your orders...</p>
       ) : error ? (
         <p style={styles.error}>{error}</p>
       ) : orders.length === 0 ? (
         <p>No orders found.</p>
       ) : (
         <div style={styles.orderList}>
           {orders.map((order) => (
             <div key={order._id} style={styles.orderCard}>
               <h3 style={styles.orderId}>Order ID: {order._id}</h3>
               <p style={styles.date}>
                 Ordered on: {new Date(order.createdAt).toLocaleDateString()}
               </p>
               <p style={styles.shippingAddress}>
                 Shipping Address: {order.shippingAddress}
               </p>
               <p style={styles.total}>
                 Total Amount: ₹{order.totalAmount.toFixed(2)}
               </p>
               <p style={styles.status}>Status: {order.status}</p>
               <p style={styles.paymentMethod}>
                 Payment Method: {order.paymentMethod}
               </p>

               <h4 style={styles.productsHeading}>Products:</h4>
               <ul style={styles.productList}>
                 {order.products.map((product, index) => (
                   <li key={index} style={styles.productItem}>
                     <div style={styles.productImageContainer}>
                       <img
                         src={product.product.image}
                         alt={product.product.name}
                         style={styles.productImage}
                       />
                     </div>
                     <div>
                       <p style={styles.productName}>{product.product.name}</p>
                       <p>Size: {product.size}</p>
                       <p>Quantity: {product.quantity}</p>
                       <p>Price: ₹{product.price.toFixed(2)}</p>
                     </div>
                   </li>
                 ))}
               </ul>
             </div>
           ))}
         </div>
       )}
     </div>
   );
 };

 const styles = {
   container: {
     padding: "20px",
     backgroundColor: "#f8f9fa",
     minHeight: "100vh",
   },
   heading: {
     fontSize: "28px",
     fontWeight: "bold",
     marginBottom: "20px",
     textAlign: "center",
   },
   error: {
     color: "red",
     textAlign: "center",
   },
   orderList: {
     display: "flex",
     flexDirection: "column",
     gap: "20px",
   },
   orderCard: {
     backgroundColor: "#fff",
     borderRadius: "8px",
     padding: "20px",
     boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
   },
   orderId: {
     fontWeight: "bold",
     fontSize: "18px",
     marginBottom: "10px",
   },
   date: {
     color: "#666",
     marginBottom: "10px",
   },
   shippingAddress: {
     marginBottom: "10px",
   },
   total: {
     fontWeight: "bold",
     marginBottom: "10px",
   },
   status: {
     marginBottom: "10px",
     color: "#007BFF",
   },
   paymentMethod: {
     marginBottom: "20px",
   },
   productsHeading: {
     fontWeight: "bold",
     marginBottom: "10px",
   },
   productList: {
     listStyle: "none",
     padding: 0,
   },
   productItem: {
     display: "flex",
     alignItems: "center",
     gap: "15px",
     marginBottom: "10px",
     borderBottom: "1px solid #ddd",
     paddingBottom: "10px",
   },
   productImageContainer: {
     width: "60px",
     height: "60px",
     overflow: "hidden",
     borderRadius: "8px",
     backgroundColor: "#f2f2f2",
   },
   productImage: {
     width: "100%",
     height: "100%",
     objectFit: "cover",
   },
   productName: {
     fontWeight: "bold",
   },
 };

 export default MyOrders;
