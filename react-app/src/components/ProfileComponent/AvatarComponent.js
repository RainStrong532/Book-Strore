import React, { useEffect, useState } from 'react';
import more from "../../assets/images/more.svg";
import "../../assets/css/avatar.css";
import { Modal } from 'react-bootstrap';
import xmark from "../../assets/images/times-solid.svg";
import fetchApi from '../../services/fetchApi';
import * as urls from '../../services/url';
import Cookies from 'js-cookie';
import { useAuth } from '../../contexts/UserContext';

function AvatarComponent({ user, loading, setLoading, other }) {
    const u = other ? other : user;
    const [show, setShow] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [image, setImage] = useState("");
    const [showMenu, setShowMenu] = useState(false);

    const auth = useAuth();


    useEffect(() => {
        if (u) {
            setAvatar(u.profile.avatar ? u.profile.avatar.url : null);
        }
    }, [u])

    const toggle = () => {
        setShow(!show);
    }
    const btnMoreStyle = {
        position: "absolute",
        zIndex: "999",
        background: "rgba(0,0,0,0.5)",
        border: "none",
        top: "60%",
        right: "0",
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
        cursor: "pointer",
        width: "100%",
        height: "50%",
        display: "flex",
        justifyContent: "center"
    }
    useEffect(() => {
        if (image.length > 0)
            changeAvatar();
    }, [image])
    const changeAvatar = async () => {
        setLoading(true);
        try {
            const res = await fetchApi("POST", urls.IMAGES_URL + "/upload", { image: image });
            if (res) {
                const token = Cookies.get('token');
                if (token) {
                    await fetchApi("POST", urls.PROFILE_URL + "/avatar", { image_id: res.image_id }, token);
                    await auth.loadUser();
                    setAvatar(res.url);
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
    const handleDeleteAvatar = async () => {
        setLoading(true);
        try {
            const token = Cookies.get('token');
            if (token) {
                await fetchApi("DELETE", urls.PROFILE_URL + "/avatar", null, token);
                await auth.loadUser();
                setAvatar(null);
            } else {
                alert("không tìm thấy token");
            }

        } catch (err) {
            alert(err.message)
        }
        setShowMenu(false);
        setLoading(false);
    }
    const handleChangeAvatar = (event) => {
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
        <div className="avatar-cnt">
            <div className="coverImage avatar" style={{ background: "#999" }}>
                <div className="d-flex justify-content-center" style={{ width: "100%", height: "500px", overflow: "hidden", position: "relative" }}>
                    {
                        avatar
                            ?
                            <img className="avt-img" style={{ width: "auto", height: "100%" }} src={avatar} alt="Ảnh đại diện"
                                onClick={() => setShow(true)}
                            />
                            :
                            <div className="place-img"></div>
                    }
                    {
                        u.account_id === user.account_id
                            ?
                            <div className="btn-more" style={btnMoreStyle}>

                            </div>
                            :
                            <></>
                    }

                </div>
                <Modal show={show} onHide={toggle} className="coverImage">
                    <Modal.Header closeButton>
                        <Modal.Title>Ảnh đại diện</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="d-flex justify-content-center align-items-center" style={{ minWidth: "300px", minHeight: "300px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <img style={{ height: "100%", width: "auto" }} src={avatar} alt="ẢNh đại diện" />
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
            {
                u.account_id === user.account_id
                    ?
                    <div className="dd">
                        <img src={showMenu ? xmark : more} alt="icon" style={{ width: "12rem", height: "3rem" }}
                            onClick={() => { setShowMenu(!showMenu) }}
                        />

                        <ul className={`menu-dd p-0 ${showMenu ? "active" : ""}`}>
                            <li
                                onClick={handleDeleteAvatar}
                            >
                                Xóa ảnh đại diện
                    </li>
                            <li>
                                Chọn ảnh đại diện
                            <input type="file" accept="image/*"
                                    onChange={(e) => { handleChangeAvatar(e) }}
                                />
                            </li>
                        </ul>
                    </div>
                    :
                    <></>
            }
        </div>
    )
}

export default AvatarComponent;