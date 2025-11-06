import { Container, Row, Col, Button, Card } from "react-bootstrap";
import travelVideo from "../assets/css/TravelVideo.mp4"
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
  return (
    <div>
     
      <div style={{ position: "relative", height: "90vh", overflow: "hidden"}}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            top: 0,
            left: 0,
            zIndex: -1,
            filter: "brightness(70%)",
          }}
        >
          <source src={travelVideo} type="video/mp4" />
        </video>

        <div
          className="text-center text-white d-flex align-items-center justify-content-center flex-column"
          style={{
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 1,
          }}
        >
          <h1 className="fw-bold display-4 mb-3">Discover Beautiful Destinations 🌍</h1>
          <p className="lead mb-4">Your adventure starts here with DestinyGo.</p>
          <Button variant="light" className="rounded-pill px-4 fw-semibold" onClick={() => navigate("/destinations")}>
            Explore Now
          </Button>
        </div>
      </div>

      {/* About / Welcome Section */}
      <Container className="my-5 text-center">
        <h2 className="fw-bold mb-3 text-primary">Why Choose DestinyGo?</h2>
        <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
          At DestinyGo, we make travel planning seamless and exciting. Whether
          you're craving beach vibes, mountain adventures, or royal retreats —
          we’ve got you covered with trusted packages and unbeatable deals.
        </p>
      </Container>

      {/* Special Offers Section */}
      <Container className="my-5">
        <h3 className="text-center mb-4 fw-bold">✨ Special Offers ✈️</h3>
        <Row className="g-4">
          {[
            {
              title: "Goa Getaway",
              img: "https://images.unsplash.com/photo-1560179406-1c6c60e0dc76?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1074",
              desc: "Golden beaches, stunning sunsets, and serene vibes – now at 20% off!",
            },
            {
              title: "Manali Adventure",
              img: "https://images.unsplash.com/photo-1579689189009-874f5cac2db5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFuYWxpfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
              desc: "Enjoy snowy peaks and thrilling adventures – flat 30% off this winter!",
            },
            {
              title: "Jaipur Royal Tour",
              img: "https://media.istockphoto.com/id/1398087835/photo/pink-palace-hawa-mahal-jaipur-india-beautiful-sunset-view.webp?a=1&b=1&s=612x612&w=0&k=20&c=ezYB9B9lKCREQ68vT2lahepFpTAyNyM494qig-pBT6M=",
              desc: "Step into history and luxury in the heart of Rajasthan – 25% off!",
            },
          ].map((offer, index) => (
            <Col md={4} key={index}>
              <Card className="shadow-lg border-0 rounded-4 h-100">
                <Card.Img
                  variant="top"
                  src={offer.img}
                  style={{
                    height: "250px",
                    objectFit: "cover",
                    borderTopLeftRadius: "1rem",
                    borderTopRightRadius: "1rem",
                  }}
                />
                <Card.Body className="text-center d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title className="fw-semibold mb-2">{offer.title}</Card.Title>
                    <Card.Text className="text-muted">{offer.desc}</Card.Text>
                  </div>
                  <Button variant="primary" className="rounded-pill mt-3 px-4 fw-semibold">
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
