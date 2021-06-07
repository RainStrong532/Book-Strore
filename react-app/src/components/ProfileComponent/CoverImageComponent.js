import React, { useEffect, useState } from 'react';
import more from "../../assets/images/more.svg";
import xmark from "../../assets/images/times-solid.svg";
import { Modal } from 'react-bootstrap';
import fetchApi from '../../services/fetchApi';
import * as urls from '../../services/url';
import Cookies from 'js-cookie';


function CoverImageComponent({ user, loading, setLoading, other }) {
    const u = other ? other : user;
    const [show, setShow] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [coverImage, setCoverImage] = useState(null);
    const [image, setImage] = useState("");

    useEffect(() => {
        if (u) {
            setCoverImage(u.profile.cover_image ? u.profile.cover_image.url : null);
        }
    }, [u])// eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (image.length > 0)
            changeCoverImage();
    }, [image])// eslint-disable-line react-hooks/exhaustive-deps
    const toggle = () => {
        setShow(!show);
    }
    const btnMoreStyle = {
        position: "absolute",
        zIndex: "999",
        background: "rgba(0,0,0,0.5)",
        border: "none",
        bottom: "0",
        right: "0",
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        transition: "all .2s ease"
    }
    const changeCoverImage = async () => {
        setLoading(true);
        try {
            const res = await fetchApi("POST", urls.IMAGES_URL + "/upload", { image: image });
            if (res) {
                const token = Cookies.get('token');
                if (token) {
                    await fetchApi("POST", urls.PROFILE_URL + "/coverimage", { image_id: res.image_id }, token);
                    setCoverImage(res.url);
                } else {
                    alert("Khoont tìm thấy token");
                }

            } else {
                alert("Upload ảnh thất bại")
            }
        } catch (err) {
            alert(err.message)
        }
        setShowMenu(false);
        setLoading(false);
    }
    const handleDeleteCoverImage = async () => {
        setLoading(true);
        try {
            const token = Cookies.get('token');
            if (token) {
                await fetchApi("DELETE", urls.PROFILE_URL + "/coverImage", null, token);
                setCoverImage(null);
            } else {
                alert("Khoont tìm thấy token");
            }

        } catch (err) {
            alert(err.message)
        }
        setShowMenu(false);
        setLoading(false);
    }
    const handleChangeCoverImage = (event) => {
        setLoading(true);
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                setImage(e.target.result);
            };

            reader.readAsDataURL(event.target.files[0]);
            event.target.value = "";
        }
        setLoading(false);
    }
    return (
        <div className="coverImage" style={{ background: "#999" }}>
            <div className="d-flex justify-content-center" style={{ width: "100%", height: "500px", overflow: "hidden", position: "relative" }}>
                {
                    coverImage
                        ?
                        <img style={{ width: "auto", height: "100%" }} src={coverImage} alt="ẢNh bìa"
                            onClick={() => setShow(true)}
                        />
                        :
                        <></>
                }

                {
                    u.account_id === user.account_id
                        ?
                        <div className="btn-more" style={btnMoreStyle}>
                            <img src={showMenu ? xmark : more} alt="icon" style={{ width: "2rem", height: "auto" }}
                                onClick={() => { setShowMenu(!showMenu) }}
                            />

                            {
                                showMenu &&
                                <ul className="menu-dd p-0">
                                    <li
                                        onClick={handleDeleteCoverImage}
                                    >
                                        Xóa ảnh bìa
                        </li>
                                    <li>
                                        Chọn ảnh bìa mới
                            <input type="file" accept="image/*"
                                            onChange={(e) => { handleChangeCoverImage(e) }}
                                        />
                                    </li>
                                </ul>
                            }

                        </div>
                        :
                        <></>
                }

            </div>
            <Modal show={show} onHide={toggle} className="coverImage">
                <Modal.Header closeButton>
                    <Modal.Title>Ảnh bìa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div classname="d-flex justify-content-center align-items-center" style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img style={{ width: "100%", height: "auto" }} src={coverImage} alt="ẢNh bìa" />
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default CoverImageComponent;