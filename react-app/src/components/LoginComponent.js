import React, { useState } from 'react';
import * as utils from '../utils';
import { useAuth } from '../contexts/UserContext';
import LoadingComponent from './commons/LoadingComponent';
import Modal from './commons/ModalCustom';

function LoginComponent(props) {
    const auth = useAuth();
    const { loading } = useAuth();
    console.log(loading);
    const [user_name, setUserName] = useState("");
    const [show, setShow] = useState(false);
    const [password, setPassword] = useState("");
    const [user_name_up, setUserNameUP] = useState("");
    const [password_up, setPasswordUp] = useState("");
    const [data, setData] = useState({title: "Thông báo", desc: ""});

    const toggle = () => {
        setShow(!show);
    }

    const handleLogin = async () => {
        if (user_name.length === 0) {
            alert("Thiếu thông tin tên đăng nhập");
            return;
        }
        if (password.length === 0) {
            alert("Thiếu thông tin mật khẩu")
        }
        if (auth.login) {
            try {
                const res = await auth.login(user_name, password);
                const desc = "Chào mừng " + res.user_name + ",";
                setData({...data, desc});
                toggle();
                setTimeout(() => {

                }, 1000);
            } catch (err) {
                let desc = "";
                if (err.message) desc = err.message;
                    else desc = err;
                setData({...data, desc});
                toggle();
            }
        }
    }
    return (
        <div className="login">
            {
                loading && <LoadingComponent />
            }
            <div className="cont">
                <form className="form sign-in">
                    <h2 className="h2-login">Chào mừng</h2>
                    <label className="label-login">
                        <span>Tên đăng nhập</span>
                        <input className="input-login" type="text" value={user_name}
                            onChange={e => {
                                setUserName(e.target.value)
                            }}
                        />
                    </label>
                    <label className="label-login">
                        <span>Mật khẩu</span>
                        <input className="input-login" suggested="current-password" type="password" value={password}
                            onChange={e => {
                                setPassword(e.target.value)
                            }}
                        />
                    </label>
                    <p className="forgot-pass">Quên mật khẩu?</p>
                    <button type="button" className="submit button-login" onClick={handleLogin}>Đăng nhập</button>
                    <button type="button" className="fb-btn button-login"><span>Facebook</span></button>
                    <button type="button" className="fb-btn button-login g-btn"><span>Goole+</span></button>
                </form>
                <div className="sub-cont">
                    <div className="img">
                        <div className="img__text m--up">
                            <h2>Nhiều thứ mới?</h2>
                            <p>Đăng ký và khám phá nhiều loại sách mới và hay!</p>
                        </div>
                        <div className="img__text m--in">
                            <h2>Đã có tài khoản?</h2>
                            <p>Nếu bạn đã có tài khoản, chỉ cần Đăng nhập!</p>
                        </div>
                        <div className="img__btn">
                            <span className="m--up" >Đăng ký</span>
                            <span className="m--in" >Đăng nhập</span>
                        </div>
                    </div>
                    <form className="form sign-up d-flex align-items-center flex-column">
                        <h2 className="h2-login">Đăng ký tài khoản</h2>
                        <div className="d-flex" style={{ width: "260px", justifyContent: "space-between" }}>
                            <label className="label-login" style={{ width: "45%", textAlign: "left" }}>
                                <span>Tên</span>
                                <input className="input-login" type="text" style={{ textAlign: "left" }} />
                            </label>

                            <label className="label-login" style={{ width: "45%", textAlign: "left" }}>
                                <span>Họ</span>
                                <input className="input-login" type="text" style={{ textAlign: "left" }} />
                            </label>
                        </div>
                        <label className="label-login" style={{ textAlign: "left" }}>
                            <span>Email</span>
                            <input className="input-login" type="email" style={{ textAlign: "left" }} />
                        </label>
                        <label className="label-login" style={{ textAlign: "left" }}>
                            <span>Tên tài khoản</span>
                            <input className="input-login" type="text" style={{ textAlign: "left" }} value={user_name_up}
                                onChange={e => {
                                    setUserNameUP(e.target.value)
                                }}
                            />
                        </label>
                        <label className="label-login" style={{ textAlign: "left" }}>
                            <span>Mật khẩu</span>
                            <input className="input-login" suggested="current-password" type="password" value={password_up} style={{ textAlign: "left" }}
                                onChange={e => {
                                    setPasswordUp(e.target.value)
                                }}
                            />
                        </label>
                        <button type="button" className="submit button-login">Đăng ký</button>
                        <div className="d-flex login-button-container">
                            <button type="button" className="fb-btn button-login"><span>Facebook</span></button>
                            <button type="button" className="fb-btn button-login g-btn"><span>Goole+</span></button>
                        </div>
                    </form>
                </div>
            </div>
            <Modal  show={show} toggle={toggle} data={data}/>
        </div>
    )
}

export default LoginComponent;