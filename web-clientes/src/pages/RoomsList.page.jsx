import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col, Badge, Modal, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../config/axiosConfig";

// Íconos de servicios
import { TbAirConditioning } from "react-icons/tb";
import { FaCouch, FaWifi, FaHotTub, FaBriefcaseMedical, FaMusic, FaChromecast } from "react-icons/fa";
import { RiFridgeFill } from "react-icons/ri";
import { BsFillSafe2Fill } from "react-icons/bs";
import { PiHairDryerFill } from "react-icons/pi";

const serviceIcons = {
    "Wi-Fi": <FaWifi />, "TV": <FaChromecast />, "Aire acondicionado": <TbAirConditioning />,
    "Caja fuerte": <BsFillSafe2Fill />, "Minibar": <RiFridgeFill />, "Jacuzzi": <FaHotTub />,
    "Botiquín": <FaBriefcaseMedical />, "Balcón": <FaCouch />, "Secador de cabello": <PiHairDryerFill />,
    "Música ambiental": <FaMusic />
};

const toLocalDate = dateStr => {
    if (dateStr instanceof Date) return dateStr;
    const [year, month, day] = dateStr.split("-");
    return new Date(year, month - 1, day);
};
const formatDayOfWeek = dateStr => toLocalDate(dateStr).toLocaleDateString("es-ES", { weekday: "long" });
const formatDayMonth = dateStr => toLocalDate(dateStr).toLocaleDateString("es-ES", { day: "2-digit", month: "long" });

