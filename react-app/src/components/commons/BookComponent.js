import React from 'react';
import image from '../../assets/images/product-4-720x480.jpg'

function BookComponent({book, style}) {
    return (
        <article className={style ? style : "style1"}>
            <span className="image">
                <img src={image} alt="image" />
            </span>
            <a href="product-details.html">
                <h2>Lorem ipsum dolor sit amet, consectetur</h2>

                <p><strong>$19.00</strong></p>

                <p>Vestibulum id est eu felis vulputate hendrerit uspendisse dapibus turpis in </p>
            </a>
        </article>
    )
}

export default BookComponent;