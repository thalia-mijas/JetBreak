import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Claims from "./components/Claims";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import Offers from "./components/Offers";
import Stores from "./components/Stores";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/offers" element={<Offers />}></Route>
        <Route path="/stores" element={<Stores />}></Route>
        <Route path="/claims" element={<Claims />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
