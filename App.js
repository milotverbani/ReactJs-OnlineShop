import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./Komponentat/Home";
import Product from "./Komponentat/Product";
import Cart from "./Komponentat/Cart";
import Register from "./Komponentat/Register";
import Login from "./Komponentat/Login";
import Dashboard from "./Komponentat/Dashboard";
import Admin from "./Komponentat/Admin/Admin";
import AdminPanel from "./Komponentat/Admin/AdminPanel";
import Orders from "./Komponentat/Admin/Orders";
import Users from "./Komponentat/Admin/Users";
import ChangePassword from "./Komponentat/ChangePassword";


function App() {
  return (
    

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Product" element={<Product/>}/>
      <Route path="/Cart" element={<Cart/>}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Dashboard" element={<Dashboard/>}/>
      <Route path="/Admin" element={<Admin/>}/>
      <Route path="/AdminPanel" element={<AdminPanel/>}/>
      <Route path="/Orders" element={<Orders/>}/>
      <Route path="/Users" element={<Users/>}/>
      <Route path="/ChangePassword" element={<ChangePassword/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
