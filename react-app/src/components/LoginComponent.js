import React, { useEffect, useState } from 'react';
import * as utils from '../utils';
import { useAuth } from '../contexts/UserContext';
import LoadingComponent from './commons/LoadingComponent';
import ModalCustom from './commons/ModalCustom';
import eye from '../assets/images/eye-regular.svg';
import eye_slash from '../assets/images/eye-slash-solid.svg';
import { ROLES } from '../constants';
import { useHistory } from 'react-router';

function LoginComponent() {
    const auth = useAuth();
    const { isFetching } = useAuth();
    const [user_name, setUserName] = useState("");
    const [show, setShow] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [user_name_up, setUserNameUP] = useState("");
    const [password_up, setPasswordUp] = useState("");
    const [data, setData] = useState({ title: "Thông báo", desc: "" });
    const [profile, setProfile] = useState({ firstname: "", lastname: "" })
    const [email, setEmail] = useState("");
    const defaultRoles = [ROLES.USER];

    const history = useHistory();

    const toggle = () => {
        setShow(!show);
    }

    const handleSignup = async () => {
        let data = { ...profile, email: email, user_name: user_name_up.toLowerCase(), password: password_up }
        localStorage.setItem("signupReq", JSON.stringify(data));
        const mes = utils.validates.validatePassword(password_up);

        if (mes) {
            alert(mes);
            return;
        }

        if(data.user_name.length < 8){
            alert("Tên tài khoản tối thiếu 8 ký tự!");
            return;
        }
        if (!utils.validates.validateEmail(email)) {
            alert("Email không đúng định dạng!");
            return;
        }
        const res = utils.validates.validateFields(data);
        if (res) {
            alert(res);
            return;
        }
        data = { ...data, roles: defaultRoles };
        if (auth.signup) {
            try {
                const res = await auth.signup(data);
                if (!res.message === "Sent") {
                    alert(res.message);
                } else {
                    alert("Đăng ký tài khoản thành công. Xác thực tài khoản!");
                    history.push({
                        pathname: "/verify",
                        state: {user_name: user_name_up, email: email}
                    });

                }
            } catch (err) {
                let desc = "";
                if (err.message) desc = err.message;
                else desc = err;
                setData({ ...data, desc });
                toggle();
            }
        }

    }

    const getDataFromLocalStorage = () => {
        let loginReq = localStorage.getItem("loginReq");
        if (loginReq) {
            loginReq = JSON.parse(loginReq);
            setPassword(loginReq.password);
            setUserName(loginReq.user_name);
        }

        let signupReq = localStorage.getItem("signupReq");
        if (signupReq) {
            signupReq = JSON.parse(signupReq);
            setPasswordUp(signupReq.password);
            setUserNameUP(signupReq.user_name);
            setEmail(signupReq.email);
            setProfile({ ...profile, firstname: signupReq.firstname, lastname: signupReq.lastname })
        }
    }
    useEffect(() => {
        const ac = new AbortController();
        getDataFromLocalStorage();
        return () => ac.abort();
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const handleLogin = async () => {
        localStorage.setItem("loginReq", JSON.stringify({ user_name: user_name.toLowerCase(), password }));
        if (user_name.length === 0) {
            alert("Thiếu thông tin tên đăng nhập");
            return;
        }
        if (password.length === 0) {
            alert("Thiếu thông tin mật khẩu")
        }
        if (auth.login) {
            try {
                await auth.login(user_name.toLowerCase(), password);
            } catch (err) {
                let desc = "";
                if(err.response.data){
                    desc = err.response.data.message;
                }
                else desc = err.message;
                setData({ ...data, desc });
                toggle();
            }
        }
    }
    return (
        <div className="login">
            {
                isFetching && <LoadingComponent />
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
                        <input className="input-login" autoComplete="true" type="password" value={password}
                            onChange={e => {
                                setPassword(e.target.value)
                            }}
                        />
                    </label>
                    <p className="forgot-pass"
                        onClick={() => {
                            history.push("/forgot-password")
                        }}
                    >Quên mật khẩu?</p>
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
                                <input className="input-login" type="text" style={{ textAlign: "left" }}
                                    value={profile.firstname}
                                    onChange={(e) => {
                                        setProfile({ ...profile, firstname: e.target.value });
                                    }}
                                />
                            </label>

                            <label className="label-login" style={{ width: "45%", textAlign: "left" }}>
                                <span>Họ</span>
                                <input className="input-login" type="text" style={{ textAlign: "left" }}
                                    value={profile.lastname}
                                    onChange={(e) => {
                                        setProfile({ ...profile, lastname: e.target.value });
                                    }}
                                />
                            </label>
                        </div>
                        <label className="label-login" style={{ textAlign: "left" }}>
                            <span>Email</span>
                            <input className="input-login" type="email" style={{ textAlign: "left" }}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </label>
                        <label className="label-login" style={{ textAlign: "left" }}>
                            <span>Tên tài khoản</span>
                            <input className="input-login" type="text" style={{ textAlign: "left" }} value={user_name_up}
                                onChange={e => {
                                    setUserNameUP(e.target.value)
                                }}
                            />
                        </label>
                        <label className="label-login" style={{ textAlign: "left", position: "relative" }}>
                            <span>Mật khẩu</span>
                            <input className="input-login" autoComplete="true" type={showPassword ? "text" : "password"} value={password_up} style={{ textAlign: "left" }}
                                onChange={e => {
                                    setPasswordUp(e.target.value);
                                }}
                            />
                            <img className="icon-password" style={{ width: "1.5rem", height: "auto", position: "absolute", right: "0", bottom: "0.5rem" }} src={!showPassword ? eye_slash : eye} alt="icon"
                                onClick={() => setShowPassword(!showPassword)}
                            />
                            {/* <span className={`alert-pass ${showAlert ? "active" : ""}`} style={{display: showAlert ? "block" : "none"}} role="alert">Mật khẩu phải chứa it nhất 8 ký tự</span> */}
                        </label>
                        <button type="button" className="submit button-login"
                            onClick={handleSignup}
                        >Đăng ký</button>
                        <div className="d-flex login-button-container">
                            <button type="button" className="fb-btn button-login"><span>Facebook</span></button>
                            <button type="button" className="fb-btn button-login g-btn"><span>Goole+</span></button>
                        </div>
                    </form>
                </div>
            </div>
            <ModalCustom show={show} toggle={toggle} data={data} />
        </div>
    )
}

export default LoginComponent;