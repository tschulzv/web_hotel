import React from "react";
import { Container, Row, Col, Image, Dropdown } from 'react-bootstrap';
import '../index.css';

const ReserveRoom = () => {
    return (
        <Container className="py-5" fluid>
            <Row className="mb-5">
                <Col xs={12} sm={6} md={8}>
                    {/* Informacion del huesped */}
                    <h3>Información del Huésped</h3>
                    <Row className="mb-4">
                        <Col xs={12} sm={6} md={6}>
                            <label htmlFor="nombre">Nombre</label>
                            <input name="nombre" type="text" id="nombre" className="mb-3 w-75 form-control" />
                        </Col>
                        <Col xs={12} sm={6} md={6}>
                            <label htmlFor="apellido">Apellido</label>
                            <input name="apellido" type="text" id="apellido" className="mb-3 w-75 form-control" />
                        </Col>
                    </Row>
                    <Row className="mb-4" g={2}>
                        <Col xs={12} sm={6} md={6}>
                            <label htmlFor="num_documento">Número de Documento</label>
                            <input name="num_documento" type="text" id="num_documento" className="mb-3 w-75 form-control" />
                        </Col>
                        <Col xs={12} sm={6} md={6}>
                            <label htmlFor="tipo_documento">Tipo de Documento</label>
                            <input name="tipo_documento" type="text" id="tipo_documento" className="mb-3 w-75 form-control" />
                        </Col>
                    </Row>
                    <Row className="mb-4" g={2}>
                        <Col xs={12} sm={6} md={6}>
                            <label htmlFor="email">Dirección de Correo Electronico</label>
                            <input name="email" type="email" id="email" className="mb-3 w-75 form-control" />
                        </Col>
                        <Col xs={12} sm={6} md={6}>
                            <label htmlFor="num_telefono">Número de Telefono</label>
                            <input name="num_telefono" type="number" id="num_telefono" className="mb-3 w-75 form-control" />
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col xs={12} sm={6} md={6}>
                            <label htmlFor="pais">País</label>
                            <input name="pais" type="text" id="pais" className="mb-3 w-75 form-control" />
                        </Col>
                    </Row>

                    <h3>Preparar Su Estancia</h3>
                    <Row className="mb-4">
                        <p className="fw-bold">¿Tiene algún tipo de solicitud especial para el hotel?</p>
                        <p className="custom-font-color-font">Se reenviará su solicitud después de la reserva.</p>
                        <p className="custom-font-size-smaller"><em>Nota: Comentarios no garantizados.</em></p>

                        <p>Hora de Llegada</p>
                        <Dropdown>
                            <Dropdown.Toggle variant="outline-secondary" id="dropdown-options">
                                Seleccionar
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item className="custom-font-size-smaller" href="#/option-1">Option 1</Dropdown.Item>
                                <Dropdown.Item className="custom-font-size-smaller" href="#/option-2">Option 2</Dropdown.Item>
                                <Dropdown.Item className="custom-font-size-smaller" href="#/option-3">Option 3</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <label htmlFor="comentarios">Comentarios</label>
                        <textarea name="comentarios" id="comentarios" class="mb-3 w-75 form-control" rows="4"></textarea>

                    </Row>

                    <button className="btn btn-primary fw-bolder">Solicitar Reserva</button>

                    <Row>
                        <p>Una vez confirmada su reserva le enviaremos un correo de confirmación</p>
                    </Row>



                </Col>
                {/* Su Reserva */}
                <Col xs={12} sm={6} md={4}>
                    <h3>Su Reserva</h3>
                    <Row>
                        <p className="custom-font-size-smaller">Suite Ejecutiva</p>
                        <p className="custom-font-size-smaller">Junior Suite</p>
                        <p className="custom-font-size-smaller">Vi,  Mar 14, 2025 - Lu, Mar 17, 2025</p>
                        <Row className="mb-4" >
                            <Col xs={12} sm={6} md={4}>
                                <p className="custom-font-size-smaller">2 adulto | 3 noches</p>
                            </Col>
                            <Col xs={12} sm={6} md={4}>
                                <Dropdown>
                                    <Dropdown.Toggle variant="outline-secondary" id="dropdown-options" size="sm">
                                        Tipo de pensión
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item className="custom-font-size-smaller" href="#/option-1">Option 1</Dropdown.Item>
                                        <Dropdown.Item className="custom-font-size-smaller" href="#/option-2">Option 2</Dropdown.Item>
                                        <Dropdown.Item className="custom-font-size-smaller" href="#/option-3">Option 3</Dropdown.Item>
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
                                <Dropdown>
                                    <Dropdown.Toggle variant="outline-secondary" id="dropdown-options" size="sm">
                                        Tipo de pensión
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item className="custom-font-size-smaller" href="#/option-1" >Option 1</Dropdown.Item>
                                        <Dropdown.Item className="custom-font-size-smaller" href="#/option-2">Option 2</Dropdown.Item>
                                        <Dropdown.Item className="custom-font-size-smaller" href="#/option-3">Option 3</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col xs={12} sm={6} md={4}>
                                <p className="custom-font-size-smaller">₲ 350.000</p>
                            </Col>
                        </Row>

                        <hr></hr>

                        <Row>
                            <Row>
                                <Col xs={12} sm={6} md={20}>
                                    <p className="custom-font-size-smaller">Subtotal</p>
                                </Col>
                                <Col xs={12} sm={6} md={4}>
                                    <p className="custom-font-size-smaller">₲ 800.000</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={6} md={20}>
                                    <p className="custom-font-size-smaller">Adicionales</p>
                                </Col>
                                <Col xs={12} sm={6} md={4}>
                                    <p className="custom-font-size-smaller">₲ 20.000</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={6} md={20}>
                                    <p className="custom-font-size-smaller">Impuestos</p>
                                </Col>
                                <Col xs={12} sm={6} md={4}>
                                    <p className="custom-font-size-smaller">₲ 80.000</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={6} md={20}>
                                    <p className="custom-font-size-smaller">Reserva total</p>
                                </Col>
                                <Col xs={12} sm={6} md={4}>
                                    <p className="custom-font-size-smaller">₲ 900.000</p>
                                </Col>
                            </Row>
                        </Row>
                        {/*Aqui iria los siguientes datos de la habitacion: tipo, fecha de entrada-salida, 
                        cantidad de personas|cantidad de noches -- tipo de pension -- costo habitacion,  */}
                    </Row>
                </Col>
            </Row >
        </Container >
    );
}

export default ReserveRoom;