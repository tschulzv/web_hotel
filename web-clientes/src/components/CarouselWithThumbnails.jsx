import React, { useState } from 'react';
import { Carousel, Image, Row, Col } from 'react-bootstrap';

const images = [
  {
    src: 'https://glamorous-design.org/wp-content/uploads/2024/11/piclumen-1731932590678.png',
    alt: 'Slide 1',
  },
  {
    src: 'https://www.marseilleshotel.com/wp-content/uploads/2019/10/Marseilles-Hotel-20210427-Suite-Jacuzzi-King-KBSTJQ-1920L-10-1024x595.jpg',
    alt: 'Slide 2',
  },
  {
    src: 'https://cdn.choosechicago.com/uploads/2020/08/swissotel-presidential-office-1800x828.png',
    alt: 'Slide 3',
  },
];

const CarouselWithThumbnails = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
      {/* Main Carousel */}
      <Carousel activeIndex={index} onSelect={handleSelect} className="mb-3">
        {images.map((image, i) => (
          <Carousel.Item key={i}>
            <img
              className="d-block w-100"
              src={image.src}
              alt={image.alt}
              style={{ maxHeight: '500px', objectFit: 'cover' }}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Thumbnails */}
      <Row className="justify-content-center">
        {images.map((image, i) => (
          <Col xs={3} md={2} key={i}>
            <Image
              src={image.src}
              alt={image.alt}
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
