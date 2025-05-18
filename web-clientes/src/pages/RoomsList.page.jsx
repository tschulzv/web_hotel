// src/pages/RoomsList.page.jsx

import React, { useState, useEffect, useRef } from "react";
import { Card, Button, Container, Row, Col, Badge, Modal, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../config/axiosConfig";
import DatePicker from "../components/DatePicker";

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

const toISODate = date => date ? date.toISOString().split('T')[0] : null;

export default function RoomsList() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const initialCheckIn = queryParams.get("checkIn");
    const initialCheckOut = queryParams.get("checkOut");
    const roomsQuery = queryParams.get("rooms");
    const initialHabitaciones = roomsQuery
        ? JSON.parse(decodeURIComponent(roomsQuery))
        : [];

    const [checkInDate, setCheckInDate] = useState(initialCheckIn ? new Date(initialCheckIn) : null);
    const [checkOutDate, setCheckOutDate] = useState(initialCheckOut ? new Date(initialCheckOut) : null);
    const [habitaciones, setHabitaciones] = useState(initialHabitaciones);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [availableRoomTypes, setAvailableRoomTypes] = useState([]);
    const [selectedRooms, setSelectedRooms] = useState(Array(initialHabitaciones.length).fill(null));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [newRoomData, setNewRoomData] = useState({ adults: 1, children: 0 });

    const isFirstRender = useRef(true);

    const fetchAvailableRooms = async (idx, inDate, outDate) => {
        setLoading(true);
        setError("");
        try {
            const req = {
                checkIn: toISODate(inDate),
                checkOut: toISODate(outDate),
                habitacionesSolicitadas: [
                    { adultos: habitaciones[idx].adults, ninos: habitaciones[idx].children }
                ]
            };
            const res = await axios.post("Habitacions/disponibles", req);
            const data = res.data
                .map(rt => {
                    const alreadySelected = selectedRooms
                        .slice(0, idx)
                        .filter(r => r?.id === rt.id).length;
                    return {
                        ...rt,
                        cantidadDisponible: rt.cantidadDisponible - alreadySelected
                    };
                })
                .sort((a, b) =>
                    a.maximaOcupacion === b.maximaOcupacion
                        ? b.cantidadDisponible - a.cantidadDisponible
                        : a.maximaOcupacion - b.maximaOcupacion
                );
            setAvailableRoomTypes(data);
        } catch {
            setError("Error al cargar los tipos de habitación disponibles.");
        } finally {
            setLoading(false);
        }
    };

    // Solo dispara al cambiar checkOutDate, después de elegir checkIn
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (checkInDate && checkOutDate) {
            setCurrentIndex(0);
            setSelectedRooms(Array(habitaciones.length).fill(null));
            fetchAvailableRooms(0, checkInDate, checkOutDate);
        }
    }, [checkOutDate, habitaciones]);

    // Dispara al cambiar la habitación actual
    useEffect(() => {
        if (
            habitaciones.length &&
            currentIndex < habitaciones.length &&
            checkInDate &&
            checkOutDate
        ) {
            fetchAvailableRooms(currentIndex, checkInDate, checkOutDate);
        }
    }, [currentIndex, habitaciones]);

    const handleDateChange = ({ selection }) => {
        const newCheckIn = selection.startDate;
        const newCheckOut = selection.endDate;

        // Si cambió el check-in, resetear el check-out
        if (!checkInDate || newCheckIn.getTime() !== checkInDate.getTime()) {
            setCheckInDate(newCheckIn);
            if (newCheckOut && newCheckOut.getTime() !== newCheckIn.getTime()) {
                setCheckOutDate(newCheckOut);
            } else {
                setCheckOutDate(null);
            }
        } else {
            setCheckOutDate(newCheckOut);
        }
    };


    const selectRoomType = roomType => {
        const prev = selectedRooms[currentIndex];
        if (prev) {
            setAvailableRoomTypes(list =>
                list.map(r =>
                    r.id === prev.id
                        ? { ...r, cantidadDisponible: r.cantidadDisponible + 1 }
                        : r
                )
            );
        }
        const updated = [...selectedRooms];
        updated[currentIndex] = roomType;
        setSelectedRooms(updated);
        setAvailableRoomTypes(list =>
            list.map(r =>
                r.id === roomType.id
                    ? { ...r, cantidadDisponible: r.cantidadDisponible - 1 }
                    : r
            )
        );
        if (currentIndex + 1 < habitaciones.length) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleAddRoom = () => setShowModal(true);
    const handleModalClose = () => setShowModal(false);
    const handleModalSave = () => {
        if (habitaciones.length < 5) {
            const newHabitaciones = [
                ...habitaciones,
                { adults: newRoomData.adults, children: newRoomData.children }
            ];
            setHabitaciones(newHabitaciones);
            setSelectedRooms([...selectedRooms, null]);
            setCurrentIndex(newHabitaciones.length - 1);
            if (checkOutDate) {
                fetchAvailableRooms(
                    newHabitaciones.length - 1,
                    checkInDate,
                    checkOutDate
                );
            }
        }
        setShowModal(false);
    };

    const removeRoom = idx => {
        const updatedHabs = habitaciones.filter((_, i) => i !== idx);
        const updatedSels = selectedRooms.filter((_, i) => i !== idx);
        setHabitaciones(updatedHabs);
        setSelectedRooms(updatedSels);
        if (idx <= currentIndex && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleConfirm = () => {
        navigate("/habitaciones/reserva", {
            state: {
                selectedRooms,
                checkIn: toISODate(checkInDate),
                checkOut: toISODate(checkOutDate)
            }
        });
    };

    if (loading) return <p className="text-center mt-4">Cargando opciones...</p>;
    if (error) return <p className="text-center text-danger mt-4">{error}</p>;

    return (
        <Container className="mt-4 mb-5">
            <Row className="mb-4 align-items-start">
                <Col md={3} className="d-flex flex-column align-items-start">
                    <h4>Seleccionar Fechas</h4>
                    <DatePicker
                        ranges={[{ startDate: checkInDate, endDate: checkOutDate, key: 'selection' }]}
                        onChange={handleDateChange}
                    />
                    {checkInDate && !checkOutDate && (
                        <small className="text-muted">Por favor, selecciona la fecha de check-out</small>
                    )}

                </Col>
                <Col md={4} className="d-flex flex-column align-items-center">
                    <h4> Habitaciones Seleccionadas </h4>
                    {habitaciones.map((hab, i) => (
                        <div key={i} className="">
                            <span>Habitación {i + 1}: {hab.adults} Adulto{hab.adults > 1 ? 's' : ''}, {hab.children} Niño{hab.children > 1 ? 's' : ''}</span>
                        </div>
                    ))}
                </Col>
                <Col md={5} className="d-flex justify-content-end flex-wrap gap-2 mt-3">
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
                        onClick={handleAddRoom}
                        style={{
                            borderRadius: "50%",
                            width: "30px",
                            height: "30px",
                            backgroundColor: "#28a745",
                            color: "white"
                        }}
                    >
                        +
                    </Button>
                </Col>
            </Row>

            <h4 className="mb-3">
                Seleccione tipo de habitación para Habitación {currentIndex + 1}
            </h4>
            <Row>
                {availableRoomTypes.map(rt => (
                    <Col md={12} key={rt.id} className="mb-3">
                        <Card>
                            <Row className="g-0">
                                <Col md={4}>
                                    <Card.Img
                                        src={rt.imagenes[0]?.url}
                                        alt={rt.nombre}
                                        style={{ height: '100%', objectFit: 'cover' }}
                                    />
                                </Col>
                                <Col md={8}>
                                    <Card.Body>
                                        <Card.Title>{rt.nombre}</Card.Title>
                                        <Card.Text>
                                            <strong>Ocupación Máxima:</strong> {rt.maximaOcupacion}<br />
                                            <strong>Tamaño:</strong> {rt.tamanho} m²
                                        </Card.Text>
                                        <div className="mb-2">
                                            {rt.servicios.map(s => (
                                                <span key={s.id} className="me-2">
                                                    {serviceIcons[s.nombre]} {s.nombre}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span className="fw-bold">$ {rt.precioBase?.toLocaleString()}</span>
                                            <span className="text-muted">{rt.cantidadDisponible} disp.</span>
                                        </div>
                                        <Button
                                            className="mt-2 w-100"
                                            onClick={() => selectRoomType(rt)}
                                            disabled={rt.cantidadDisponible === 0}
                                        >
                                            Seleccionar
                                        </Button>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>

            <div className="position-fixed bottom-0 start-0 end-0 bg-light p-3 shadow">
                <Container>
                    <Row className="align-items-center">
                        <Col>
                            <strong>Resumen:</strong>
                            {selectedRooms.map((sel, i) =>
                                sel ? (
                                    <Badge key={i} bg="info" className="ms-2">
                                        Hab {i + 1}: {sel.nombre}
                                    </Badge>
                                ) : null
                            )}
                        </Col>
                        <Col className="text-end">
                            <Button onClick={handleConfirm} disabled={selectedRooms.includes(null)}>
                                Confirmar selección
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Modal show={showModal} onHide={handleModalClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Habitación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Adultos</Form.Label>
                        <Form.Control
                            type="number"
                            min="1"
                            value={newRoomData.adults}
                            onChange={e => setNewRoomData({ ...newRoomData, adults: +e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Niños</Form.Label>
                        <Form.Control
                            type="number"
                            min="0"
                            value={newRoomData.children}
                            onChange={e => setNewRoomData({ ...newRoomData, children: +e.target.value })}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>Cancelar</Button>
                    <Button variant="primary" onClick={handleModalSave}>Agregar</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
