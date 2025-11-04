import { About } from "./components/About";
import { Bookings } from "./components/Bookings";
import { Destinations } from "./components/Destinations";
import { Home } from "./components/Home"
import { Login } from "./components/Login";
import { Navigationbar } from "./components/Navigationbar"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Signup } from "./components/Signup";
import { ToastContainer } from "react-toastify";


function App() {
  
  const location = useLocation();
  // const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div>
      {location.pathname !== "/login" ? <Navigationbar /> : null}
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/about" element={<About />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    <ToastContainer/>
    </div>
  )
}

export default App
