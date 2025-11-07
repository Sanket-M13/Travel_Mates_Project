import { Container, Row, Col, Card } from "react-bootstrap";
import "../assets/css/About.css";
import shilpa from "../assets/ShilpaGharat.jpg";
import aditya from "../assets/AdityaAdhikari.jpg"
import sanket from "../assets/new image.jpg"

export function About() {
  return (
    <div className="about-page py-5">
      <Container>

        <div className="text-center mb-5">
          <h1 className="fw-bold text-primary">About DestinyGo</h1>
          <p className="text-muted fs-5 mt-3">
            Discover your dream destinations effortlessly with <strong>DestinyGo</strong> — 
            your one-stop travel companion for exploring, booking, and managing trips with ease.
          </p>
        </div>

        <Row className="justify-content-center mb-5">
          <Col md={10}>
            <Card className="shadow-lg border-0 p-4">
              <Card.Body>
                <h4 className="fw-semibold text-center text-secondary mb-4">
                  ✨ Our Mission
                </h4>
                <p className="fs-6 text-muted text-center">
                  DestinyGo is an AI-powered travel management platform designed to make your
                  travel planning simple, smart, and personalized. Whether you’re looking
                  for top destinations, booking your next adventure, or managing your trip history,
                  DestinyGo provides a seamless experience with a clean and intuitive interface.
                </p>

                <p className="fs-6 text-muted text-center">
                  Built using modern technologies like <strong>React.js</strong>, <strong>Node.js</strong>,
                  and <strong>MySQL</strong>, the platform ensures both speed and reliability.
                  Our goal is to enhance travel exploration by combining smart destination insights
                  with easy trip management.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>


        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">Meet Our Team</h2>
          <p className="text-muted">The people behind DestinyGo</p>
        </div>

        <Row className="g-4 justify-content-center">

          <Col md={4} sm={6}>
            <Card className="team-card shadow border-0 text-center p-3">
              <div className="team-photo mx-auto mb-3">
                <img
                  src={sanket}
                  alt="Leader Developer"
                  className="rounded-circle img-fluid"
                />
              </div>
              <h5 className="fw-bold text-dark">Sanket Mandavgane</h5>
              <p className="text-primary">Lead Developer</p>
              <p className="text-muted small">
                Full Stack & AI Developer passionate about building scalable
                systems and integrating intelligent automation.
              </p>
            </Card>
          </Col>

          <Col md={4} sm={6}>
            <Card className="team-card shadow border-0 text-center p-3">
              <div className="team-photo mx-auto mb-3">
                <img
                  src={shilpa}
                  alt="Sub Developer 1"
                  className="rounded-circle img-fluid"
                />
              </div>
              <h5 className="fw-bold text-dark">Shilpa Gharat</h5>
              <p className="text-primary">Sub Developer</p>
              <p className="text-muted small">
                 Backend and database enthusiast ensuring smooth communication
                between the client and server layers of the application.
              </p>
            </Card>
          </Col>

          <Col md={4} sm={6}>
            <Card className="team-card shadow border-0 text-center p-3">
              <div className="team-photo mx-auto mb-3">
                <img
                  src={aditya}
                  alt="Sub Developer 2"
                  className="rounded-circle img-fluid"
                />
              </div>
              <h5 className="fw-bold text-dark">Aditya Adhikari</h5>
              <p className="text-primary">Sub Developer</p>
              <p className="text-muted small">
               Frontend developer focusing on crafting beautiful and responsive
                user interfaces using React and Bootstrap.
              </p>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
