import axios from '../config/axiosConfig';
import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Dropdown, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import countryList from 'react-select-country-list'
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';

const ReserveRoom = () => {
    const location = useLocation();
    const [listaTiposDocumento, setListaTiposDocumento] = useState([]);
    const [tiposHabitacion, setTiposHabitacion] = useState([]);
    const countries = useMemo(() => countryList().getData(), []);
    const [pensiones, setPensiones] = useState([]);

    // Reserva states
    const [detallesReserva, setDetallesReserva] = useState([]);
    const [pensionSelections, setPensionSelections] = useState([]);
    const [habitacionesIniciales, setHabitacionesIniciales] = useState([]);
    const [fechaIngreso, setFechaIngreso] = useState('');
    const [fechaSalida, setFechaSalida] = useState('');

    // Huésped states
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [numDocumento, setNumDocumento] = useState('');
    const [tipoDocumentoId, setTipoDocumentoId] = useState('');
    const [tipoDocumentoNombre, setTipoDocumentoNombre] = useState('');
    const [email, setEmail] = useState('');
    const [numTelefono, setNumTelefono] = useState('');
    const [pais, setPais] = useState('');
    const [comentariosCliente, setComentariosCliente] = useState('');
    const [horaLlegada, setHoraLlegada] = useState('');
    const validarEmail = email => /^\S+@\S+\.\S+$/.test(email);
    const horasLlegadaDisponibles = ['14:00', '15:00', '16:00'];

    useEffect(() => {
        axios.get('/TiposDocumentos')
            .then(response => {
                setListaTiposDocumento(response.data);
            })
            .catch(error => {
                console.error('Error cargando datos:', error);
            });

        axios.get('/TiposHabitaciones')
            .then(response => {
                setTiposHabitacion(response.data);
            })
            .catch(error => {
                console.error('Error cargando datos:', error);
            });

        axios.get('/Pensiones')
            .then(response => {
                setPensiones(response.data);
            }).catch(error => {
                console.error('Error cargando datos:', error);
            });

        setDetallesReserva(location.state?.selectedRooms || []);
        setFechaIngreso(location.state?.checkIn || '');
        setFechaSalida(location.state?.checkOut || '');
        setHabitacionesIniciales(location.state?.habitaciones || []);
    }, []);

    useEffect(() => {
        setPensionSelections(detallesReserva.map(() => null));
    }, [detallesReserva]);

    const calcNights = () => {
        const inDate = new Date(fechaIngreso);
        const outDate = new Date(fechaSalida);
        const diff = (outDate - inDate) / (1000 * 60 * 60 * 24);
        return diff;
    };

    const nights = calcNights();
    const subtotal = detallesReserva.reduce((sum, detalle) => {
        const tipo = tiposHabitacion.find(t => t.id === detalle.id);
        return sum + (tipo?.precioBase || 0) * nights;
    }, 0);
    const adicionales = pensionSelections.reduce((sum, sel) => {
        const pen = pensiones.find(p => p.id === sel);
        return sum + (pen?.precioAdicional || 0) * nights;
    }, 0);
    const impuestos = subtotal * 0.1;
    const total = subtotal + adicionales + impuestos;

    const handlePensionChange = (roomIndex, pensionId) => {
        setPensionSelections(prev => {
            const copy = [...prev];
            copy[roomIndex] = pensionId;
            return copy;
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        // --- Validaciones ---
        if (!nombre.trim()) return toast.error('El nombre es obligatorio');
        if (!apellido.trim()) return toast.error('El apellido es obligatorio');
        if (!numDocumento.trim()) return toast.error('El número de documento es obligatorio');
        if (!tipoDocumentoId) return toast.error('El tipo de documento es obligatorio');
        if (!email.trim() || !validarEmail(email)) return toast.error('Ingrese un correo válido');
        if (!numTelefono.trim()) return toast.error('El número de teléfono es obligatorio');
        if (!pais.trim()) return toast.error('El país es obligatorio');
        if (!fechaIngreso) return toast.error('La fecha de ingreso es obligatoria');
        if (!fechaSalida) return toast.error('La fecha de salida es obligatoria');
        if (!horaLlegada) return toast.error('La hora de llegada es obligatoria');
        // Validar que fechaSalida sea posterior a fechaIngreso
        if (new Date(fechaSalida) <= new Date(fechaIngreso)) {
            return toast.error('La fecha de salida debe ser posterior a la fecha de ingreso.');
        }

        // Si todas las validaciones pasan
        // --- Construir el objeto DTO para la API ---
        const reservaClientePayload = {
            informacionCliente: {
                nombre: nombre,
                apellido: apellido,
                email: email,
                telefono: numTelefono,
                numDocumento: numDocumento,
                tipoDocumentoId: parseInt(tipoDocumentoId),
                nacionalidad: pais,
                comentarios: comentariosCliente,
            },
            informacionReserva: {
                fechaIngreso: new Date(fechaIngreso).toISOString(),
                fechaSalida: new Date(fechaSalida).toISOString(),
                llegadaEstimada: `${horaLlegada}:00`, // Formato HH:mm:ss para TimeOnly
                comentarios: comentariosCliente,
                estadoId: 1,
                detalles: detallesReserva.map((detalle, i) => {
                    const pensionId = pensionSelections[i];
                    return {
                        ...detalle,
                        tipoHabitacionId: parseInt(detalle.id),
                        cantidadAdultos: habitacionesIniciales[i]?.adults || 1,
                        cantidadNinos: habitacionesIniciales[i]?.children || 0,
                        ...(pensionId ? { pensionId: parseInt(pensionId) } : {}),
                        activo: true,
                    };
                }),
            },
            informacionSolicitud: {
                tipo: 'Reserva'
            }
        };

        console.log('Enviando a API:', JSON.stringify(reservaClientePayload, null, 2));

        try {
            const response = await axios.post(`/Reservas/Cliente`, reservaClientePayload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Respuesta API:', response.data);
            toast.success(response.data.mensaje || 'Reserva solicitada con éxito!');



            // Limpiar formulario
            setNombre('');
            setApellido('');
            setNumDocumento('');
            setTipoDocumentoNombre('');
            setEmail('');
            setNumTelefono('');
            setPais('');
            setHoraLlegada('');
            setComentariosCliente('');
        } catch (error) {
            if (error.response) {
                const errorData = error.response.data;
                console.error('Error API:', errorData);
                if (errorData && errorData.errores) {
                    Object.values(errorData.errores).flat().forEach(err => toast.error(err));
                } else if (errorData && errorData.detalle) {
                    toast.error(`Error del servidor: ${errorData.detalle}`);
                } else {
                    toast.error(`Error: ${error.response.status} - ${error.response.statusText}`);
                }
            } else {
                console.error('Error en la solicitud axios:', error);
                toast.error('Error de conexión al intentar realizar la reserva.');
            }
        }
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
                                <Dropdown onSelect={(eventKey) => {
                                    const selected = listaTiposDocumento.find(td => td.id.toString() === eventKey);
                                    setTipoDocumentoId(selected ? selected.id : '');
                                    setTipoDocumentoNombre(selected ? selected.nombre : 'Seleccionar');
                                }}>
                                    <Dropdown.Toggle variant="outline-secondary" id="dropdown-tipo-doc">
                                        {tipoDocumentoNombre || 'Seleccionar'}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="w-100">
                                        {listaTiposDocumento.map(doc => (
                                            <Dropdown.Item key={doc.id} eventKey={doc.id.toString()}>{doc.nombre}</Dropdown.Item>
                                        ))}
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
                                    <Dropdown.Menu style={{ maxHeight: "200px", overflowY: "auto" }}>
                                        {countries.map(p => (
                                            <Dropdown.Item key={p.value} eventKey={p.label}>{p.label}</Dropdown.Item>
                                        ))}
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
                            <Dropdown onSelect={(eventKey) => setHoraLlegada(eventKey)}>
                                <Dropdown.Toggle variant="outline-secondary" id="dropdown-hora-llegada">
                                    {horaLlegada || 'Seleccionar'}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="w-100">
                                    {horasLlegadaDisponibles.map(hora => (
                                        <Dropdown.Item key={hora} eventKey={hora}>{hora}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                            <label htmlFor="comentarios" className="mt-3">Comentarios</label>
                            <textarea
                                name="comentarios"
                                id="comentarios"
                                className="mb-3 w-75 form-control"
                                rows="4"
                                value={comentariosCliente}
                                onChange={e => setComentariosCliente(e.target.value)}
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
                        <p className="small text-muted">{`${nights} noche(s)`}</p>
                        {detallesReserva.map((detalle, idx) => {
                            const tipo = tiposHabitacion.find(t => t.id === detalle.id);
                            const habCount = habitacionesIniciales[idx] || {};
                            const penSel = pensionSelections[idx];
                            return (
                                <Row key={idx} className="mb-3 align-items-center">
                                    {/* Columna para la cantidad de personas */}
                                    <Col xs={5}>
                                        <p className="mb-0 small font-weight-bold">{tipo?.nombre}</p>
                                        <p className="mb-0 small">
                                            {`${habCount.adults} adulto(s)`}
                                            {habCount.children && ` | ${habCount.children} niño(s)`}
                                        </p>
                                    </Col>
                                    {/* Columna para el selector de pensión */}
                                    <Col xs={4}>
                                        <Form.Select
                                            size="sm"
                                            value={penSel || ''}
                                            onChange={e => handlePensionChange(idx, parseInt(e.target.value))}
                                        >
                                            <option value="">Pensión</option>
                                            {pensiones.map(p => (
                                                <option key={p.id} value={p.id}>
                                                    {p.nombre}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                    {/* Columna para el precio */}
                                    <Col xs={3} className="text-right">
                                        <p className="mb-0 small">₲ {(tipo?.precioBase || 0) * nights}</p>
                                    </Col>
                                </Row>
                            );
                        })}
                        <hr />
                        <Row>
                            <Col xs={8}><p className="small">Subtotal</p></Col>
                            <Col xs={4}><p className="small">₲ {subtotal}</p></Col>
                        </Row>
                        <Row>
                            <Col xs={8}><p className="small">Adicionales</p></Col>
                            <Col xs={4}><p className="small">₲ {adicionales}</p></Col>
                        </Row>
                        <Row>
                            <Col xs={8}><p className="small">Impuestos (10%)</p></Col>
                            <Col xs={4}><p className="small">₲ {impuestos.toFixed(2)}</p></Col>
                        </Row>
                        <Row>
                            <Col xs={8}><p className="small font-weight-bold">Total</p></Col>
                            <Col xs={4}><p className="small font-weight-bold">₲ {total.toFixed(2)}</p></Col>
                        </Row>
                    </Col>
                </Row>
            </form>
        </Container>
    );
};

export default ReserveRoom;
