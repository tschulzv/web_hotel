import React, { useState, useEffect } from 'react';
import {Container, Row, Col} from "react-bootstrap"

/* Componente que contiene un icono, un titulo y una descripcion opcional
usado por ej. en 'Servicios'*/

/* recibe el nombre de la librería y el nombre del icono para poder importarlo
/ EJEMPLO: para crear un icono { FaRegSnowflake } de "react-icons/fa";
/ recibe name = FaRegSnowFlake
/ y library = fa
*/
const IconDescription = ({icon, size, title, text}) => {
  //const [icon, setIcon] = useState(null);
  
  
    /*
    const loadIcon = async () => {
      try {
        // importar dinamicamente de la libreria correspondiente
        const { [name]: LoadedIcon } = await import(`react-icons/${library}`);
        setIcon(() => LoadedIcon); // Usar como función para evitar advertencias
      } catch (error) {
        console.error(`Error al cargar el icono: ${name}`, error);
      }
    };
    loadIcon();
  }, [name]);*/
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

export default IconDescription;
