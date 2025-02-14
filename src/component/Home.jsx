import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Home.css";

const Home = () => {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (city) {
      navigate(`/weather/${city}`);
    }
  };

  return (
    <Container fluid className="home-container">
      <Row className="justify-content-center align-items-center vh-100">
        <Col xs={12} md={6} lg={4} className="text-center">
          <h1 className="title">Weather App 🌤</h1>
          <Form onSubmit={handleSearch} className="search-form">
            <Form.Control type="text" placeholder="Enter city..." value={city} onChange={(e) => setCity(e.target.value)} className="city-input" />
            <Button type="submit" variant="primary" className="search-button">
              Search
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
