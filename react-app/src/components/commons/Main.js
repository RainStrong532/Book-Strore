import React from 'react';
import images_1 from '../../assets/images/slider-image-1-1920x700.jpg';
import images_2 from '../../assets/images/slider-image-2-1920x700.jpg';
import images_3 from '../../assets/images/slider-image-3-1920x700.jpg';

function ControlledCarousel() {
  return (
    <>
      <div id="main">
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100" src={images_1} alt="First slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={images_2} alt="Second slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={images_3} alt="Third slide" />
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    </>
  );
}


export default ControlledCarousel;