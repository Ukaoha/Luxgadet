import {  Route, Routes } from "react-router-dom";
import { Home , Cart,Contact, Admin,OrderHistory } from "./Pages/Index";
import {Header , Footer} from './Components/Index'
import Register from "./Pages/Auth/Register/Register";
import Login from "./Pages/Auth/Login/Login";
import ResetPassword from "./Pages/Auth/ResetPassword/ResetPassword";
import AdimnRoute from "./Components/AdimnRoute/AdminRoute";
import ProductDetails from "./Components/Products/productDetails/ProductDetails";
import CheckoutDetails from "./Pages/Checkout/CheckoutDetails";
import Checkout from "./Pages/Checkout/Checkout";

function App() {
  
  return (
    <>
    <Header/>
    
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/prderhistory" element={<OrderHistory/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/reset" element={<ResetPassword/>} />
      <Route path="/admin/*" element={
      <AdimnRoute>
      <Admin />
      </AdimnRoute>
      } />
            <Route path="/product-details/:id" element={<ProductDetails/>} />
            <Route path="/checkout-details" element={<CheckoutDetails/>} />
            <Route path="/checkout" element={<Checkout/>} />










    </Routes>
    <Footer/>


    
    </>
    );
}

export default App;