export default function RoomsList() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const checkIn = queryParams.get("checkIn");
    const checkOut = queryParams.get("checkOut");
    const roomsQuery = queryParams.get("rooms");
    const initialHabitaciones = roomsQuery ? JSON.parse(decodeURIComponent(roomsQuery)) : [];

    const [habitaciones, setHabitaciones] = useState(initialHabitaciones);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [availableRoomTypes, setAvailableRoomTypes] = useState([]);
    const [selectedRooms, setSelectedRooms] = useState(Array(initialHabitaciones.length).fill(null));
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [newRoomData, setNewRoomData] = useState({ adults: 1, children: 0 });

    // Fetch opciones sólo para la habitación actual y ajustar stock según selecciones previas
    const fetchForRoom = async idx => {
        setLoading(true);
        setError("");
        try {
            const req = {
                checkIn,
                checkOut,
                habitacionesSolicitadas: [
                    { adultos: habitaciones[idx].adults, ninos: habitaciones[idx].children }
                ]
            };
            const response = await axios.post("Habitacions/disponibles", req);
            // Ajustar disponibilidad restando las selecciones previas de habitaciones < idx
            const adjusted = response.data
                .map(rt => {
                    const timesSelected = selectedRooms
                        .slice(0, idx)
                        .filter(sel => sel && sel.id === rt.id)
                        .length;
                    return { ...rt, cantidadDisponible: rt.cantidadDisponible - timesSelected };
                })
                .sort((a, b) => {
                    if (a.maximaOcupacion === b.maximaOcupacion) {
                        return b.cantidadDisponible - a.cantidadDisponible; // Ordenar por cantidad disponible (descendente)
                    }
                    return a.maximaOcupacion - b.maximaOcupacion; // Ordenar por máxima ocupación (ascendente)
                });
            setAvailableRoomTypes(adjusted);
        } catch (err) {
            console.error(err);
            setError("Error al cargar tipos de habitación disponibles.");
        } finally {
            setLoading(false);
        }
    };

    // Ejecutar fetch cuando cambia índice o habitaciones
    useEffect(() => {
        if (habitaciones.length > 0 && currentIndex < habitaciones.length) {
            fetchForRoom(currentIndex);
        } else {
            setLoading(false);
        }
    }, [currentIndex, habitaciones]);

    // Selección de tipo de habitación
    const selectRoomType = roomType => {
        // Restaurar stock si ya había selección previa
        const prev = selectedRooms[currentIndex];
        if (prev) {
            setAvailableRoomTypes(list =>
                list.map(r => r.id === prev.id ? { ...r, cantidadDisponible: r.cantidadDisponible + 1 } : r)
            );
        }
        // Guardar selección
        const updated = [...selectedRooms];
        updated[currentIndex] = roomType;
        setSelectedRooms(updated);
        // Descontar stock
        setAvailableRoomTypes(list =>
            list.map(r => r.id === roomType.id ? { ...r, cantidadDisponible: r.cantidadDisponible - 1 } : r)
        );
        // Avanzar
        if (currentIndex + 1 < habitaciones.length) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    // Agregar habitación
    const handleAddRoom = () => setShowModal(true);
    const handleModalClose = () => setShowModal(false);
    const handleModalSave = () => {
        if (habitaciones.length < 5) {
            const updated = [...habitaciones, { adults: newRoomData.adults, children: newRoomData.children }];
            setHabitaciones(updated);
            setSelectedRooms([...selectedRooms, null]);
            setCurrentIndex(updated.length - 1);
        }
        setShowModal(false);
    };

    // Eliminar habitación
    const removeRoom = idx => {
        const habs = [...habitaciones]; habs.splice(idx, 1);
        setHabitaciones(habs);
        const sels = [...selectedRooms]; sels.splice(idx, 1);
        setSelectedRooms(sels);
        if (idx <= currentIndex && currentIndex > 0) setCurrentIndex(currentIndex - 1);
    };

    // Confirmar reserva → página resumen
    const handleConfirm = () => {
        navigate("/habitaciones/reserva", { state: { selectedRooms, checkIn, checkOut } });
    };

    if (loading) return <p className="text-center mt-4">Cargando opciones...</p>;
    if (error) return <p className="text-center text-danger mt-4">{error}</p>;

    return (
        <Container className="mt-4 mb-5">
            <Row className="mb-4 align-items-center">
                <Col md={6} className="d-flex flex-column align-items-start">
                    <div className="d-flex align-items-center gap-3">
                        <div className="text-center">
                            <div className="fw-bold fs-5 text-primary">{formatDayOfWeek(checkIn)}</div>
                            <div className="fs-4">{formatDayMonth(checkIn)}</div>
                            <div className="text-muted small">Check-In</div>
                        </div>
                        <div className="fs-3 text-secondary">→</div>
                        <div className="text-center">
                            <div className="fw-bold fs-5 text-primary">{formatDayOfWeek(checkOut)}</div>
                            <div className="fs-4">{formatDayMonth(checkOut)}</div>
                            <div className="text-muted small">Check-Out</div>
                        </div>
                        <div>
                            <h4 className="mt-3">Habitaciones solicitadas</h4>
                            {habitaciones.map((h, i) => (
                                <div key={i} className="d-flex justify-content-between align-items-center mb-2">
                                    <span>Habitación {i + 1}</span>
                                    <span>{h.adults} Adulto{h.adults > 1 ? "s" : ""}, {h.children} Niño{h.children > 1 ? "s" : ""}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </Col>
                <Col md={6} className="d-flex justify-content-end align-items-center">
                    <div className="d-flex flex-wrap gap-2">
                        {habitaciones.map((_, i) => (
                            <Badge
                                key={i}
                                bg={i === currentIndex ? "primary" : "secondary"}
                                className="d-flex align-items-center gap-2 p-2"
                                style={{ borderRadius: "20px", fontSize: "1rem" }}
                            >
                                <span>Hab {i + 1}</span>
                                {i !== 0 && (
                                    <Button
                                        size="sm"
                                        variant="danger"
                                        style={{ borderRadius: "50%", width: "25px", height: "25px" }}
                                        onClick={() => removeRoom(i)}
                                    >
                                        ×
                                    </Button>
                                )}
                            </Badge>
                        ))}
                        <Button
                            size="sm"
                            style={{ borderRadius: "50%", width: "30px", height: "30px", backgroundColor: "#28a745", color: "white" }}
                            onClick={handleAddRoom}
                        >
                            +
                        </Button>
                    </div>
                </Col>
            </Row>

            <h4>Seleccione tipo de habitación para Habitación {currentIndex + 1}</h4>
            <Row>
                {availableRoomTypes.map(rt => (
                    <Col md={12} key={rt.id} className="mb-3">
                        <Card>
                            <Row className="g-0">
                                <Col md={4}>
                                    <Card.Img src={rt.imagenes[0]?.url} alt={rt.nombre} style={{ objectFit: 'cover', height: '100%' }} />
                                </Col>
                                <Col md={8}>
                                    <Card.Body>
                                        <Card.Title>{rt.nombre}</Card.Title>
                                        <Card.Text>
                                            <strong>Max Ocupación:</strong> {rt.maximaOcupacion}<br />
                                            <strong>Tamaño:</strong> {rt.tamanho} m²
                                        </Card.Text>
                                        <div className="mb-2">
                                            {rt.servicios.map(s => (
                                                <span key={s.id} className="me-2">{serviceIcons[s.nombre]} {s.nombre}</span>
                                            ))}
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="fw-bold">$ {rt.precioBase?.toLocaleString()}</span>
                                            <span className="text-muted">{rt.cantidadDisponible} disp.</span>
                                        </div>
                                        <Button className="mt-2 w-100" onClick={() => selectRoomType(rt)} disabled={rt.cantidadDisponible === 0}>
                                            Seleccionar
                                        </Button>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Resumen */}
            <div className="position-fixed bottom-0 start-0 end-0 bg-light p-3 shadow">
                <Container>
                    <Row className="align-items-center">
                        <Col>
                            <strong>Resumen:</strong>
                            {selectedRooms.map((sel, i) => sel && (
                                <Badge key={i} bg="info" className="ms-2">
                                    Hab {i + 1}: {sel.nombre}
                                </Badge>
                            ))}
                        </Col>
                        <Col className="text-end">
                            {selectedRooms.filter(Boolean).length === habitaciones.length &&
                                <Button onClick={handleConfirm}>Confirmar Reserva</Button>
                            }
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Modal Agregar Habitación */}
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton><Modal.Title>Agregar Habitación</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Adultos</Form.Label>
                            <Form.Control type="number" min={1} name="adults" value={newRoomData.adults}
                                onChange={e => setNewRoomData(prev => ({ ...prev, adults: parseInt(e.target.value) }))} />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Niños</Form.Label>
                            <Form.Control type="number" min={0} name="children" value={newRoomData.children}
                                onChange={e => setNewRoomData(prev => ({ ...prev, children: parseInt(e.target.value) }))} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>Cancelar</Button>
                    <Button variant="primary" onClick={handleModalSave}>Agregar</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
