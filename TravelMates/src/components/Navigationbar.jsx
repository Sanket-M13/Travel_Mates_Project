import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { getToken, removeToken } from "../services/TokenService";
import { getRole, removeRole } from "../services/RoleService";
import "../assets/css/Navbar.css";
import { getUserId } from "../services/MyTripService";

export function Navigationbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(""); 

  useEffect(() => {
    const token = getToken();
    const role = getRole();
    setIsLoggedIn(!!token);
    setUserRole(role);

    if (token) {
      fetchUsername(); 
    }
  }, []);

  const fetchUsername = async () => {
    try {
      const res = await getUserId();
      setUserName(res.data.name);
    } catch (err) {
      console.error("Failed to fetch username:", err);
    }
  };

  const handleLoginClick = () => navigate("/login");

  const handleLogout = () => {
    removeToken();
    removeRole();
    setUserName("");
    navigate("/login");
  };

  return (
    <Navbar expand="lg" bg="light" variant="light" className="shadow-sm py-3">
      <Container>
        <Navbar.Brand
          className="fw-bold text-primary fs-4"
          style={{ letterSpacing: "1px", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          🌍 DestinyGo
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link onClick={() => navigate("/")} className="mx-2 fw-medium nav-hover">
              Home
            </Nav.Link>

            <Nav.Link onClick={() => navigate("/destinations")} className="mx-2 fw-medium nav-hover">
              Destinations
            </Nav.Link>

            {isLoggedIn && userRole === "admin" && (
              <>
                <Nav.Link
                  onClick={() => navigate("/destinationsList")}
                  className="mx-2 fw-medium nav-hover"
                >
                  DestinationsList
                </Nav.Link>
                <Nav.Link
                  onClick={() => navigate("/AddDestinations")}
                  className="mx-2 fw-medium nav-hover"
                >
                  Add Destination
                </Nav.Link>
              </>
            )}

            <Nav.Link onClick={() => navigate("/Mybookings")} className="mx-2 fw-medium nav-hover">
              MyBookings
            </Nav.Link>

            <Nav.Link onClick={() => navigate("/aboutus")} className="mx-2 fw-medium nav-hover">
              About Us
            </Nav.Link>
          </Nav>

          <Form className="d-flex align-items-center gap-3">
            {isLoggedIn && userName && (
              <span className="fw-semibold text-secondary">
                👋 Welcome, <span className="text-primary">{userName}</span>
              </span>
            )}

            {isLoggedIn ? (
              <Button
                variant="outline-dark"
                className="rounded-pill px-3"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Button
                variant="primary"
                className="rounded-pill px-4"
                onClick={handleLoginClick}
              >
                Login
              </Button>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
