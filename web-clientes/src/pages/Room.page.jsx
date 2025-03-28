import React, { useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import   { useParams } from "react-router-dom";
import roomInfo from '../assets/roomInfo.json';
import DatePicker from '../components/DatePicker';
import CarouselWithThumbnails from '../components/CarouselWithThumbnails';
import IconDescription from '../components/IconDescription';
import { FaSwimmingPool, FaWifi, FaDumbbell, FaAward } from "react-icons/fa";
import { MdLocalLaundryService, MdOutlineRestaurant, MdRoomService } from "react-icons/md";

// más adelante, cambiar a q obtenga los datos de la db
const Room = () => {
  let { tipo } = useParams();
  const room = roomInfo[tipo];
  const [selectedDate, setSelectedDate] = useState(null);

  const searchTariffs = (e) => {
    e.preventDefault();
  };

  return (
  <Container className="py-5" style={{ maxWidth: "1200px" }}>
    <Row className="mb-5">
        <h1 className="main-title">{room.nombre}</h1>
    </Row>
    <Row>
        <CarouselWithThumbnails />
    </Row>

    
      {/* Sección de Reserva */}
      <Row className="bg-light-gray py-5 d-flex align-items-center justify-content-center w-100 mb-5">
        <div className="text-center mb-4">
          <h2 className='subtitle'>Haz tu reserva</h2>
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
          <h2 className='subtitle'>Nuestros Servicios</h2>
        </div>
        <Col>
          <IconDescription icon={<FaSwimmingPool size={30}/>} size="50" title="Piscina al aire libre" className="py-3"/>
          <IconDescription icon={<MdLocalLaundryService size={30}/>} size="50" title="Servicio de Lavandería"/>
        </Col>
        <Col>
          <IconDescription icon={<MdOutlineRestaurant size={30}/>} size="50" title="Restaurante" />
          <IconDescription icon={<MdRoomService size={30}/>} size="50" title="Servicio a la Habitación" />
        </Col>
        <Col>
          <IconDescription icon={<FaWifi size={30}/>} size="50" title="Wi-Fi" />
          <IconDescription icon={<FaDumbbell size={30}/>} size="50" title="Gimnasio"/>
        </Col>
      </Row>


  </Container>
  );

}
  export default Room;