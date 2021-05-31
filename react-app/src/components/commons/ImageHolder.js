import React from 'react';
import ImageModal from './ImageModal';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function ImageHolder({ readOnly, data, onDelete }) {
    const [showModal, setShowModal] = React.useState(false);
    const [modal, setModal] = React.useState(false);
    const toggleDelete = () => {
        setModal(!modal);
    }
    const toggle = () => {
        setShowModal(!showModal);
    }
    return (
        <div className="imagePicker imageHolder p-0"
            style={{ border: (!data.url) ? 'none' : '', backgroundColor: (!data.url) ? '#F4F4F4' : "" }}
            title={!data.url ? "Chưa có ảnh nào" : ""}
        >
            <div className="overlay"
                onClick={
                    () => {
                        if (data.url)
                            setShowModal(true);
                    }
                }></div>
            {
                !readOnly
                    ?
                    <div className="btnContainer">
                        <div className="closeBtn"
                            onClick={toggleDelete}
                            title="Click để xóa ảnh"
                        >
                            <i className="fas fa-times"
                                style={{ color: "#FFF" }}
                            ></i>
                        </div>
                    </div>
                    :
                    <></>
            }
            {
                data.url
                    ?
                    <img className="image" src={data.url} alt="image" />
                    :
                    <></>
            }
            <ImageModal src={data.url} showModal={showModal} toggle={toggle} />
            <Modal isOpen={modal} toggle={toggleDelete} centered={true}>
                <ModalHeader toggle={toggleDelete}>Thông báo</ModalHeader>
                <ModalBody>
                    Bạn có chắc muốn xóa ảnh này?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => {
                        if (onDelete) {
                            onDelete(data);
                        }
                        toggleDelete();
                    }}>Đồng ý</Button>{' '}
                    <Button color="secondary" onClick={toggleDelete}>Hủy</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
export default ImageHolder;