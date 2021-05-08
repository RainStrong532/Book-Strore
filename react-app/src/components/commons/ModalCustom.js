import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ModalCustom({ show, toggle, data, type, submit }) {
    const handleSbmit = () => {
        if (submit) {
            submit();
        }
        toggle();
    }
    return (
        <>
            <Modal show={show} onHide={toggle}>
                <Modal.Header closeButton>
                    <Modal.Title>{ data.title }</Modal.Title>
                </Modal.Header>
                <Modal.Body>{ data.desc }</Modal.Body>
                <Modal.Footer>
                    {
                        type === "warning"
                            ?
                            <Button variant="secondary" onClick={toggle}>
                                Hủy
                            </Button>
                            :
                            <></>
                    }
                    <Button variant="primary" onClick={handleSbmit}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCustom;