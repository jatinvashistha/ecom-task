 import React from "react";
 import { Menu } from "antd";
 import { Link, useNavigate, useLocation } from "react-router-dom";
 import {
   ShoppingCartOutlined,
   OrderedListOutlined,
   LogoutOutlined,
   HomeOutlined,
 } from "@ant-design/icons";

 const Navbar = () => {
   const location = useLocation();
   const navigate = useNavigate();

   // Function to determine the active key based on the current pathname
   const getActiveKey = (pathname) => {
     if (pathname.startsWith("/cart")) return "cart";
     if (pathname.startsWith("/orders")) return "orders";
     if (pathname.startsWith("/checkout")) return "checkout";
     if (pathname === "/") return "home";
     return "";
   };

   const activeKey = getActiveKey(location.pathname);

   // Logout function
   const onLogout = () => {
     // Remove user token from localStorage
     localStorage.removeItem("userToken");

     // Navigate to the login page
     navigate("/login");
   };

   return (
     <Menu
       mode="horizontal"
       selectedKeys={[activeKey]}
       theme="dark"
       style={{ justifyContent: "center" }}
     >
       <Menu.Item key="home" icon={<HomeOutlined />}>
         <Link to="/">Home</Link>
       </Menu.Item>

       <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
         <Link to="/cart">Cart</Link>
       </Menu.Item>

       <Menu.Item key="orders" icon={<OrderedListOutlined />}>
         <Link to="/orders">Orders</Link>
       </Menu.Item>

       <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={onLogout}>
         Logout
       </Menu.Item>
     </Menu>
   );
 };

 export default Navbar;