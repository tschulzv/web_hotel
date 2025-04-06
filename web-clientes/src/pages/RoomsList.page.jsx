import React, { useState } from "react";
import { Card, Button, Container, Row, Col, Badge } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import estandar from "../img/habitacion-estandar.png";
import deluxe from "../img/habitacion-deluxe.png";
import presidencial from "../img/suite-presidencial.png";
import { TbAirConditioning } from "react-icons/tb";
import { FaCouch, FaWifi, FaHotTub, FaBriefcaseMedical, FaMusic, FaChromecast } from "react-icons/fa";
import { RiFridgeFill } from "react-icons/ri";
import { BsFillSafe2Fill } from "react-icons/bs";
import { PiHairDryerFill } from "react-icons/pi";

const serviceIcons = {
    "Wi-Fi": <FaWifi />, "TV": <FaChromecast />, "Aire acondicionado": <TbAirConditioning />,
    "Caja fuerte": <BsFillSafe2Fill />, "Minibar": <RiFridgeFill />, "Jacuzzi": <FaHotTub />,
    "Botiquín": <FaBriefcaseMedical />, "Balcón": <FaCouch />, "Secador de cabello": <PiHairDryerFill />,
    "Música ambiental": <FaMusic />,
};

const toLocalDate = (dateStr) => {
    if (dateStr instanceof Date) return dateStr;
    const [year, month, day] = dateStr.split("-");
    return new Date(year, month - 1, day);
};

const formatDayOfWeek = (dateStr) => toLocalDate(dateStr).toLocaleDateString("es-ES", { weekday: "long" });
const formatDayMonth = (dateStr) => toLocalDate(dateStr).toLocaleDateString("es-ES", { day: "2-digit", month: "long" });

