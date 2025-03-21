import React, { useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import DatePicker from '../components/DatePicker';
import hotel from '../img/hotel.jpg';

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const searchTariffs = (e) => {
    e.preventDefault();
  };

  return (
    <Container className="py-5" style={{ maxWidth: "1200px" }}>
      <Row>
        <Col md={4} className="d-flex flex-column align-items-center justify-content-center">
          <h1>Tu escape exclusivo</h1>
          <h5>Donde cada estancia se convierte en una experiencia inolvidable.</h5>
        </Col>
        <Col md={8}>
          <Image src={hotel} rounded fluid />
        </Col>
      </Row>

      {/* Sección de Reserva */}
      <Row className="bg-light-gray py-5 d-flex align-items-center justify-content-center w-100">
        <div className="text-center mb-4">
          <h2>Haz tu reserva</h2>
        </div>
        <Col md={6} className="d-flex justify-content-center">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            placeholderText="Selecciona una fecha"
          />
        </Col>
        <Col md={6} className="d-flex flex-column align-items-center">
          <input name="adults" type="number" id="adults" placeholder="Adultos" className="mb-3 w-75" />
          <input name="children" type="number" id="children" placeholder="Niños" className="mb-3 w-75" />
          <button type="submit" className="btn btn-primary w-25" onClick={searchTariffs}>
            Buscar tarifas
          </button>
        </Col>
      </Row>

      {/* Sección de Servicios */}
      <Row className="py-5 d-flex align-items-center justify-content-center w-100">
        <div className="text-center">
          <h2>Nuestros Servicios</h2>
        </div>
        <p className="text-center">
          Además de nuestras cómodas habitaciones, contamos con gimnasio, spa, restaurante y eventos especiales para que tu estadía sea memorable.
        </p>
      </Row>
    </Container>
  );
};

export default Home;
