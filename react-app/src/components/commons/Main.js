import React, { useState } from 'react';
import images_1 from '../../assets/images/slider-image-1-1920x700.jpg';
import images_2 from '../../assets/images/slider-image-2-1920x700.jpg';
import images_3 from '../../assets/images/slider-image-3-1920x700.jpg';
import { Carousel } from 'react-bootstrap';
function ControlledCarousel() {
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={images_1}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={images_2}
            alt="Second slide"
          />
  
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={images_3}
            alt="Third slide"
          />

        </Carousel.Item>
      </Carousel>
    );
  }
  

  export default ControlledCarousel;