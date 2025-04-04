import React from "react";
import { Card, Button, Container, Row, Col, Badge } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import estandar from "../img/habitacion-estandar.png";
import deluxe from "../img/habitacion-deluxe.png";
import presidencial from "../img/suite-presidencial.png";
import { TbAirConditioning } from "react-icons/tb";
import { FaCouch, FaWifi, FaHotTub, FaBriefcaseMedical, FaMusic, FaChromecast } from "react-icons/fa";
import { RiFridgeFill } from "react-icons/ri";
import { BsFillSafe2Fill } from "react-icons/bs";
import { PiHairDryerFill } from "react-icons/pi";

// Mapeo de servicios con iconos
const serviceIcons = {
    "Wi-Fi": <FaWifi />,
    "TV": <FaChromecast />,
    "Aire acondicionado": <TbAirConditioning />,
    "Caja fuerte": <BsFillSafe2Fill />,
    "Minibar": <RiFridgeFill />,
    "Jacuzzi": <FaHotTub />,
    "Botiquín": <FaBriefcaseMedical />,
    "Balcón": <FaCouch />,
    "Secador de cabello": <PiHairDryerFill />,
    "Música ambiental": <FaMusic />,
};

// Funciones de formato nms
const toLocalDate = (dateStr) => {
    if (dateStr instanceof Date) return dateStr;
    const [year, month, day] = dateStr.split('-');
    return new Date(year, month - 1, day);
};

  // Formato de día de la semana
const formatDayOfWeek = (dateStr) => {
    const date = toLocalDate(dateStr);
    return date.toLocaleDateString('es-ES', { weekday: 'long' });
  };
  
  const formatDayMonth = (dateStr) => {
    const date = toLocalDate(dateStr);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
    });
  };
//-----

const selectTariff = (room) => {
    // @otto cambia esto para que funcione tu reserva
}
  
const RoomsList = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const checkIn = queryParams.get("checkIn");
    const checkOut = queryParams.get("checkOut");
    const adults = queryParams.get("adults");
    const children = queryParams.get("children");

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
            offer: true, // 🔥 Oferta especial
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

    const filteredRooms = rooms.filter((room) => {
        // Add filtering logic based on checkIn, checkOut, adults, and children if needed
        return true; // Placeholder: Adjust this logic as per requirements
    });

    return (
        <Container className="mt-4">
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

                <Col md={2} className="text-end">
                    <div className="d-flex align-items-center gap-2 justify-content-end">
                        <span className="fw-medium">{adults} adulto(s)</span>
                        {children > 0 && (
                            <>
                                <div className="vr"></div>
                                <span className="fw-medium">{children} niño(s)</span>
                            </>
                        )}
                    </div>
                </Col>
            </Row>
            <hr></hr>
            <h1 className="text-center mb-4">Habitaciones Disponibles</h1>
            {filteredRooms.map((room) => (
                <Row key={room.id} className="mb-4">
                    <Col md={12}>
                        <Card
                            className={`shadow position-relative ${room.offer ? "border border-3 border-warning" : ""}`}
                            style={room.offer ? { boxShadow: "0px 0px 15px rgba(255, 193, 7, 0.7)" } : {}}
                        >
                            {/* Muestra la oferta si existe */}
                            {room.offer && (
                                <Badge
                                    bg="danger"
                                    className="position-absolute top-0 start-0 m-2 p-2"
                                    style={{ fontSize: "14px", borderRadius: "5px" }}
                                >
                                    OFERTA 10%
                                </Badge>
                            )}

                            <Row className="g-0">
                                {/* Imagen de la Habitación */}
                                <Col md={4} className="position-relative">
                                    <Card.Img
                                        src={room.image}
                                        alt={room.name}
                                        style={{ height: "100%", objectFit: "cover", borderRadius: "5px 0 0 5px" }}
                                    />
                                </Col>

                                {/* Información de la Habitación */}
                                <Col md={8}>
                                    <Card.Body>
                                        <Card.Title>{room.name}</Card.Title>
                                        <Card.Text>
                                            <strong>Máxima Ocupación:</strong> {room.occupancy} <br />
                                            <strong>Tamaño:</strong> {room.size} <br />
                                            <strong>Tipos de cama:</strong> {room.beds} <br />
                                        </Card.Text>

                                        {/* Servicios con Iconos */}
                                        <div className="d-flex flex-wrap gap-2">
                                            {room.services.map((service, index) => (
                                                <span key={index} className="d-flex align-items-center gap-1">
                                                    {serviceIcons[service]} {service}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Precio con descuento si aplica */}
                                        {room.discount && (
                                            <Card.Text className="text-danger mt-2">
                                                <del>Gs. {room.originalPrice.toLocaleString()}</del>
                                            </Card.Text>
                                        )}
                                        <Card.Text className="fw-bold fs-5">
                                            Gs. {room.price.toLocaleString()}
                                        </Card.Text>
                                        <Button variant="success" className="w-100" onClick={selectTariff}>
                                            Seleccionar Tarifa
                                        </Button>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            ))}
        </Container>
    );
};

export default RoomsList;
