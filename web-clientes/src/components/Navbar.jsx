import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo_hotel from '../img/logo_hotel.png';
const Navigation = () => {
  /* funcion para scrollear a secciones especificas de la pagina
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };*/

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="bg-body-primary">
    <Container>
      <Navbar.Brand href="/"><img src={logo_hotel} height="60"></img></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="/">Inicio</Nav.Link>
          <NavDropdown title="Habitaciones" id="basic-nav-dropdown">
            <NavDropdown.Item href="/habitaciones/estandar">Estandar</NavDropdown.Item>
            <NavDropdown.Item href="/habitaciones/deluxe">Deluxe</NavDropdown.Item>
            <NavDropdown.Item href="/habitaciones/presidencial">Presidencial</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/restaurante">Restaurante</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Navigation