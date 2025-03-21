import React, { useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import DatePicker from '../components/DatePicker';
import hotel from '../img/hotel.jpg';
import boda from '../img/boda.jpg';
import restaurante from '../img/restaurante.jpg';

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const searchTariffs = (e) => {
    e.preventDefault();
  };

  return (
    <Container className="py-5" style={{ maxWidth: "1200px" }}>
      <Row className="mb-5"> {/* Espacio entre secciones */}
        <Col md={4} className="d-flex flex-column align-items-center justify-content-center">
          <h1>Tu escape exclusivo</h1>
          <h5>Donde cada estancia se convierte en una experiencia inolvidable.</h5>
        </Col>
        <Col md={8}>
          <Image src={hotel} rounded fluid />
        </Col>
      </Row>

      {/* Sección de Reserva */}
      <Row className="bg-light-gray py-5 d-flex align-items-center justify-content-center w-100 mb-5">
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
      <Row className="d-flex align-items-center justify-content-center">
        <div className="text-center mb-4">
          <h2>Nuestros Servicios</h2>
        </div>
        <Col md={5} className="mb-4">
          <Image src={restaurante} fluid rounded />
        </Col>
        <Col md={7} className="text-md-start">
          <h3>Restaurante</h3>
          <p>
            El restaurante del hotel ofrece una experiencia gastronómica de alto nivel, 
            enmarcada en un ambiente elegante y refinado. Su propuesta culinaria fusiona 
            la tradición local con innovadoras técnicas contemporáneas. 
            <a href="#"> Más información</a>
          </p>
        </Col>
      </Row>
      <Row className="d-flex align-items-center justify-content-center">
        <Col md={7} className="text-md-end">
          <h3>Eventos</h3>
          <p>
            Los eventos organizados en el restaurante se caracterizan por una planificación 
            meticulosa y una atención personalizada. Cada celebración, desde reuniones 
            empresariales hasta banquetes privados, se desarrolla en un entorno versátil y sofisticado.
          </p>
        </Col>
        <Col md={5} className="mb-4">
          <Image src={boda} fluid rounded />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
