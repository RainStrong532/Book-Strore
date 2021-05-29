import React from 'react';
import { Button } from 'react-bootstrap';

function BookDetail() {
    return (
        <div className="book-detail">
            <header className="d-flex justify-content-between p-4 border border-dark border-left-0 border-right-0 border-top-0">
                <div className="left d-flex">
                    <div className="back mr-3" style={{ cursor: "pointer" }}>
                        <i class="fas fa-arrow-left"></i>
                    </div>
                    <p className="title">
                        Chi tiết sách
                </p>
                </div>

                <div className="right">
                    <Button variant="warning" className="mx-2" title="Chỉnh sửa">
                        <i class="fas fa-edit" style={{ color: "#FFF" }}></i>
                    </Button>
                    <Button variant="danger" className="mx-2" title="Xóa">
                        <i class="fas fa-trash-alt"></i>
                    </Button>
                </div>
            </header>
        </div>
    )
}

export default BookDetail;