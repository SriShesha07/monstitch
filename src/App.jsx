import { Button } from "@material-tailwind/react";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
// import NoPage from "./pages/nopage/NoPage";
import ProductInfo from "./pages/productInfo/ProductInfo";
import ScrollTop from "./componentss/scrollTop/ScrollTop";
import CartPage from "./pages/cart/CartPage";
import AllProduct from "./pages/allProduct/AllProduct";
import SignUp from "./pages/registration/SignUp";
import Login from "./pages/registration/Login";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProductPage from "./pages/admin/AddProductPage";
import UpdateProductPage from "./pages/admin/UpdateProductPage";
import MyState from "./context/myState";
import { Toaster } from "react-hot-toast";
import { ProtectedRouteForUser } from "./protectedRoute/ProtectedRouteForUser";
import { ProtectedRouteForAdmin } from "./protectedRoute/ProtectedRouteForAdmin";
import CategoryPage from "./pages/category/CategoryPage";
import CheckoutPage from "./pages/checkOut/CheckOut";
import ContactUs from "./pages/contactUs/ContactUs";
import PrivacyPolicy from "./pages/policies/PrivacyPolicy";
import ShippingPolicy from "./pages/policies/ShippingPolicy";
import CancellationPolicy from "./pages/policies/CancellationPolicy";
import TermsAndConditions from "./pages/policies/TermsAndConditions";
import OrderSummary from "./pages/orders/OrderSummary";
import MyOrders from "./pages/orders/myOrders";
import AboutUs from "./pages/policies/aboutUs";

export default function App() {
  return (
    <MyState>
      <Router>
        <ScrollTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contactus" element={<ContactUs />} />
          {/* <Route path="/*" element={<NoPage />} /> */}
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path="/cart" element={
            <ProtectedRouteForUser>
            <CartPage />
            </ProtectedRouteForUser>
            } />
          <Route path="/allproduct" element={<AllProduct />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
           <Route path="/category/:categoryname" element={<CategoryPage />} />
         {/* <Route path="/user-dashboard" element={
            <ProtectedRouteForUser>
              <UserDashboard />
            </ProtectedRouteForUser>
          } />
          <Route path="/admin-dashboard" element={
            <ProtectedRouteForAdmin>
              <AdminDashboard />
            </ProtectedRouteForAdmin>
          } />
          <Route path="/add-product" element={
            <ProtectedRouteForAdmin>
              <AddProductPage />
            </ProtectedRouteForAdmin>
          } />
         <Route path="/update-product/:id" element={
            <ProtectedRouteForAdmin>
              <UpdateProductPage />
            </ProtectedRouteForAdmin>
          } /> */}
           <Route path="/admin-dashboard" element={ <ProtectedRouteForAdmin><AdminDashboard /> </ProtectedRouteForAdmin>} />
            <Route path="/add-product" element={<AddProductPage />}  />
            <Route path="/update-product/:id"  element={<UpdateProductPage />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
         <Route path="/checkout" element={<CheckoutPage />} />
         <Route path="/privacy-policy" element={<PrivacyPolicy />} />
         <Route path="/shipping-policy" element={<ShippingPolicy />} />
         <Route path="/cancellation-policy" element={<CancellationPolicy />} />
          <Route path="/termsandconditions" element={<TermsAndConditions />} />
          <Route path="/orderSummary" element={<OrderSummary />} />
          <Route path="/myOrders" element={<MyOrders />} />
<Route path="/aboutUs" element={<AboutUs />} />


        </Routes>
         <Toaster/>
      </Router>
    </MyState>
  );
}
