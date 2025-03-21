import React from 'react'
import {Container, Row, Col} from "react-bootstrap"

/* Componente que contiene un icono, un titulo y una descripcion opcional
usado por ej. en 'Servicios'*/
const IconDescription = ({icon, size, title, text}) => {
  return (
    <Container className="py-3">
        <Row className="d-flex align-items-center justify-content-center">
            <Col md={3}>
              <div className='bg-light-gray rounded-corners d-flex align-items-center justify-content-center' style={{ maxWidth: `${size}px`, height: `${size}px` }}>
                {icon}
              </div>
            </Col>
            <Col md={9}>
              <h5>{title}</h5>
              {text && 
                <p style={{ textAlign: "justify" }}>{text}</p>
              }
            </Col>
        </Row>
    </Container>
  )
}

export default IconDescription
