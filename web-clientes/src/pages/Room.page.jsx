import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import   { useParams } from "react-router-dom";
import roomInfo from '../assets/roomInfo.json';
import BookingForm from '../components/BookingForm';
import CarouselWithThumbnails from '../components/CarouselWithThumbnails';
import GoogleIconFrame from '../components/GoogleIconFrame';
import axios from "../config/axiosConfig"


// más adelante, cambiar a q obtenga los datos de la db
const Room = () => {
  let { id } = useParams();
  const [tipo, setTipo] = useState({});
  const [loading, setLoading] = useState(true);

   useEffect(() => {
        const fetchTipo = async () => {
            try {
                //console.log('>>> Haciendo GET /TiposHabitaciones');
                const response = await axios.get(`/TiposHabitaciones/${id}`);
                //console.log('>>> Respuesta backend:', response.data);
                setTipo(response.data);
            } catch (err) {
                //console.error('>>> Error al obtener tipos:', err);
                console.log('Error al cargar los tipos de habitación');
            } finally {
                setLoading(false);
            }
        };
        fetchTipo();
    }, [id]);


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
    navigate(`/habitaciones?checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}&type=${tipo.nombre}`);
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
    loading ? <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div> : 
      <>
      <Container className="py-5" fluid>
      <Row className="mb-5">
          <h1 className="main-title">{tipo.nombre}</h1>
      </Row>
      <Row className="mb-4">
          <CarouselWithThumbnails imagenes={tipo.imagenes}/>
      </Row>

        {/* Sección de Reserva */}
      <BookingForm handleInputChange={handleInputChange} rooms={rooms} showRoomSelector={showRoomSelector} toggleRoomSelector={toggleRoomSelector} handleRoomChange={handleRoomChange} addRoom={addRoom} removeRoom={removeRoom} searchTariffs={searchTariffs}/>

      {/* Seccion Descripcion */ }
      <Row className='py-5'>
          <div className="text-center mb-4">
              <h2 className='subtitle'>Descripción</h2>
          </div>
          <Col md={10} lg={8} className="mx-auto">
              <p className="justify">{tipo.descripcion}</p>
          </Col>
      </Row>

      <hr/>
      <Row className="py-5 d-flex align-items-center justify-content-center w-100">
          <div className="text-center mb-4">
            <h2 className='subtitle'>Características</h2>
          </div>
          {
            tipo.servicios?.map((s) => (
          <Col>
            <GoogleIconFrame icon={s.iconName} iconSize="2rem" frameSize="50" title={s.nombre} className="py-3"></GoogleIconFrame>
          </Col>
            ))
          }
        
        </Row>

    </Container>
           </>
 
  );

}
  export default Room;