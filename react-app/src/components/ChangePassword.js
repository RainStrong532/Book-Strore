import React from 'react';
import { useState } from "react";
import { Button } from 'react-bootstrap';
import { useHistory } from "react-router";
import { useAuth } from "../contexts/UserContext";
import LoadingComponent from './commons/LoadingComponent';
import fetchApi from '../services/fetchApi'
import * as utils from '../utils';
import * as urls from '../services/url'
import Cookies from 'js-cookie'
import eye from '../assets/images/eye-regular.svg';
import eye_slash from '../assets/images/eye-slash-solid.svg';

function ChangePassword() {
    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const histoty = useHistory();
    const [password, setPasssword] = useState("");
    const [oldPassword, setOldPasssword] = useState("");
    const [showPassword, setShowPassword] = useState(false);


    const handleChangePassword = async () => {
        const message = utils.validates.validatePassword(password);
        let data = { password: password, oldPassword: oldPassword };
        if (message === null) {
            setIsLoading(true);
            const token = Cookies.get('token');
            if (token) {
                try {
                    let res = await fetchApi("PUT", urls.PASSWORD_URL, data, token);
                    if (res.success) {
                        alert(res.message);
                        histoty.push(`/profiles?profile_id=${auth.user.account_id}`);
                    } else {
                        alert(res.message);
                    }
                } catch (err) {
                    alert(err.message);
                }
            }
            setIsLoading(false);
        } else {
            alert(message);
        }
    }
    return (
        <>
            {isLoading && <LoadingComponent />}
            <div className="col-6 d-flex flex-column justify-content-between" style={{ background: "#FFFFFF", borderRadius: "1rem", boxShadow: "1px 2px 4px #999", minHeight: "65vh", padding: "2rem", margin: "2rem 0" }}>
                <div>
                    <h3 style={{ fontWeight: "600" }}>
                        Đổi mật khẩu
                            </h3>
                    <div className="mt-3">
                        <label htmlFor="old-password" className="mb-1">Nhập mật khẩu cũ</label>
                        <input className="form-control"
                            id="old-password"
                            value={oldPassword}
                            placeholder="Nhập mật khẩu cũ"
                            type="password"
                            onChange={(e) => { setOldPasssword(e.target.value) }}
                        />
                    </div>
                    <div className="mt-3 position-relative">
                        <label htmlFor="password" className="mb-1">Nhập mật khẩu mới</label>
                        <input className="form-control"
                            id="password"
                            value={password}
                            placeholder="Nhập mật khẩu mới"
                            type={showPassword ? "text" : "password"}
                            onChange={(e) => { setPasssword(e.target.value) }}
                        />
                        <img className="icon-password" style={{ width: "1.5rem", height: "auto", position: "absolute", right: "0.5rem", bottom: "0.5rem" }} src={!showPassword ? eye_slash : eye} alt="icon"
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <Button variant="success"
                        onClick={handleChangePassword}
                        disabled={password.length === 0 || oldPassword.length === 0}
                    >
                        Đổi mật khẩu
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ChangePassword;