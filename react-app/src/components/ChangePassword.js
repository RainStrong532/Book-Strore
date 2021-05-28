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

function ChangePassword() {
    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const histoty = useHistory();
    const [password, setPasssword] = useState("");

    const handleChangePassword = async () => {
        const message = utils.validates.validatePassword(password);
        if (message == null) {
            setIsLoading(true);
            const token = Cookies.get('token');
            if (token) {
                try {
                    let res = await fetchApi("PUT", urls.PASSWORD_URL, { password: password }, token);
                    if (res.success) {
                        alert("Cập nhật nhật mật khẩu thành công!");
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
                        <label htmlFor="password" className="mb-1">Nhập mật khẩu mới</label>
                        <input className="form-control"
                            id="password"
                            value={password}
                            placeholder="Nhập mật khẩu mới"
                            type="password"
                            onChange={(e) => { setPasssword(e.target.value) }}
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <Button variant="success"
                        onClick={handleChangePassword}
                        disabled={password.length == 0}
                    >
                        Đổi mật khẩu
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ChangePassword;