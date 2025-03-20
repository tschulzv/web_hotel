import React from 'react'
import {Container, Row, Col, Image} from 'react-bootstrap'
import hotel from '../img/hotel.jpg';

const Home = () => {
  const searchTariffs = () => {

  }

  return (
    <Container className="py-5" style={{ maxWidth: "1200px" }}>
      <Row>
        <Col md={4} className="d-flex flex-column align-items-center justify-content-center">
          <h1>Tu escape exclusivo</h1>
          <h5>Donde cada estancia se convierte en una experiencia inolvidable.</h5>
        </Col>
        <Col md={8}>
          <Image src={hotel} rounded fluid/>
        </Col>
      </Row>
      <Row className='bg-light-gray py-5 d-flex align-items-center justify-content-center w-100'>
        <div className="text-center">
          <h2>Haz tu reserva</h2>
        </div>
        <form>
          <input name="checkin" type="date" id="checkin"></input>  
          <input name="checkout" type="date" id="checkout"></input>  
          <input name="adults" type="number" id="adults"></input>  
          <input name="children" type="number" id="children"></input>  
          <button type="submit" onClick={searchTariffs}>Buscar tarifas</button>
        </form>
      </Row>
      <Row className='py-5 d-flex align-items-center justify-content-center w-100'>
        <div className="text-center">
          <h2>Nuestros Servicios</h2>
        </div>
        <div className="d-flex flex-column justify-content-center w-100">
          <div>
            
          </div>
        </div>
        <p>Además de nuestras cómodas habitaciones, contamos con gimnasio, spa, restaurante y eventos especiales para que tu estadía sea memorable.</p>
      </Row>
    </Container>
  )
}

export default Home;