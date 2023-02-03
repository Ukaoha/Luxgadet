import {  Route, Routes } from "react-router-dom";
import { Home , Cart,Contact, Admin,OrderHistory } from "./Pages/Index";
import {Header , Footer} from './Components/Index'
import Register from "./Pages/Auth/Register/Register";
import Login from "./Pages/Auth/Login/Login";
import ResetPassword from "./Pages/Auth/ResetPassword/ResetPassword";

function App() {
  
  return (
    <>
    <Header/>
    
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/prderhistory" element={<OrderHistory/>} />
      <Route path="/admin" element={<Admin/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="reset" element={<ResetPassword/>} />






    </Routes>
    <Footer/>
    
    </>
    );
}

export default App;
