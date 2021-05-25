import React, { useState } from 'react';
import { Button, Dropdown, Modal } from 'react-bootstrap';
import { useAuth } from '../../contexts/UserContext';
import avatar from '../../assets/images/avatar.jpg'

function Header() {
    const auth = useAuth();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleLogout = () => {
        auth.logout();
        handleClose();
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc muốn đăng xuất không?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Không
                    </Button>
                    <Button variant="primary" onClick={handleLogout}>
                        Có
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="user-dropdown" style={{ position: "fixed", zIndex: "99999", right: "7rem", top: "1rem" }}>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {
                            auth.user
                                ?
                                <img src={auth.user.profile.avatar !== null ? auth.user.profile.avatar.url : avatar} alt="avatar" />
                                :
                                <></>
                        }
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {
                            auth.user
                                ?
                                <>
                                    <Dropdown.Item href={`/profiles?profile_id=${auth.user.account_id}`}>Hồ sơ</Dropdown.Item>
                                    <Dropdown.Item href="/setting">Cài đặt</Dropdown.Item>
                                    <Dropdown.Item href=""
                                        onClick={handleShow}
                                    >Đăng xuất</Dropdown.Item>
                                </>
                                :
                                <>
                                    <Dropdown.Item href="/login">Đăng nhập</Dropdown.Item>
                                </>

                        }

                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <header id="header" style={{ background: "#fff" }}>
                <div className="inner">
                    <a href="/" className="logo">
                        <span className="fa fa-book"></span> <span className="title">Book Online Store Website</span>
                    </a>
                    <nav className="nav">
                        <ul className="ul">
                            <li><a href="#menu">Menu</a></li>
                        </ul>
                    </nav>

                </div>
            </header>
        </>
    )
}

export default Header;