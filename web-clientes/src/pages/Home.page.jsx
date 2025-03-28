import React, { useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import DatePicker from '../components/DatePicker';
import IconDescription from '../components/IconDescription';
import { FaSwimmingPool, FaWifi, FaDumbbell, FaAward } from "react-icons/fa";
import { MdLocalLaundryService, MdOutlineRestaurant, MdRoomService } from "react-icons/md";
import hotel from '../img/hotel.jpg';
import restaurante from '../img/restaurante.jpg';
import boda from '../img/boda.jpg';
const Home = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const searchTariffs = (e) => {
    e.preventDefault();
  };

  return (
    <Container className="py-5" style={{ maxWidth: "1200px" }}>
      <Row className="mb-5"> {/* Espacio entre secciones */}
        <Col md={5} className="d-flex flex-column align-items-start justify-content-center">
          <h1 className="main-title">Tu escape exclusivo</h1>
          <h5>Donde cada estancia se convierte en una experiencia inolvidable.</h5>
        </Col>
        <Col md={7}>
          <Image src={hotel} rounded fluid />
        </Col>
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

      <Row className="py-5 d-flex align-items-center justify-content-center w-100">
        <div className="text-center mb-4">
          <h2>Nuestros Servicios</h2>
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
          <h2>Distinciones y Premios</h2>
        </div>
        <Col>
        <div className='d-flex flex-column justify-content-start align-items-center text-center'>
          <div className='bg-white rounded-corners d-flex align-items-center justify-content-center' style={{ width: '90px', height: '90px' }}>
            <FaAward size={70} />
          </div>
          <h5 className='mt-3'>TripAdvisor's Traveler's Choice</h5>
        </div>
        </Col>
        <Col>
        <div className='d-flex flex-column justify-content-start align-items-center text-center'>
          <div className='bg-white rounded-corners d-flex align-items-center justify-content-center' style={{ width: '90px', height: '90px'}}>
            <FaAward size={70} />
          </div>
          <h5 className='mt-3'>Certificación de Excelencia de Booking.com</h5>
        </div>
        </Col>
        <Col>
        <div className='d-flex flex-column justify-content-start align-items-center text-center'>
          <div className='bg-white rounded-corners d-flex align-items-center justify-content-center' style={{ width: '90px', height: '90px' }}>
            <FaAward size={70} />
          </div>
          <h5 className='mt-3'>World Travel Awards</h5>
        </div>
        </Col>
      </Row>

      {/* Seccion Form Contacto*/ }
      <Row className='py-5'>
        <div className="text-center mb-4">
          <h2>Contacto</h2>
          <p>¿Tienes alguna consulta? Ponte en contacto con nosotros y te atenderemos lo antes posible.</p>
        </div>
        <Col md={8} lg={6} className="mx-auto">
          <form >
          <div class="mb-3">
            <label for="contactName" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="contactName" required/>
          </div>
          <div class="mb-3">
            <label for="contactEmail" class="form-label">Correo electrónico</label>
            <input type="email" class="form-control" id="contactEmail" required/>
          </div>
          <div class="mb-3">
            <label for="contactPhone" class="form-label">Teléfono</label>
            <input type="tel" class="form-control" id="contactPhone" required/>
          </div>
          <div class="mb-3">
            <label for="contactMsg" class="form-label">Mensaje</label>
            <textarea type="tel" class="form-control" id="contactMsg" rows="4" placeholder="Escribe tu consulta aquí..." required/>
          </div>
          
          <button type="submit" class="btn btn-primary">Enviar</button>
        </form>
        </Col>
      </Row>
      <hr />
      {/* Seccion Ubicación*/ }
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
          <h2>Nuestra ubicación</h2>
          <p className="justify">Nuestro hotel se encuentra en la costanera de Encarnación, en una ubicación privilegiada frente al río Paraná. Disfruta de vistas espectaculares, acceso directo a las playas y la cercanía a los principales atractivos turísticos, restaurantes y centros comerciales de la ciudad. Un lugar ideal para relajarse y explorar lo mejor de Encarnación.</p>
        </Col>
      </Row>

      </Container>
  );
};

export default Home;
