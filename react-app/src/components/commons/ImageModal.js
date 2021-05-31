import React from 'react';
import { Modal, ModalBody } from 'reactstrap';

function ImageModal({ src, showModal, toggle }) {
    return (
        <Modal isOpen={showModal} centered={true} className="dia" toggle={toggle}>
            <ModalBody>
                <div className="imageModal" style={{ backgroundImage: 'url(' + src + ')' }}>
                    <div className="closeBtn"
                        onClick={toggle}
                    >
                        <i className="fas fa-times"></i>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default ImageModal;