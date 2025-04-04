import React, { useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import   { useParams } from "react-router-dom";
import roomInfo from '../assets/roomInfo.json';
import BookingForm from '../components/BookingForm';
import CarouselWithThumbnails from '../components/CarouselWithThumbnails';
import GoogleIconFrame from '../components/GoogleIconFrame';


// más adelante, cambiar a q obtenga los datos de la db
const Room = () => {
  let { type } = useParams();
  const room = roomInfo[type];
  const services = room.services;

  const [selectedDate, setSelectedDate] = useState({ checkIn: '', checkOut: '', adults: 0, children: 0 });
  const [rooms, setRooms] = useState([{ adults: 1, children: 0 }]);
  const navigate = useNavigate();
  const [showRoomSelector, setShowRoomSelector] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedDate((prev) => ({ ...prev, [name]: value }));
  };

  const searchTariffs = (e) => {
    e.preventDefault();
    const { checkIn, checkOut, adults, children } = selectedDate;
    navigate(`/habitaciones?checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}&type=${type}`);
  };

  const toggleRoomSelector = () => {
    setShowRoomSelector(!showRoomSelector);
  };

  const handleRoomChange = (index, type, value) => {
    const newRooms = [...rooms];
    newRooms[index][type] = value;
    setRooms(newRooms);
  };

  const addRoom = () => {
    setRooms([...rooms, { adults: 1, children: 0 }]);
  };

  const removeRoom = (index) => {
    if (rooms.length > 1) {
      setRooms(rooms.filter((_, i) => i !== index));
    }
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
    <BookingForm handleInputChange={handleInputChange} rooms={rooms} showRoomSelector={showRoomSelector} toggleRoomSelector={toggleRoomSelector} handleRoomChange={handleRoomChange} addRoom={addRoom} removeRoom={removeRoom} searchTariffs={searchTariffs}/>

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