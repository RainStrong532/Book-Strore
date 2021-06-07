import React from 'react';
import image from '../../assets/images/product-4-720x480.jpg'

function BookComponent({book, style}) {
    return (
        <article className={style ? style : "style1"}>
            <span className="image d-flex justify-content-center align-items-center" style={{ overflow: "hidden", height: "280px"}}>
                <img style={{ width: "100%", height: "auto"}} src={book.image ? book.image.url : image} alt="Ảnh" />
            </span>
            <a href="/#">
                <h2>{book.book_name}</h2>

                <p><strong>{`${book.price} VNĐ`}</strong></p>

                {/* <p>Vestibulum id est eu felis vulputate hendrerit uspendisse dapibus turpis in </p> */}
            </a>
        </article>
    )
}

export default BookComponent;