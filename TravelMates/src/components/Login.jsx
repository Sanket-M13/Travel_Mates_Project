import { useEffect,useState } from "react";
import { Form, Button, Container, Row, Col,} from "react-bootstrap";
import { Bounce, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "../assets/css/Login.css";
import { UserLogin } from "../services/LoginService.js";
import { getToken, storeToken } from "../services/TokenService.js";
import { storeRole } from "../services/RoleService.js";
// import { isLoggedIn } from "../Constants/Constants.js";

export function Login() {
  const [formData, setformdata] = useState({email:'', password:'',role:''})
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [userRole, setUserRole] = useState('user');
const navigate = useNavigate();

 useEffect(() => {
        const token = getToken();
        if (token) {
            navigate("/");
        }
    }, []);

  const handleChange = (event)=>{
    setformdata({ ...formData, [event.target.name]:event.target.value});
  }

  const handleLogin = async(e) => {
   try {
     e.preventDefault();
    console.log("Login clicked:",formData);
    const response = await UserLogin(formData);
    console.log(response);
    
     if (response.status === 200) {
                storeToken(response.data.token);
                storeRole(formData.role);
                navigate("/");
            }
   } catch (error) {
    console.log(error);
    if (error.response) {
                if (error.response.status === 400 || error.response.status === 500) {
                    toast.error(error.response.data.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        transition: Bounce,
                    })
                }
            }
   }

  };

  return (
    <div className="login-page p-4 shadow-lg rounded-4 align-items-center justify-content-center">
      <Container className="p-0 h-100">
        <Row className="g-0 h-100 justify-content-center">
          <Col md={6} className="form-section d-flex align-items-center justify-content-center">
            <div className="form-box p-4 rounded-4 bg-white">
              <h2 className="mb-3 text-center fw-bold">Welcome Back!</h2>
              <p className="text-center text-muted mb-4">Login to continue your journey with TravelMate ✈️</p>

              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-1">
                  <Form.Label className="d-block mb-2">Login As</Form.Label>
                  <div className="d-flex justify-content-between">
                    <Form.Check
                      inline
                      type="radio"
                      id="radio-user"
                      label="User"
                      name="role"
                      value="user"
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      id="radio-admin"
                      label="Admin"
                      name="role"
                      value="admin"
                      onChange={handleChange}
                    />
                  </div>
                </Form.Group>
                <Button type="submit" className="w-100" variant="primary">
                  Login
                </Button>
              </Form>

              <p className="mt-3 text-center">
                Don’t have an account?{" "}
                <Link to="/signup" className="text-decoration-none fw-semibold">Sign Up</Link>
              </p>
            </div>
          </Col>

          <Col
            md={6}
            className="info-section d-none d-md-flex align-items-center justify-content-center text-white text-center h-100"
          >
            <div className="p-4">
              <h1 className="fw-bold mb-3">Explore the World 🌍</h1>
              <p className="fs-5">
                Discover dream destinations, plan perfect trips, and make memories with <b>TravelMate</b>.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}