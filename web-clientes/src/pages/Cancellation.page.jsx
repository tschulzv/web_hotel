import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../config/axiosConfig';
import { Container, Row, Col, Form, Button, Card, ListGroup, Spinner, Collapse } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Cancellation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [razonHabitacion, setRazonHabitacion] = useState('');
  const [razonReserva, setRazonReserva] = useState('');
  const [selectedRoomIds, setSelectedRoomIds] = useState([]);
  const [openRooms, setOpenRooms] = useState([]);
  const [reserva, setReserva] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    axios
      .get(`Reservas/${id}`)
      .then((response) => {
        setReserva(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener la reserva:', error);
        toast.error('Error al cargar la reserva.');
      });
  }, [id]);

  // Función para agregar o quitar selección de una habitación
  const toggleSelectedRoom = (roomId) => {
    setSelectedRoomIds((prevSelected) =>
      prevSelected.includes(roomId)
        ? prevSelected.filter((id) => id !== roomId)
        : [...prevSelected, roomId]
    );
  };

  // Función para abrir o cerrar los detalles de una habitación
  const toggleOpenRoom = (roomId) => {
    setOpenRooms((prevOpen) =>
      prevOpen.includes(roomId)
        ? prevOpen.filter((id) => id !== roomId)
        : [...prevOpen, roomId]
    );
  };

  // Solicitud de cancelación para las habitaciones seleccionadas
  const handleConfirm = async () => {
  if (!razonHabitacion.trim()) {
    return toast.error('Debe indicar un motivo para solicitar cancelar.');
  }
  if (selectedRoomIds.length === 0) {
    return toast.error('No se han seleccionado habitaciones para cancelar.');
  }

  const payload = {
    ReservaId: reserva.id,
    CancelacionId: null,
    ConsultaId: null,
    EsLeida: false,
    Tipo: 'CancelacionHabitacion',
    DetalleReservaIds: selectedRoomIds,
    Motivo: razonHabitacion,
  };

  try {
    setIsSubmitting(true);
    await axios.post('Solicitudes', payload);
    toast.success('Se ha enviado la solicitud de cancelación para las habitaciones seleccionadas.');
    
    // Actualiza la lista de habitaciones eliminando las canceladas
    setReserva((prevReserva) => ({
      ...prevReserva,
      detalles: prevReserva.detalles.filter(room => !selectedRoomIds.includes(room.id))
    }));

    // Limpia la selección y el campo del motivo
    setSelectedRoomIds([]);
    setRazonHabitacion('');
  } catch (error) {
    console.error("Error al enviar solicitud de cancelación:", error);
    toast.error('Error al enviar la solicitud de cancelación para las habitaciones.');
  } finally {
    setIsSubmitting(false);
  }
};


  // Solicitud de cancelación para toda la reserva
  const handleCancelarReservaTotal = () => {
    if (!razonReserva.trim()) {
      return toast.error(
        'Debe indicar un motivo para solicitar cancelar la reserva.'
      );
    }

    axios
      .post('Solicitudes', {
        ReservaId: reserva.id,
        CancelacionId: null,
        ConsultaId: null,
        EsLeida: false,
        Tipo: 'CancelacionReserva',
        Motivo: razonReserva,
      })
      .then(() => {
        toast.success('Se ha enviado la solicitud de cancelación de la reserva.');
        setIsCancelled(true);
      })
      .catch((error) => {
        console.error(error);
        toast.error('Error al enviar la solicitud de cancelación de la reserva.');
      });
  };

  // Función para formatear la fecha en formato dd/mm/yyyy
  const obtenerFormatoFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    const opciones = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return fecha.toLocaleDateString('es-ES', opciones);
  };

  const obtenerPension = (statusId) => {
    switch (statusId) {
      case 1:
        return 'Sin Pensión';
      case 2:
        return 'Desayuno';
      case 3:
        return 'Media Pensión';
      case 4:
        return 'Pensión Completa';
      default:
        return 'N/A';
    }
  };

  if (isCancelled) {
    return (
      <Container style={{ maxWidth: '800px', marginTop: '3rem' }}>
        <Card className="p-4 shadow-sm">
          <h3 className="main-title text-center">Solicitud Enviada</h3>
          <p className="text-center">
            Se ha enviado la solicitud de cancelación. Recibirá un correo de confirmación.
          </p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Volver al inicio
          </Button>
        </Card>
      </Container>
    );
  }

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container style={{ maxWidth: '800px', marginTop: '3rem', marginBottom: '3rem' }}>
      <Card className="p-4 shadow-sm">
        <h3 className="main-title text-start">
          <strong>MI RESERVA</strong>
        </h3>
        <Row>
          <Col md={10}>
            <p className="justify">
              <strong>Cliente: </strong>
              {reserva.nombreCliente}
            </p>
          </Col>
          <Col md={10}>
            <p className="justify">
              <strong>Código de la reserva: </strong>
              {reserva.codigo}
            </p>
          </Col>
          <Col md={10}>
            <p className="justify">
              <strong>Check-in: </strong>
              {obtenerFormatoFecha(reserva.fechaIngreso)}
            </p>
          </Col>
          <Col md={10}>
            <p className="justify">
              <strong>Check-out: </strong>
              {obtenerFormatoFecha(reserva.fechaSalida)}
            </p>
          </Col>
        </Row>

        <hr />

        <h5>DETALLES DE HABITACIONES</h5>
        <p className="text-muted mb-3">
          Haz clic en el encabezado de cada habitación para ver u ocultar sus detalles.
        </p>
        <p style={{ color: 'red' }}>Puedes seleccionar para cancelar ciertas habitaciones</p>
        {/* Recorremos las habitaciones mostrando una Card para cada una */}
        {reserva.detalles.map((room) => {
          const isOpen = openRooms.includes(room.id);
          return (
            <Card key={room.id} className="mb-3">
              <Card.Header
                onClick={() => toggleOpenRoom(room.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span>Habitación de tipo {room.tipoHabitacion}</span>
                  <div>
                    <Button
                      size="sm"
                      variant={
                        selectedRoomIds.includes(room.id)
                          ? 'secondary'
                          : 'outline-secondary'
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelectedRoom(room.id);
                      }}
                    >
                      {selectedRoomIds.includes(room.id)
                        ? 'Seleccionada'
                        : 'Cancelar'}
                    </Button>
                    <Button
                      variant="link"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleOpenRoom(room.id);
                      }}
                    >
                      {isOpen ? '▲' : '▼'}
                    </Button>
                  </div>
                </div>
              </Card.Header>
              <Collapse in={isOpen}>
                <div>
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <strong>Cantidad de Adultos: </strong>
                        {room.cantidadAdultos}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Cantidad de niños: </strong>
                        {room.cantidadNinhos}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Tipo de pensión: </strong>
                        {obtenerPension(room.pensionId)}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </div>
              </Collapse>
            </Card>
          );
        })}

        {/* Formulario para cancelar habitaciones seleccionadas */}
        {selectedRoomIds.length > 0 && (
          <>
            <hr />
            <Row>
              <Col className="d-flex justify-content-center">
                <Form.Group controlId="cancelReasonHabitacion" className="w-75">
                  <Form.Label className="mb-1">
                    Motivo para cancelar habitaciones seleccionadas
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Ejemplo: cambio inesperado de planes, inconvenientes con la habitación, etc."
                    value={razonHabitacion}
                    onChange={(e) => setRazonHabitacion(e.target.value)}
                  />
                  <small className="text-muted">
                    ⚠️ Se aplicará una penalización por cancelación tardía.
                  </small>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col className="d-flex justify-content-center">
                <Button variant="danger" onClick={handleConfirm} disabled={isSubmitting}>
                  {isSubmitting ? 'Enviando...' : 'Confirmar Cancelación'}
                </Button>
              </Col>
            </Row>
          </>
        )}

        <hr />

        {/* Sección para cancelar toda la reserva */}
        <h5>Cancelar Reserva Completa</h5>
        <p className="text-muted mb-2">
          Si desea cancelar toda la reserva, indique el motivo.
        </p>
        <Row className="mt-2">
          <Col className="d-flex justify-content-center">
            <Form.Group controlId="cancelReasonReserva" className="w-75">
              <Form.Label className="mb-1">Motivo para cancelar toda la reserva</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ejemplo: cambio definitivo de planes, problemas personales, etc."
                value={razonReserva}
                onChange={(e) => setRazonReserva(e.target.value)}
              />
              <small className="text-muted">
                ⚠️ La cancelación de toda la reserva tendrá implicaciones generales.
              </small>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="d-flex justify-content-center">
            <Button variant="danger" onClick={handleCancelarReservaTotal}>
              Cancelar Reserva
            </Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Cancellation;
