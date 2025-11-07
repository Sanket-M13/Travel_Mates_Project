import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { getMyTrips, getUserId } from "../services/MyTripService"; // service that calls backend

export function MyBookings() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyTrips();
  }, []);

  const fetchMyTrips = async () => {
    try {
      const userResponse = await getUserId();
      const userId = userResponse.data.id;
      const response = await getMyTrips(userId);
      setTrips(response.data);
    } catch (error) {
      toast.error("Failed to fetch trips");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading your trips...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="text-center text fw-bold mb-4">✈️ My Booked Trips</h2>

      {trips.length === 0 ? (
        <p className="text-center text-muted">No trips booked yet.</p>
      ) : (
        <Row className="g-4">
          {trips.map((trip) => (
            <Col key={trip.trip_id} xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100 shadow-sm border-0 rounded-4">
                <Card.Img
                  variant="top"
                  src={trip.Imgpath}
                  alt={trip.destination}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    borderTopLeftRadius: "0.75rem",
                    borderTopRightRadius: "0.75rem",
                  }}
                />
                <Card.Body>
                  <Card.Title className="fw-bold text-center text-success">
                    {trip.destination}
                  </Card.Title>

                  <div className="mt-3">
                    <p><strong>Source:</strong> {trip.source}</p>
                    <p>
                      <strong>Dates:</strong> {trip.start_date} → {trip.end_date}
                    </p>
                    <p><strong>Persons:</strong> {trip.No_of_Person}</p>
                    <p><strong>Mode:</strong> {trip.Mode}</p>
                    <p><strong>Total Budget:</strong> ₹{trip.Budget}</p>
                    <p><strong>Booked by:</strong> {trip.user_name}</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
