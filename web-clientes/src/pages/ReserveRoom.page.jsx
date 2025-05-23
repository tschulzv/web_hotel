import React, { useState } from 'react';
import { Container, Row, Col, Dropdown, Button, ToastContainer } from 'react-bootstrap';
import { toast, ToastContainer as ReactToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReserveRoom = () => {
    // Estados huésped
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [numDocumento, setNumDocumento] = useState('');
    const [tipoDocumento, setTipoDocumento] = useState('');
    const [email, setEmail] = useState('');
    const [numTelefono, setNumTelefono] = useState('');
    const [pais, setPais] = useState('');

    // Estados estancia
    const [horaLlegada, setHoraLlegada] = useState('');
    const [comentarios, setComentarios] = useState('');

    // Validación de email simple
    const validarEmail = (email) => {
        return /^\S+@\S+\.\S+$/.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validaciones
        if (!nombre.trim()) return toast.error('El nombre es obligatorio');
        if (!apellido.trim()) return toast.error('El apellido es obligatorio');
        if (!numDocumento.trim()) return toast.error('El número de documento es obligatorio');
        if (!tipoDocumento) return toast.error('El tipo de documento es obligatorio');
        if (!email.trim() || !validarEmail(email)) return toast.error('Ingrese un correo válido');
        if (!numTelefono.trim()) return toast.error('El número de teléfono es obligatorio');
        if (!pais) return toast.error('El país es obligatorio');
        if (!horaLlegada) return toast.error('La hora de llegada es obligatoria');

        // Si todas las validaciones pasan
        const reserva = {
            nombre,
            apellido,
            numDocumento,
            tipoDocumento,
            email,
            numTelefono,
            pais,
            horaLlegada,
            comentarios,
        };
        console.log('Datos reserva:', reserva);
        toast.success('Reserva solicitada con éxito');

        // Limpiar formulario (opcional)
        setNombre('');
        setApellido('');
        setNumDocumento('');
        setTipoDocumento('');
        setEmail('');
        setNumTelefono('');
        setPais('');
        setHoraLlegada('');
        setComentarios('');
    };

    return (
        <Container className="py-5" fluid>
            <form onSubmit={handleSubmit}>
                <Row className="mb-5">
                    <Col xs={12} sm={6} md={8}>
                        <h3>Información del Huésped</h3>
                        <Row className="mb-4">
                            <Col xs={12} sm={6} md={6}>
                                <label htmlFor="nombre">Nombre</label>
                                <input
                                    name="nombre"
                                    type="text"
                                    id="nombre"
                                    className="mb-3 w-75 form-control"
                                    value={nombre}
                                    onChange={e => setNombre(e.target.value)}
                                />
                            </Col>
                            <Col xs={12} sm={6} md={6}>
                                <label htmlFor="apellido">Apellido</label>
                                <input
                                    name="apellido"
                                    type="text"
                                    id="apellido"
                                    className="mb-3 w-75 form-control"
                                    value={apellido}
                                    onChange={e => setApellido(e.target.value)}
                                />
                            </Col>
                        </Row>

                        <Row className="mb-4" g={2}>
                            <Col xs={12} sm={6} md={6}>
                                <label htmlFor="num_documento">Número de Documento</label>
                                <input
                                    name="num_documento"
                                    type="text"
                                    id="num_documento"
                                    className="mb-3 w-75 form-control"
                                    value={numDocumento}
                                    onChange={e => setNumDocumento(e.target.value)}
                                />
                            </Col>
                            <Col xs={12} sm={6} md={6}>
                                <label>Tipo de Documento</label>
                                <Dropdown onSelect={setTipoDocumento}>
                                    <Dropdown.Toggle variant="outline-secondary" id="dropdown-tipo-doc">
                                        {tipoDocumento || 'Seleccionar'}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey="Cédula de Identidad Paraguaya">Cédula de Identidad Paraguaya</Dropdown.Item>
                                        <Dropdown.Item eventKey="Pasaporte">Pasaporte</Dropdown.Item>
                                        <Dropdown.Item eventKey="Cédula de Identidad Extranjera">Cédula de Identidad Extranjera</Dropdown.Item>
                                        <Dropdown.Item eventKey="Otros">Otros</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>

                        <Row className="mb-4" g={2}>
                            <Col xs={12} sm={6} md={6}>
                                <label htmlFor="email">Correo Electrónico</label>
                                <input
                                    name="email"
                                    type="email"
                                    id="email"
                                    className="mb-3 w-75 form-control"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </Col>
                            <Col xs={12} sm={6} md={6}>
                                <label htmlFor="num_telefono">Número de Teléfono</label>
                                <input
                                    name="num_telefono"
                                    type="tel"
                                    id="num_telefono"
                                    className="mb-3 w-75 form-control"
                                    value={numTelefono}
                                    onChange={e => setNumTelefono(e.target.value)}
                                />
                            </Col>
                        </Row>

                        <Row className="mb-4">
                            <Col xs={12} sm={6} md={6}>
                                <label>País</label>
                                <Dropdown onSelect={setPais}>
                                    <Dropdown.Toggle variant="outline-secondary" id="dropdown-pais">
                                        {pais || 'Seleccionar'}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey="Paraguay">Paraguay</Dropdown.Item>
                                        <Dropdown.Item eventKey="Argentina">Argentina</Dropdown.Item>
                                        <Dropdown.Item eventKey="Brasil">Brasil</Dropdown.Item>
                                        <Dropdown.Item eventKey="Uruguay">Uruguay</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>

                        <h3>Preparar Su Estancia</h3>
                        <Row className="mb-4">
                            <p className="fw-bold">¿Tiene algún tipo de solicitud especial para el hotel?</p>
                            <p className="custom-font-color-font">Se reenviará su solicitud después de la reserva.</p>
                            <p className="custom-font-size-smaller"><em>Nota: Comentarios no garantizados.</em></p>

                            <p>Hora de Llegada</p>
                            <Dropdown onSelect={setHoraLlegada}>
                                <Dropdown.Toggle variant="outline-secondary" id="dropdown-hora">
                                    {horaLlegada || 'Seleccionar'}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="14:00 hs">14:00 hs</Dropdown.Item>
                                    <Dropdown.Item eventKey="15:00 hs">15:00 hs</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            <label htmlFor="comentarios" className="mt-3">Comentarios</label>
                            <textarea
                                name="comentarios"
                                id="comentarios"
                                className="mb-3 w-75 form-control"
                                rows="4"
                                value={comentarios}
                                onChange={e => setComentarios(e.target.value)}
                            />
                        </Row>

                        <Button type="submit" className="btn btn-primary fw-bolder">Solicitar Reserva</Button>

                        <Row className="mt-3">
                            <p>Una vez confirmada su reserva le enviaremos un correo de confirmación</p>
                        </Row>
                    </Col>

                    {/* Su Reserva */}
                    <Col xs={12} sm={6} md={4}>
                        <h3>Su Reserva</h3>
                        <Row>
                            <p className="custom-font-size-smaller">Suite Ejecutiva</p>
                            <p className="custom-font-size-smaller">Junior Suite</p>
                            <p className="custom-font-size-smaller">Vi, Mar 14, 2025 - Lu, Mar 17, 2025</p>
                            <Row className="mb-4" >
                                <Col xs={12} sm={6} md={4}>
                                    <p className="custom-font-size-smaller">2 adultos | 3 noches</p>
                                </Col>
                                <Col xs={12} sm={6} md={4}>
                                    <label>Tipo de pensión</label>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="outline-secondary" id="dropdown-pension" size="sm">
                                            { /* Podrías controlar el estado similar a los anteriores */}
                                            Pension Completa
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey="Pensión Completa">Pensión Completa</Dropdown.Item>
                                            <Dropdown.Item eventKey="Media Pensión">Media Pensión</Dropdown.Item>
                                            <Dropdown.Item eventKey="Alojamiento y Desayuno">Alojamiento y Desayuno</Dropdown.Item>
                                            <Dropdown.Item eventKey="Solo Alojamiento">Solo Alojamiento</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                                <Col xs={12} sm={6} md={4}>
                                    <p className="custom-font-size-smaller">₲ 450.000</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={6} md={4}>
                                    <p className="custom-font-size-smaller">1 adulto | 3 noches</p>
                                </Col>
                                <Col xs={12} sm={6} md={4}>
                                    <label>Tipo de pensión</label>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="outline-secondary" id="dropdown-pension2" size="sm">
                                            Media Pensión
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey="Pensión Completa">Pensión Completa</Dropdown.Item>
                                            <Dropdown.Item eventKey="Media Pensión">Media Pensión</Dropdown.Item>
                                            <Dropdown.Item eventKey="Alojamiento y Desayuno">Alojamiento y Desayuno</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                                <Col xs={12} sm={6} md={4}>
                                    <p className="custom-font-size-smaller">₲ 350.000</p>
                                </Col>
                            </Row>

                            <hr />

                            <Row>
                                <Col xs={12} sm={6} md={8}>
                                    <p className="custom-font-size-smaller">Subtotal</p>
                                </Col>
                                <Col xs={12} sm={6} md={4}>
                                    <p className="custom-font-size-smaller">₲ 800.000</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={6} md={8}>
                                    <p className="custom-font-size-smaller">Adicionales</p>
                                </Col>
                                <Col xs={12} sm={6} md={4}>
                                    <p className="custom-font-size-smaller">₲ 20.000</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={6} md={8}>
                                    <p className="custom-font-size-smaller">Impuestos</p>
                                </Col>
                                <Col xs={12} sm={6} md={4}>
                                    <p className="custom-font-size-smaller">₲ 80.000</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={6} md={8}>
                                    <p className="custom-font-size-smaller">Reserva total</p>
                                </Col>
                                <Col xs={12} sm={6} md={4}>
                                    <p className="custom-font-size-smaller">₲ 900.000</p>
                                </Col>
                            </Row>
                        </Row>
                    </Col>
                </Row>
            </form>
            <ReactToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </Container>
    );
};

export default ReserveRoom;
