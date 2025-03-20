import React from 'react'
import { Container, Row, Col, Nav, Form, Button } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";  // Social icons from react-icons


const Footer = () => {
  return (
    <footer className="py-3"
    style={{ backgroundColor: '#3E7CB1', color: 'white' }}>
        <Container>
            <Row>
            {/* columna de redes sociales */}
            <Col md={4}>
                <div className="d-flex align-items-center">
                    <h5>Síguenos</h5>
                    <Nav>
                        <Nav.Link href="https://facebook.com" target="_blank" className="text-white">
                        <FaFacebook size={30} />
                        </Nav.Link>
                        <Nav.Link href="https://twitter.com" target="_blank" className="text-white">
                        <FaTwitter size={30} />
                        </Nav.Link>
                        <Nav.Link href="https://instagram.com" target="_blank" className="text-white">
                        <FaInstagram size={30} />
                        </Nav.Link>
                    </Nav>
                </div>
            </Col>

            {/* columna para subscripción */}
            <Col md={8}>
                <div className="d-flex align-items-center justify-content-around">
                    <p>Recibe Novedades y Promociones</p>
                    <Form className="d-flex">
                    <Form.Control
                        type="email"
                        placeholder="Ingresa tu correo"
                        className="mr-2"
                    />
                    <Button variant="primary">Subscribirse</Button>
                    </Form>
                </div>
            </Col>
            </Row>
            <Row>
                <Col md={12} className="text-center">
                    <p>© 2025 Hotel Los Alamos. Derechos Reservados.</p>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer;
