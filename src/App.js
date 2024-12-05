import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProductDetails from "./pages/ProductDetails/ProductDetails";
import GetAllProducts from "./pages/GetAllProducts/GetAllProducts";
import LoginRegister from "./pages/LoginRegister/LoginRegister"; // LoginRegister Component
import Cart from "./pages/Cart/Cart"; // Cart page
import Checkout from "./pages/Checkout/Checkout";
import PrivateRoute from "./pages/PrivateRoute/PrivateRoute"; // PrivateRoute Component
import Navbar from "./components/Navbar";
import MyOrders from "./pages/MyOrders/MyOrders";
import CheckoutSingle from "./pages/CheckoutSingle/CheckoutSingle";

function App() {
  return (
    <Router>
     

      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Navbar />
              <GetAllProducts />
            </PrivateRoute>
          }
        />

        <Route
          path="/product/:productId"
          element={
            <PrivateRoute>
              <Navbar />
              <ProductDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Navbar />
              <MyOrders />
            </PrivateRoute>
          }
        />

        <Route path="/login" element={<LoginRegister />} />

        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Navbar />
              <Cart />
            </PrivateRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Navbar />
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkoutsingle/:id"
          element={
            <PrivateRoute>
              <Navbar />
              <CheckoutSingle />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
