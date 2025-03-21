import React from 'react';
import portada_restaurante from '../img/PortadaRestaurante.png';
import resto from '../img/resto.jpg';
import bar from '../img/bar.jpg';
import bar2 from '../img/bar2.webp';
import bar3 from '../img/bar3.jpg';
import { Container, Row, Col, Image, ListGroup, Carousel } from 'react-bootstrap';

const RestaurantPage = () => {
    return (
        <>
            <div style={{ width: '100%', overflow: 'hidden' }}>
                <Image
                    src={portada_restaurante}
                    alt="Portada del Restaurante"
                    style={{ width: '100%', height: '500px', objectFit: 'cover' }}
                />
            </div>
            <hr></hr>
            <Container>

                <Row className="d-flex align-items-center justify-content-center">
                    <Col md={7} className="">
                        <h3>Restaurant Los Alamos</h3>
                        <p>
                            Lo invitamos a disfrutar de nuestro exclusivo ambiente con una
                            propuesta variada de platos tradicionales e internacionales y
                            una excelente carta de vinos.
                        </p>

                    </Col>
                    <Col md={5} className="mb-4">
                        <Carousel>
                            <Carousel.Item>
                                <Image src={resto} fluid rounded />
                            </Carousel.Item>
                            <Carousel.Item>
                                <Image src={bar} fluid rounded />
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                </Row>

                <Row className="d-flex align-items-center justify-content-center">
                    <Col md={5} className="mb-4">
                        <Carousel>
                            <Carousel.Item>
                                <Image src={bar} fluid rounded />
                            </Carousel.Item>
                            <Carousel.Item>
                                <Image src={bar2} fluid rounded />
                            </Carousel.Item>
                            <Carousel.Item>
                                <Image src={bar3} fluid rounded />
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                    <Col md={7} className="text-md-start">
                        <h3>Del Sur Bar</h3>
                        <p>
                            Visita nuestro bar y disfruta de deliciosos cócteles, vinos y
                            bebidas en un ambiente relajado y acogedor. El lugar perfecto
                            para compartir buenos momentos.
                        </p>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default RestaurantPage;
