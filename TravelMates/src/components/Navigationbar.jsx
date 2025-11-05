import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { getToken, removeToken } from "../services/TokenService";
import { removeRole } from "../services/RoleService";
import { useEffect } from "react";

export function Navigationbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getToken(); // Check if token exists
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  
  const handleLoginClick = () => {
    navigate("/login"); // go to login page
  };
  const handleLogout = () => {
        removeToken();
        removeRole();
        navigate("/login");
    }
  // const handleProfileClick = () => {
  //   navigate("/profile"); // go to profile page
  // };

  return (
    <Navbar expand="lg" bg="light" variant="light" className="shadow-sm py-3">
      <Container>
        {/* Brand */}
        <Navbar.Brand
          className="fw-bold text-primary fs-4"
          style={{ letterSpacing: "1px", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          🌍 TravelMates
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link onClick={() => navigate("/")} className="mx-2 fw-medium">
              Home
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/destinations")} className="mx-2 fw-medium">
              Destinations
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/Adddestinations")} className="mx-2 fw-medium">
              Add Destinations
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/bookings")} className="mx-2 fw-medium">
              Bookings
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/about")} className="mx-2 fw-medium">
              About Us
            </Nav.Link>
          </Nav>

          <Form className="d-flex align-items-center gap-2">
            {isLoggedIn ? (
              <Button
                variant="outline-success"
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
