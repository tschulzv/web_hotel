import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo_hotel from '../img/logo_hotel.png';
import axios from "../config/axiosConfig"

const Navigation = () => {
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const response = await axios.get(`/TiposHabitaciones`);
        setTipos(response.data);
      } catch (err) {
        console.log('Error al cargar los tipos de habitación');
      } 
    };
    fetchTipos();
  }, []);
  
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="bg-body-primary">
    <Container>
      <Navbar.Brand href="/"><img src={logo_hotel} height="60"></img></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="/">Inicio</Nav.Link>
          <NavDropdown title="Habitaciones" id="basic-nav-dropdown">
            {
              tipos?.map((t)=>(
                <NavDropdown.Item href={`/habitaciones/${t.id}`}>{t.nombre}</NavDropdown.Item>

              ))
            }
          </NavDropdown>
          <Nav.Link href="/restaurante">Restaurante</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Navigation