const RoomsList = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const checkIn = queryParams.get("checkIn");
    const checkOut = queryParams.get("checkOut");
    const roomsQuery = queryParams.get("rooms");
    const initialHabitaciones = roomsQuery ? JSON.parse(decodeURIComponent(roomsQuery)) : [];
    const [habitaciones, setHabitaciones] = useState(initialHabitaciones);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const rooms = [
        {
            id: 1,
            name: "Suite Presidencial",
            price: 540000,
            originalPrice: 600000,
            size: "64 m²",
            occupancy: "4 personas",
            beds: "1 Cama King Size, 2 Camas Individuales",
            services: ["Wi-Fi", "TV", "Aire acondicionado", "Caja fuerte", "Minibar", "Jacuzzi"],
            image: presidencial,
            discount: true,
            offer: true,
        },
        {
            id: 2,
            name: "Habitación Estándar",
            price: 250000,
            size: "32 m²",
            occupancy: "2 personas",
            beds: "2 Camas Individuales",
            services: ["Wi-Fi", "TV"],
            image: estandar,
            offer: false,
        },
        {
            id: 3,
            name: "Habitación Deluxe",
            price: 270000,
            size: "35 m²",
            occupancy: "2 personas",
            beds: "1 Cama King Size",
            services: ["Wi-Fi", "TV", "Balcón", "Aire acondicionado"],
            image: deluxe,
            offer: false,
        },
    ];

    const selectTariff = (room) => {
        const selectedInfo = habitaciones[currentIndex];
        const selected = { ...room, ...selectedInfo };
        const newSelected = [...selectedRooms];
        newSelected[currentIndex] = selected;
        setSelectedRooms(newSelected);
        if (currentIndex + 1 < habitaciones.length) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const removeRoom = (index) => {
        const updated = [...selectedRooms];
        updated.splice(index, 1);
        setSelectedRooms(updated);
        if (index <= currentIndex && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleAddRoom = () => {
        if (habitaciones.length < 5) {
            const newHabitacion = { adults: 2, children: 0 }; // valores por defecto, podés personalizar
            setHabitaciones([...habitaciones, newHabitacion]);
        }
    };


    const handleConfirm = () => {
        navigate("/confirmarReserva");
    };

    return (
        <Container className="mt-4 mb-5">
            <Row className="mb-3 align-items-center">
                <Col md={3} className="text-start">
                    <div className="d-flex align-items-center gap-3 justify-content-between">
                        {/* Check-In */}
                        <div className="text-center">
                            <div className="fw-bold fs-6">
                                {checkIn ? formatDayOfWeek(checkIn) : '--'}
                            </div>
                            <div className="fs-5">
                                {checkIn ? formatDayMonth(checkIn) : '--'}
                            </div>
                            <div className="text-muted small">Check-In</div>
                        </div>

                        <div className="fs-4">→</div>

                        {/* Check-Out */}
                        <div className="text-center">
                            <div className="fw-bold fs-6">
                                {checkOut ? formatDayOfWeek(checkOut) : '--'}
                            </div>
                            <div className="fs-5">
                                {checkOut ? formatDayMonth(checkOut) : '--'}
                            </div>
                            <div className="text-muted small">Check-Out</div>
                        </div>
                    </div>
                </Col>
                <Col>
                    <div className="fw-medium">
                        {habitaciones[currentIndex]?.adults || 0} adulto(s)
                        {habitaciones[currentIndex]?.children > 0 && ` • ${habitaciones[currentIndex].children} niño(s)`}
                    </div>
                </Col>
                <Col className="text-end">
                    {habitaciones.map((_, index) => (
                        <Badge
                            key={index}
                            bg={index === currentIndex ? "primary" : "secondary"}
                            className="me-2"
                        >
                            Habitación {index + 1}
                        </Badge>
                    ))}
                    {selectedRooms.length < 5 && (
                        <Button size="sm" onClick={handleAddRoom}>+</Button>
                    )}

                </Col>
            </Row>
            
            <hr></hr>
            <Row className="justify-content-between align-items-center mb-3">
                <Col>
                    <h4>Selección de Habitaciones</h4>
                </Col>
            </Row>

            <Row>
                {rooms.map((room) => (
                    <Col md={12} key={room.id} className="mb-4">
                        <Card className={`shadow ${room.offer ? "border border-warning border-3" : ""}`}>
                            {room.offer && (
                                <Badge bg="danger" className="position-absolute top-0 start-0 m-2 p-2">OFERTA 10%</Badge>
                            )}
                            <Row className="g-0">
                                <Col md={4}>
                                    <Card.Img src={room.image} alt={room.name} style={{ height: "100%", objectFit: "cover" }} />
                                </Col>
                                <Col md={8}>
                                    <Card.Body>
                                        <Card.Title>{room.name}</Card.Title>
                                        <Card.Text>
                                            <strong>Máxima Ocupación:</strong> {room.occupancy}<br />
                                            <strong>Tamaño:</strong> {room.size}<br />
                                            <strong>Tipos de cama:</strong> {room.beds}
                                        </Card.Text>
                                        <div className="d-flex flex-wrap gap-2">
                                            {room.services.map((s, i) => (
                                                <span key={i} className="d-flex align-items-center gap-1">{serviceIcons[s]} {s}</span>
                                            ))}
                                        </div>
                                        {room.discount && (
                                            <Card.Text className="text-danger mt-2">
                                                <del>Gs. {room.originalPrice.toLocaleString()}</del>
                                            </Card.Text>
                                        )}
                                        <Card.Text className="fw-bold fs-5">
                                            Gs. {room.price.toLocaleString()}
                                        </Card.Text>
                                        <Button variant="success" className="w-100" onClick={() => selectTariff(room)}>
                                            Seleccionar Tarifa
                                        </Button>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Resumen fijo en la parte inferior */}
            <div className="room-summary-bar bg-light shadow p-3 rounded position-fixed bottom-0 start-0 end-0">
                <Container>
                    <Row className="align-items-center">
                        <Col md={9}>
                            <strong>Resumen:</strong>
                            {selectedRooms.map((room, i) => (
                                <Badge key={i} className="ms-2">
                                    Habitación {i + 1}: {room.name}
                                    <Button size="sm" variant="danger" className="ms-2" onClick={() => removeRoom(i)}>x</Button>
                                </Badge>
                            ))}
                        </Col>
                        <Col md={3} className="text-end">
                            {selectedRooms.length === habitaciones.length && (
                                <Button variant="primary" onClick={handleConfirm}>Confirmar Reserva</Button>
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>
        </Container>
    );
};

export default RoomsList;
