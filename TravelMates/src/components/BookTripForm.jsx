import { useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import { bookMyTrip } from "../services/MyTripService";

export function BookTripForm() {
  const { state } = useLocation();
  const destination = state?.destination;

  const [formData, setFormData] = useState({
    source: "",
    start_date: "",
    end_date: "",
    No_of_Person: 1,
    Mode: destination.Travel_Mode || "",
    Budget: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = 1; // Replace with logged-in user ID later
      const response = await bookMyTrip(userId, {
        ...formData,
        dest_id: destination.dest_id,
      });
      console.log(formData);
      
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Failed to book trip");
      console.error(error);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm border-0 rounded-4 mb-4">
            <Card.Img
              variant="top"
              src={destination.Imgpath}
              alt={destination.destination_name}
              style={{
                height: "250px",
                objectFit: "cover",
                borderTopLeftRadius: "0.75rem",
                borderTopRightRadius: "0.75rem",
              }}
            />
            <Card.Body>
              <Card.Title className="fw-bold text-primary text-center">
                {destination.destination_name}
              </Card.Title>
              <Card.Text className="text-muted text-center">
                {destination.description}
              </Card.Text>
              <p className="text-center mb-0">
                <strong>Country:</strong> {destination.Country} <br />
                <strong>Mode:</strong> {destination.Travel_Mode}
              </p>
            </Card.Body>
          </Card>

          <Card className="p-4 shadow-sm border-0 rounded-4">
            <h4 className="mb-4 text-center text-success">Book Your Trip</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Source</Form.Label>
                <Form.Control
                  type="text"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="start_date"
                      value={formData.start_date}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="end_date"
                      value={formData.end_date}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>No. of Persons</Form.Label>
                <Form.Control
                  type="number"
                  name="No_of_Person"
                  value={formData.No_of_Person}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mode of Travel</Form.Label>
                <Form.Control
                  type="text"
                  name="Mode"
                  value={formData.Mode}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Budget per Person</Form.Label>
                <Form.Control
                  type="number"
                  name="Budget"
                  value={formData.Budget}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <div className="text-center">
                <Button variant="success" type="submit" className="px-4 rounded-pill">
                  Book Trip
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
