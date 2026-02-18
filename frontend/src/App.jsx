import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import Emergency from "./pages/Emergency";
import BloodInventory from "./pages/BloodInventory";
import Donors from "./pages/Donors";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search" element={<Search />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/blood-inventory" element={<BloodInventory />} />
        <Route path="/donors" element={<Donors />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
