import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

export function Home() {
  return (
    <div>
      {/* Hero / Welcome Section */}
      <div
        className="text-center text-white d-flex align-items-center justify-content-center"
        style={{
          height: "70vh",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          flexDirection: "column",
        }}
      >
        <h1 className="fw-bold display-5">Welcome to TravelMates 🌍</h1>
        <p className="lead mb-4">
          Discover the world’s most amazing destinations with ease and comfort.
        </p>
        <Button variant="primary" className="rounded-pill px-4">
          Explore Now
        </Button>
      </div>

      <Container className="my-5">
        <h3 className="text-center mb-4">Plan Your Trip</h3>
        <Form className="d-flex justify-content-center align-items-center gap-3 flex-wrap">
          <Form.Control
            type="text"
            placeholder="From (e.g., Mumbai)"
            style={{ width: "250px" }}
          />
          <Form.Control
            type="text"
            placeholder="To (e.g., Goa)"
            style={{ width: "250px" }}
          />
          <Button variant="success" className="rounded-pill px-4">
            Search
          </Button>
        </Form>
      </Container>

      <Container className="my-5">
        <h3 className="text-center mb-4">Special Offers ✈️</h3>
        <Row className="g-4">
          {[
            {
              title: "Goa Getaway",
              img: "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
              desc: "Enjoy beaches, nightlife, and more with 20% off!",
            },
            {
              title: "Manali Adventure",
              img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
              desc: "Snow, mountains, and cozy vibes – up to 30% off!",
            },
            {
              title: "Jaipur Royal Tour",
              img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
              desc: "Experience the pink city’s heritage – flat 25% off!",
            },
          ].map((offer, index) => (
            <Col md={4} key={index}>
              <Card className="shadow-sm border-0">
                <Card.Img
                  variant="top"
                  src={offer.img}
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{offer.title}</Card.Title>
                  <Card.Text>{offer.desc}</Card.Text>
                  <Button variant="primary" className="rounded-pill">
                    Book Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
