import { About } from "./components/About";
import { MyBookings } from "./components/MyBookings";
import { Destinations } from "./components/Destinations";
import { Home } from "./components/Home"
import { Login } from "./components/Login";
import { Navigationbar } from "./components/Navigationbar"
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Signup } from "./components/Signup";
import { ToastContainer } from "react-toastify";
import { AddDestination } from "./components/AddDestination";
import { DestinationList } from "./components/DestinationList";
import { BookTripForm } from "./components/BookTripForm";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Footers } from "./components/Footer";


function App() {

  const location = useLocation();
  // const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div>
      {location.pathname !== "/login" ? <Navigationbar /> : null}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />

        {/* Protected for admin only */}
        <Route
          path="/AddDestinations"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AddDestination />
            </ProtectedRoute>
          }
        />
        <Route
          path="/destinationsList"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <DestinationList />
            </ProtectedRoute>
          }
        />

        {/* Other routes */}
        <Route path="/book-trip" element={<BookTripForm />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/Mybookings" element={<MyBookings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>

      <ToastContainer />
      <Footers></Footers>
    </div>
  )
}

export default App
