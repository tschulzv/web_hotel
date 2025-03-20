import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Navigation = () => {
  return (
    <Navbar expand="lg" className="bg-body-primary">
    <Container>
      <Navbar.Brand href="#home">Hotel Los Alamos</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#">Inicio</Nav.Link>
          <NavDropdown title="Habitaciones" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Estandar</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Deluxe</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Presidencial</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="#">Restaurante</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Navigation