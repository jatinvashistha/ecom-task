 import React, { useEffect, useState } from "react";
 import { useParams, useNavigate } from "react-router-dom";
 import { fetchProductById } from "../../services/api";
 import axios from "axios";
 import { backend_url } from "../../config/url";
import CheckoutSingle from "../CheckoutSingle/CheckoutSingle";

 const ProductDetails = () => {
   const { productId } = useParams();
   const navigate = useNavigate();

   const [product, setProduct] = useState(null);
   const [selectedSize, setSelectedSize] = useState("");
   const [quantity, setQuantity] = useState(1);
   const [maxQuantity, setMaxQuantity] = useState(0);
   const [loading, setLoading] = useState(true);
   const [showModal, setShowModal] = useState(false); // Modal state

   useEffect(() => {
     if (!productId) {
       console.error("No product ID found!");
       return;
     }

     setLoading(true);
     fetchProductById(productId)
       .then((data) => {
         setProduct(data);
         setLoading(false);
       })
       .catch((error) => {
         console.error("Error fetching product:", error);
         setLoading(false);
       });
   }, [productId]);

   const handleSizeChange = (e) => {
     setSelectedSize(e.target.value);
     const selectedSizeOption = product.sizes.find(
       (size) => size.size === e.target.value
     );
     if (selectedSizeOption) {
       setMaxQuantity(selectedSizeOption.quantity);
       setQuantity(1);
     }
   };

   const handleQuantityChange = (e) => {
     const newQuantity = Math.min(Math.max(1, e.target.value), maxQuantity);
     setQuantity(newQuantity);
   };
   // Add product to cart
   const addToCart = async (productId, quantity, size, token) => {
     try {
       const response = await axios.post(
         `${backend_url}/api/admin/addToCart`,
         { productId, quantity, size },
         {
           headers: {
             Authorization: `Bearer ${token}`,
             "Content-Type": "application/json",
           },
         }
       );

       if (response.data && response.data.success) {
         alert("Added to cart successfully");
         return response.data;
       } else {
         throw new Error(response.data?.message || "Failed to add to cart");
       }
     } catch (error) {
       console.error("Error adding to cart:", error);
       return {
         success: false,
         message: error.message || "Failed to add to cart",
       };
     }
   };

   // Handle Add to Cart button click
   const handleAddToCart = async () => {
     const token = localStorage.getItem("userToken");
     if (!token) {
       alert("Please login to add items to your cart");
       navigate("/login");
       return;
     }

     if (!selectedSize) {
       alert("Please select a size before adding to the cart");
       return;
     }

     if (quantity > maxQuantity) {
       alert(
         `Not enough stock for size "${selectedSize}". Available: ${maxQuantity}`
       );
       return;
     }

     const response = await addToCart(productId, quantity, selectedSize, token);
     if (response.success) {
       alert("Product added to cart!");
       navigate("/cart");
     } else {
       alert(response.message || "Failed to add to cart");
     }
   };

   const handleBuyNow = () => {
     if (!selectedSize) {
       alert("Please select a size before proceeding to checkout");
       return;
     }
     if (quantity > maxQuantity) {
       alert(
         `Not enough stock for size "${selectedSize}". Available: ${maxQuantity}`
       );
       return;
     }
     setShowModal(true); // Show the modal
   };

   const closeModal = () => setShowModal(false); // Close the modal

   if (loading) return <p>Loading...</p>;
   if (!product) return <p>Product not found</p>;

   return (
     <div style={styles.container}>
       <div style={styles.card}>
         <img src={product.image} alt={product.name} style={styles.image} />
         <div style={styles.details}>
           <h1 style={styles.productName}>{product.name}</h1>
           <p style={styles.description}>{product.description}</p>
           <p style={styles.price}>₹{product.price}</p>

           <div style={styles.sizeSelection}>
             <h3>Select Size:</h3>
             <select
               value={selectedSize}
               onChange={handleSizeChange}
               style={styles.select}
             >
               <option value="">Select a size</option>
               {product.sizes.map((size) => (
                 <option
                   key={size._id}
                   value={size.size}
                   disabled={size.quantity === 0}
                 >
                   {size.size} {size.quantity === 0 && "(Out of stock)"}
                 </option>
               ))}
             </select>
           </div>

           <div style={styles.quantitySelection}>
             <h3>Quantity:</h3>
             <input
               type="number"
               value={quantity}
               min="1"
               max={maxQuantity}
               onChange={handleQuantityChange}
               style={styles.input}
               disabled={maxQuantity === 0}
             />
             <p>Available: {maxQuantity}</p>
           </div>

           <div style={styles.buttons}>
             <button
               style={styles.button}
               onClick={handleAddToCart}
               disabled={maxQuantity === 0}
             >
               Add to Cart
             </button>

             <button
               style={styles.button}
               onClick={handleBuyNow}
               disabled={maxQuantity === 0}
             >
               Buy Now
             </button>
           </div>
         </div>
       </div>

       {/* Modal */}
       {showModal && (
         <div style={styles.modalOverlay}>
           <div style={styles.modal}>
             <div style={styles.modal}>
               <h2>Confirm Your Order</h2>
               <CheckoutSingle
                 product={product}
                 quantity={quantity}
                 size={selectedSize}
               />
             </div>
             <div style={styles.modalButtons}>
               <button style={styles.button} onClick={closeModal}>
                 Close
               </button>
             </div>
           </div>
         </div>
       )}
     </div>
   );
 };

 const styles = {
   // Add existing styles here...
   container: {
     padding: "20px",
     backgroundColor: "#f4f4f4",
     minHeight: "100vh",
   },
   card: {
     backgroundColor: "#fff",
     borderRadius: "10px",
     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
     overflow: "hidden",
     display: "flex",
     maxWidth: "900px",
     margin: "auto",
     padding: "20px",
   },
   image: {
     width: "50%",
     objectFit: "contain",
     borderRadius: "10px",
   },
   details: {
     marginLeft: "20px",
     width: "50%",
   },
   productName: {
     fontSize: "24px",
     fontWeight: "bold",
     marginBottom: "10px",
   },
   description: {
     fontSize: "16px",
     color: "#555",
     marginBottom: "20px",
   },
   price: {
     fontSize: "20px",
     fontWeight: "bold",
     color: "#007BFF",
     marginBottom: "20px",
   },
   rating: {
     fontSize: "18px",
     marginBottom: "20px",
   },
   sizeSelection: {
     marginBottom: "20px",
   },
   select: {
     padding: "10px",
     fontSize: "16px",
     width: "100%",
     borderRadius: "5px",
     border: "1px solid #ccc",
   },
   quantitySelection: {
     marginBottom: "20px",
   },
   input: {
     padding: "10px",
     fontSize: "16px",
     width: "60px",
     borderRadius: "5px",
     border: "1px solid #ccc",
   },
   buttons: {
     marginTop: "30px",
   },
   button: {
     padding: "12px 20px",
     marginRight: "10px",
     fontSize: "16px",
     backgroundColor: "#007BFF",
     color: "#fff",
     border: "none",
     borderRadius: "5px",
     cursor: "pointer",
     transition: "background-color 0.3s",
   },
   modalOverlay: {
     position: "fixed",
     top: 0,
     left: 0,
     width: "100%",
     height: "100%",
     backgroundColor: "rgba(0, 0, 0, 0.5)",
     display: "flex",
     justifyContent: "center",
     alignItems: "center",
     zIndex: 1000,
   },
   modal: {
     backgroundColor: "#fff",
     padding: "20px",
     borderRadius: "10px",
     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
     textAlign: "center",
     width: "90%",
     maxWidth: "400px",
   },
   modalButtons: {
     marginTop: "20px",
     display: "flex",
     justifyContent: "space-around",
   },
 };

 export default ProductDetails;
