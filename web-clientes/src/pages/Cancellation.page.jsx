import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import '../index.css';

const Cancellation = () => {
    const [reason, setReason] = useState('');// Estado para almacenar el motivo de cancelación
    const [submitted, setSubmitted] = useState(false);
    const [cancelRoomIndex, setCancelRoomIndex] = useState(null); // Estado para almacenar el índice de la habitación a cancelar


    // Simulación de datos del cliente (esto debería venir de la base de datos)
    const [Client, setClient] = useState ({
        name: "Juan Pérez",
        id_code: "123456",
        check_in: "2025-10-01",
        check_out: "2025-10-05",
        rooms: [
            { type: "estandar", adults: 1, children: 2 },
            { type: "ejecutivo", adults: 2, children: 0 }
        ]
    });
   

    const handleCancel = (index) => {
        setCancelRoomIndex(index); // Guardar el índice de la habitación a cancelar
    }

    const handleConfirm = () => {
      const updatedRooms = Client.rooms.filter((_, index) => index !== cancelRoomIndex); // Filtrar la habitación a cancelar
      setClient({Client, rooms: updatedRooms}); // Actualizar el estado del cliente con las habitaciones restantes
      alert(`Cancelación confirmada para habitación ${Client.rooms[cancelRoomIndex].type} con motivo: ${reason}`);
      setCancelRoomIndex(null); // Reiniciar el índice de habitación
      setReason(''); // Reiniciar el motivo de cancelación
    }

  return (
    <Container style={{ maxWidth: '800px', marginTop: '3rem', marginBottom: '3rem' }}>
      <Card className="p-4 shadow-sm">
          <h3 className="main-title text-start"><strong>MI RESERVA</strong></h3>
          <Row>
            <Col md={10}>
              <p className="justify"><strong>Cliente: </strong>{Client.name}</p>
            </Col>
            <Col md={10}>
              <p className="justify"><strong>Código de Identificación: </strong>{Client.id_code}</p>
            </Col>
            <Col md={10}>
              <p className="justify"><strong>Check-in: </strong>{Client.check_in}</p>
            </Col>
            <Col md={10}>
              <p className="justify"><strong>Check-out: </strong>{Client.check_out}</p>
            </Col>
          </Row>
            

          <hr/>
         
          <h5 className="subtitle text-start">DETALLES</h5>
          <Row className="mb-3">
            {Client.rooms.map((room, index) => (
              <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                <p className={`mb-0 ${cancelRoomIndex === index ? 'text-danger fw-bold' : ''}`}>
                Habitación de tipo {room.type}, {room.adults} adulto(s)
                {room.children > 0 && ` y ${room.children} niño(s)`}
                </p>
                <button className="btn btn-dark fw-bolder" onClick={() => handleCancel(index)}>CANCELAR
                </button>
              </div>
          ))}
          </Row>
          
          <hr />

          {cancelRoomIndex !== null && (
            <>
            <h5 className="subtitle text-start">CANCELACIÓN</h5>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <Form.Group controlId="cancelReason" className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Motivo"
                  className="cancel-textarea"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
                <small>⚠️ Se aplicará una penalización por cancelación tardía</small>
      
              </Form.Group>
              <div className="d-flex flex-column align-items-center">
                
                <Button className="btn btn-dark fw-bolder" onClick={handleConfirm}>CONFIRMAR</Button>
              </div>  
            </div>
  
            
            </>
          )}
      </Card>
    </Container>
  );
};

export default Cancellation;
