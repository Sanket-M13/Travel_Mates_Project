import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { getAllDestination } from "../services/DestinationService";
import { useNavigate } from "react-router-dom";

export function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const navigate = useNavigate();

  const fetchDestination = async () => {
    try {
      const response = await getAllDestination();
      setDestinations(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDestination();
  }, []);

  const handleBookTrip = (destination) => {
    // Navigate to BookTripForm and send destination details as state
    navigate("/book-trip", { state: { destination } });
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-5 fw-bold text-primary">
        🌍 Popular Destinations
      </h2>

      <Row className="g-4 justify-content-center">
        {destinations.map((dest) => (
          <Col key={dest.dest_id} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100 shadow-sm border-0 rounded-4">
              <Card.Img
                variant="top"
                src={dest.Imgpath}
                alt={dest.destination_name}
                style={{
                  height: "220px",
                  objectFit: "cover",
                  borderTopLeftRadius: "0.75rem",
                  borderTopRightRadius: "0.75rem",
                }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-semibold text-center mb-2">
                  {dest.destination_name}
                </Card.Title>
                <Card.Text
                  className="text-muted"
                  style={{
                    fontSize: "0.9rem",
                    textAlign: "justify",
                    flexGrow: 1,
                  }}
                >
                  {dest.description}
                </Card.Text>

                <div className="mt-3">
                  <p className="mb-1">
                    <strong>Travel Mode:</strong> {dest.Travel_Mode}
                  </p>
                  <p className="mb-3">
                    <strong>Country:</strong> {dest.Country}
                  </p>

                  <div className="text-center">
                    <Button
                      variant="primary"
                      className="px-4 rounded-pill"
                      onClick={() => handleBookTrip(dest)}
                    >
                      Book My Trip
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
