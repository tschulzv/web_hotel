import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import DatePicker from '../components/DatePicker';
import IconDescription from '../components/IconDescription';
import { FaSwimmingPool, FaWifi, FaDumbbell, FaAward } from "react-icons/fa";
import { MdLocalLaundryService, MdOutlineRestaurant, MdRoomService } from "react-icons/md";
import hotel from '../img/hotel.jpg';
import restaurante from '../img/restaurante.jpg';
import boda from '../img/boda.jpg';
const Home = () => {
  const [selectedDate, setSelectedDate] = useState({ checkIn: '', checkOut: '', adults: 0, children: 0 });
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([{ adults: 1, children: 0 }]);
  const [showRoomSelector, setShowRoomSelector] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedDate((prev) => ({ ...prev, [name]: value }));
  };

  const searchTariffs = (e) => {
    e.preventDefault();
    const { checkIn, checkOut, adults, children } = selectedDate;
    navigate(`/habitaciones?checkIn=${checkIn}&checkOut=${checkOut}&adults=${adults}&children=${children}`);
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
      <Row className="mb-5"> {/* Espacio entre secciones */}
        <Col md={5} className="d-flex flex-column align-items-start justify-content-center">
          <h1 className="main-title">Tu escape exclusivo</h1>
          <h5>Donde cada estancia se convierte en una experiencia inolvidable.</h5>
        </Col>
        <Col md={7}>
          <Image src={hotel} rounded fluid />
        </Col>
      </Row>

      <Row className="bg-light-gray py-4 d-flex align-items-center justify-content-center w-100 mb-5">
        <div className="text-center mb-4">
          <h2 className="subtitle">Haz tu reserva</h2>
        </div>

        {/* Inputs de Check-In y Check-Out juntos */}
        <Col md={5} className="d-flex flex-column align-items-center justify-content-center px-4">
          <div className="d-flex w-100">
            <div className="me-2 w-50">
              <label htmlFor="check-in">Check-In</label>
              <input
                name="checkIn"
                type="date"
                id="check-in"
                className="w-100 form-control"
                onChange={handleInputChange}
              />
            </div>
            <div className="w-50">
              <label htmlFor="check-out">Check-Out</label>
              <input
                name="checkOut"
                type="date"
                id="check-out"
                className="w-100 form-control"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </Col>

        {/* Botón para abrir selector de habitaciones */}
        <Col md={5} className="d-flex flex-column align-items-center justify-content-center px-4 position-relative">
          <label>Habitaciones</label>
          <button
            className="w-75 form-control btn btn-outline-secondary"
            onClick={toggleRoomSelector}
          >
            {rooms.length} Habitación{rooms.length > 1 ? "es" : ""} -{" "}
            {rooms.reduce((acc, room) => acc + room.adults, 0)} Adulto
            {rooms.reduce((acc, room) => acc + room.adults, 0) > 1 ? "s" : ""},{" "}
            {rooms.reduce((acc, room) => acc + room.children, 0)} Niño
            {rooms.reduce((acc, room) => acc + room.children, 0) > 1 ? "s" : ""}
          </button>

          {showRoomSelector && (
            <div
              className="bg-white border rounded p-3 shadow"
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "100%",
                zIndex: 1000,
              }}
            >
              {rooms.map((room, index) => (
                <div key={index} className="border-bottom pb-2 mb-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-0">Habitación {index + 1}</h6>
                    {rooms.length > 1 && (
                      <button className="btn btn-danger btn-sm" onClick={() => removeRoom(index)}>
                        ×
                      </button>
                    )}
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <div className="w-50 px-2">
                      <label className="form-label">Adultos</label>
                      <input
                        type="number"
                        min="1"
                        value={room.adults}
                        className="form-control"
                        onChange={(e) => handleRoomChange(index, "adults", Number(e.target.value))}
                      />
                    </div>
                    <div className="w-50 px-2">
                      <label className="form-label">Niños</label>
                      <input
                        type="number"
                        min="0"
                        value={room.children}
                        className="form-control"
                        onChange={(e) => handleRoomChange(index, "children", Number(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button className="btn btn-primary w-100 mt-2" onClick={addRoom}>
                + Agregar Habitación
              </button>
            </div>
          )}
        </Col>

        <Col md={2}>
          <button type="submit" className="btn btn-primary fw-bolder" onClick={searchTariffs}>
            Buscar tarifas
          </button>
        </Col>
      </Row>

      <Row className="py-5 d-flex align-items-center justify-content-center w-100">
        <div className="text-center mb-4">
          <h2 className='subtitle'>Nuestros Servicios</h2>
        </div>
        <Col>
          <IconDescription icon={<FaSwimmingPool size={30} />} size="50" title="Piscina al aire libre" className="py-3" />
          <IconDescription icon={<MdLocalLaundryService size={30} />} size="50" title="" />
        </Col>
        <Col>
          <IconDescription icon={<MdOutlineRestaurant size={30} />} size="50" title="Restaurante" />
          <IconDescription icon={<MdRoomService size={30} />} size="50" title="Servicio a la Habitación" />
        </Col>
        <Col>
          <IconDescription icon={<FaWifi size={30} />} size="50" title="Wi-Fi" />
          <IconDescription icon={<FaDumbbell size={30} />} size="50" title="Gimnasio" />
        </Col>
      </Row>
      <hr></hr>

      <Row className="d-flex align-items-center justify-content-center">
        <Col md={5} className="mb-4">
          <Image src={restaurante} fluid rounded />
        </Col>
        <Col md={7} className="text-md-start">
          <h3>Restaurante</h3>
          <p className="justify">
            El restaurante del hotel ofrece una experiencia gastronómica de alto nivel,
            enmarcada en un ambiente elegante y refinado. Su propuesta culinaria fusiona
            la tradición local con innovadoras técnicas contemporáneas.
            <a href="/restaurante" className='link px-1'>Más información...</a>
          </p>
        </Col>
      </Row>
      <Row className="d-flex align-items-center justify-content-center">
        <Col md={7} className="">
          <h3>Eventos</h3>
          <p className="justify">
            Los eventos organizados en el restaurante se caracterizan por una planificación
            meticulosa y una atención personalizada. Cada celebración, desde reuniones
            empresariales hasta banquetes privados, se desarrolla en un entorno versátil y sofisticado.
          </p>
        </Col>
        <Col md={5} className="mb-4">
          <Image src={boda} fluid rounded />
        </Col>
      </Row>

      {/* Seccion Distinciones y Premios*/}
      <Row className="bg-light-gray py-5">
        <div className="text-center mb-4">
          <h2 className='subtitle'>Distinciones y Premios</h2>
        </div>
        <Col>
          <div className='d-flex flex-column justify-content-start align-items-center text-center'>
            <div className='bg-white rounded-corners d-flex align-items-center justify-content-center' style={{ width: '90px', height: '90px' }}>
              <i className="bi bi-award" style={{ "font-size": "4rem" }}></i>
            </div>
            <h5 className='mt-3'>TripAdvisor's Traveler's Choice</h5>
          </div>
        </Col>
        <Col>
          <div className='d-flex flex-column justify-content-start align-items-center text-center'>
            <div className='bg-white rounded-corners d-flex align-items-center justify-content-center' style={{ width: '90px', height: '90px' }}>
              <i className="bi bi-award" style={{ "fontSize": "4rem" }}></i>
            </div>
            <h5 className='mt-3'>Certificación de Excelencia de Booking.com</h5>
          </div>
        </Col>
        <Col>
          <div className='d-flex flex-column justify-content-start align-items-center text-center'>
            <div className='bg-white rounded-corners d-flex align-items-center justify-content-center' style={{ width: '90px', height: '90px' }}>
              <i className="bi bi-award" style={{ "font-size": "4rem" }}></i>
            </div>
            <h5 className='mt-3'>World Travel Awards</h5>
          </div>
        </Col>
      </Row>

      {/* Seccion Form Contacto*/}
      <Row className='py-5'>
        <div className="text-center mb-4">
          <h2 className='subtitle'>Contacto</h2>
          <p>¿Tienes alguna consulta? Ponte en contacto con nosotros y te atenderemos lo antes posible.</p>
        </div>
        <Col md={8} lg={6} className="mx-auto">
          <form >
            <div className="mb-3">
              <label for="contactName" className="form-label">Nombre</label>
              <input type="text" className="form-control" id="contactName" required />
            </div>
            <div className="mb-3">
              <label for="contactEmail" className="form-label">Correo electrónico</label>
              <input type="email" className="form-control" id="contactEmail" required />
            </div>
            <div className="mb-3">
              <label for="contactPhone" className="form-label">Teléfono</label>
              <input type="tel" className="form-control" id="contactPhone" required />
            </div>
            <div className="mb-3">
              <label for="contactMsg" className="form-label">Mensaje</label>
              <textarea type="tel" className="form-control" id="contactMsg" rows="4" placeholder="Escribe tu consulta aquí..." required />
            </div>

            <button type="submit" className="btn btn-primary fw-bolder">Enviar</button>
          </form>
        </Col>
      </Row>
      <hr />
      {/* Seccion Ubicación*/}
      <Row className='py-5'>
        <Col md={6}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19815.92940432699!2d-55.881701761438094!3d-27.299910777038544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945794f84d51ca23%3A0x7492eeeff96f2b52!2sAwa%20Resort%20Hotel!5e0!3m2!1ses!2spy!4v1742584060488!5m2!1ses!2spy"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Col>
        <Col md={6}>
          <h2 className='subtitle'>Nuestra ubicación</h2>
          <p className="justify">Nuestro hotel se encuentra en la costanera de Encarnación, en una ubicación privilegiada frente al río Paraná. Disfruta de vistas espectaculares, acceso directo a las playas y la cercanía a los principales atractivos turísticos, restaurantes y centros comerciales de la ciudad. Un lugar ideal para relajarse y explorar lo mejor de Encarnación.</p>
        </Col>
      </Row>

    </Container>
  );
};

export default Home;
