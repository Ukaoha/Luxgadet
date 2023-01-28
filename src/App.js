import {  Route, Routes } from "react-router-dom";
import { Home , Cart,Contact, Admin,OrderHistory } from "./Pages/Index";
import {Header , Footer} from './Components/Index'
import Register from "./Pages/Auth/Register/Register";

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





    </Routes>
    <Footer/>
    
    </>
    );
}

export default App;
