import React, { useState } from 'react';
import { Carousel, Image, Row, Col } from 'react-bootstrap';

const CarouselWithThumbnails = ({imagenes}) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
      {/* Main Carousel */}
      <Carousel activeIndex={index} onSelect={handleSelect} className="mb-3">
        {imagenes.map((image, i) => (
          <Carousel.Item key={i}>
            <img
              className="d-block w-100"
              src={image.url}
              alt="imagenhotel"
              style={{ maxHeight: '500px', objectFit: 'cover' }}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Thumbnails */}
      <Row className="justify-content-center">
        {imagenes.map((image, i) => (
          <Col xs={3} md={2} key={i}>
            <Image
              src={image.url}
              alt="imagenhotel"
              thumbnail
              onClick={() => handleSelect(i)}
              style={{
                cursor: 'pointer',
                border: index === i ? '3px solid #007bff' : 'none',
                width: '150px',        // Fixed width
                height: '100px',        // Fixed height
                objectFit: 'cover',    // Ensures images fit the box without distortion
              }}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CarouselWithThumbnails;
