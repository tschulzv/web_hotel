import React, { useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import   { useParams } from "react-router-dom";
import roomInfo from '../assets/roomInfo.json';
import CarouselWithThumbnails from '../components/CarouselWithThumbnails';
import GoogleIconFrame from '../components/GoogleIconFrame';


// más adelante, cambiar a q obtenga los datos de la db
const Room = () => {
  let { tipo } = useParams();
  const room = roomInfo[tipo];
  const services = room.services;
  const [selectedDate, setSelectedDate] = useState(null);

  const searchTariffs = (e) => {
    e.preventDefault();
  };

  return (
  <Container className="py-5" fluid>
    <Row className="mb-5">
        <h1 className="main-title">{room.nombre}</h1>
    </Row>
    <Row className="mb-4">
        <CarouselWithThumbnails />
    </Row>

      {/* Sección de Reserva */}
    <Row className="bg-light-gray py-4 d-flex align-items-center justify-content-center w-100 mb-5">
      <div className="text-center mb-4">
        <h2 className='subtitle'>Haz tu reserva</h2>
      </div>
      <Col md={5} className="d-flex flex-column align-items-center justify-content-center px-4">
        <label for="check-in">Check-In</label>
        <input name="check-in" type="date" id="check-in" className="mb-3 w-75 form-control" />
        <label for="check-out">Check-Out</label>
        <input name="check-out" type="date" id="check-out" className="mb-3 w-75 form-control" />
      </Col>
      <Col md={5} className="d-flex flex-column align-items-center justify-content-center px-4">
        <label for="adults">Adultos</label>
        <input name="adults" type="number" id="adults" className="mb-3 w-75 form-control"  min="0"/>
        <label for="children">Niños</label>
        <input name="children" type="number" id="children" className="mb-3 w-75 form-control" min="0"/>
      </Col>
      <Col md={2}>
        <button type="submit" className="btn btn-primary fw-bolder" onClick={searchTariffs}>
          Buscar tarifas
        </button>
      </Col>
    </Row>

    {/* Seccion Descripcion */ }
    <Row className='py-5'>
        <div className="text-center mb-4">
            <h2 className='subtitle'>Descripción</h2>
        </div>
        <Col md={10} lg={8} className="mx-auto">
            <p className="justify">{room.descripcion}</p>
        </Col>
    </Row>

    <hr/>
    <Row className="py-5 d-flex align-items-center justify-content-center w-100">
        <div className="text-center mb-4">
          <h2 className='subtitle'>Características</h2>
        </div>
        <Col>
          <GoogleIconFrame icon={services[0].icono} iconSize="2rem" frameSize="50" title={services[0].titulo} className="py-3"></GoogleIconFrame>
          <GoogleIconFrame icon={services[1].icono} iconSize="2rem" frameSize="50" title={services[1].titulo} className="py-3"></GoogleIconFrame>
        </Col>
        <Col>
          <GoogleIconFrame icon={services[2].icono} iconSize="2rem" frameSize="50" title={services[2].titulo} className="py-3"></GoogleIconFrame>
          <GoogleIconFrame icon={services[3].icono} iconSize="2rem" frameSize="50" title={services[3].titulo} className="py-3"></GoogleIconFrame>
        </Col>
        <Col>
          <GoogleIconFrame icon={services[4].icono} iconSize="2rem" frameSize="50" title={services[4].titulo} className="py-3"></GoogleIconFrame>
          <GoogleIconFrame icon={services[5].icono} iconSize="2rem" frameSize="50" title={services[5].titulo} className="py-3"></GoogleIconFrame>
        </Col>
      </Row>


  </Container>
  );

}
  export default Room;