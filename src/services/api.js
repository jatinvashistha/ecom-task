// src/services/api.js

const API_URL = "https://ecom-backend-one-red.vercel.app/api"; // Replace with your backend API URL

// Fetch all products
 export const fetchProducts = async () => {
   try {
     const response = await fetch(`${API_URL}/admin/getAllProducts`);
     if (!response.ok) {
       throw new Error("Failed to fetch products");
     }
     const data = await response.json();
     return data.data; // Returning the data array directly
   } catch (error) {
     console.error(error);
     throw error;
   }
 };

 // Fetch product details by ID
 export const fetchProductById = async (id) => {
   try {
     const response = await fetch(`${API_URL}/admin/getSingleProduct/${id}`);
     if (!response.ok) {
       throw new Error("Failed to fetch product details");
     }
     const data = await response.json();
     return data.data; // Return the product data
   } catch (error) {
     console.error("Error in fetchProductById:", error);
     throw error;
   }
 };


 export const registerUser = async (name, email, password, role) => {
   try {
     const response = await fetch(`${API_URL}/auth/register`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ name, email, password, role }),
     });

     const data = await response.json();
     if (!response.ok) {
       throw new Error(data.message || "Failed to register");
     }
     return data; // On success, return the data
   } catch (error) {
     throw new Error(error.message);
   }
 };

 // Login a user
 export const loginUser = async (email, password) => {
   try {
     const response = await fetch(`${API_URL}/auth/login`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ email, password }),
     });

     const data = await response.json();
     if (!response.ok) {
       throw new Error(data.message || "Failed to login");
     }
     return data; // On success, return the data
   } catch (error) {
     throw new Error(error.message);
   }
 };
// Create an order
export const createOrder = async (orderData, token) => {
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      throw new Error("Failed to create order");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Fetch user's previous orders
export const fetchUserOrders = async (token) => {
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



 export const addToCartAPI = async (productId, quantity, size) => {
   try {
     const response = await fetch(`${API_URL}/admin/addToCart`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${localStorage.getItem("token")}`, // Attach the token for authenticated requests
       },
       body: JSON.stringify({ productId, quantity, size }),
     });

     const data = await response.json();
     if (!response.ok) {
       throw new Error(data.message || "Failed to add product to cart");
     }
     return data; // Return the cart item data on success
   } catch (error) {
     throw new Error(error.message);
   }
 };

// Remove product from cart
export const removeFromCart = async (productId, size) => {
  try {
    const response = await fetch(`${API_URL}/admin/removeFromCart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ productId, size }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to remove product from cart");
    }
    return data; // Return success message on successful removal
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get all cart items
export const getCartItems = async () => {
  try {
    const response = await fetch(`${API_URL}/admin/getMyCart`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch cart items");
    }
    return data.data; // Return cart items data
  } catch (error) {
    throw new Error(error.message);
  }
};

export const buyFromCart = async (shippingAddress, paymentMethod) => {
  try {
    const response = await fetch(`${API_URL}/admin/buy-from-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`, // Attach the token for authenticated requests
      },
      body: JSON.stringify({ shippingAddress, paymentMethod }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to place order");
    }
    return data; // Return the order data on success
  } catch (error) {
    throw new Error(error.message);
  }
};
