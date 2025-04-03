import React, { useState, useEffect } from 'react';
import {Container, Row, Col} from "react-bootstrap"

/* Componente que contiene un icono, un titulo y una descripcion opcional
usado por ej. en 'Servicios'*/

/* 
/ icon = NOMBRE del icono de google material icons
/ EJEMPLO: para usar el icono https://fonts.google.com/icons?selected=Material+Icons:home:&icon.size=24&icon.color=%23e3e3e3&icon.platform=web&icon.query=window
/ pasar 'home'
/ iconSize = tamaño del icon, por ejemplo 2rem
/ frameSize = tamaño del recuadro
/ 
*/
const GoogleIconFrame = ({icon, iconSize, frameSize, title, text}) => {
  
  return (
    <Container className="py-3">
        <Row className="d-flex align-items-center justify-content-center">
            <Col md={3}>
              <div className='bg-light-gray rounded-corners d-flex align-items-center justify-content-center' style={{ maxWidth: `${frameSize}px`, height: `${frameSize}px` }}>
              <span className="material-icons" style={{ fontSize: `${iconSize}` }}>
                {icon}
              </span>
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

export default GoogleIconFrame;
