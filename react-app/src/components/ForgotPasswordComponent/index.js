import React from 'react';
import { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
import { useHistory } from "react-router";
import { useAuth } from "../../contexts/UserContext";
import LoadingComponent from '../commons/LoadingComponent';
import fetchApi from '../../services/fetchApi'
import * as utils from '../../utils';
import * as urls from '../../services/url'

let firstLoad = true;

function ForgotPasswordComponent() {
    const [title, setTitle] = useState("");
    const [userInfo, setUserInfo] = useState("");
    const [account_id, setAccountId] = useState(null);
    const [verifyCode, setVerifyCode] = useState("");
    const auth = useAuth();
    const [counter, setCounter] = useState(30);
    const [isSend, setIsSend] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const histoty = useHistory();
    const [canChange, setChange] = useState(false);
    const [password, setPasssword] = useState("");
    const [rPassword, setRPasssword] = useState("");

    const handleSend = async () => {
        if (userInfo.length > 0) {
            setIsLoading(true);
            try {
                const res = await fetchApi('PUT', urls.MAILS_URL, { contact: userInfo });
                if (res.message !== "Sent") {
                    alert(res.message);
                } else {
                    setTitle("Mã xác thực đã được gửi tới email " + res.data.email);
                    setAccountId(res.data.account_id);
                    setTimeout(() => {

                    }, 500)
                    setVerifyCode("");
                    setCounter(30);
                    setIsSend(true);
                }
            } catch (err) {
                alert(err.message);
            }
            setIsLoading(false);
        } else {
            alert("Bạn phải điền thông tin trước");
        }
    }

    const handleCheckCode = async () => {
        if (verifyCode.length > 0) {
            setIsLoading(true);
            try {
                const res = await fetchApi('PUT', urls.VERIFY_URL, { code: verifyCode, account_id });
                if (res.success) {
                    setChange(true);
                } else {
                    alert(res.message)
                }
            } catch (err) {
                setChange(false);
                alert(err.message);
            }
            setIsLoading(false);
        } else {
            alert("Bạn phải điền mã xác nhận vào trước");
        }
    }

    const handleResetPassword = async () => {
        const message = utils.validates.validatePassword(password);
        if (message == null) {
            setIsLoading(true);
            try {
                const res = await fetchApi('POST', urls.PASSWORD_URL, { account_id, password });
                if (res.success) {
                    alert("Tạo mới mật khẩu thành công. Về trang đăng nhập!");
                    histoty.push("/login");
                } else {
                    alert(res.message);
                }
            } catch (err) {
                alert(err.message)
            }
            setIsLoading(false);
        } else {
            alert(message);
        }
    }

    useEffect(() => {
        if (firstLoad) {
            firstLoad = false;
            if (auth.user) {
                histoty.goBack();
            } else {
                setTitle("Hãy nhập tên tài khoản hoặc email đã đăng ký của bạn!");
            }
        }
        if (isSend) {
            let c = counter;
            if (c > 0) {
                c = c - 1;
                setTimeout(() => {
                    setCounter(c);
                }, 1000)

            }
        }
    }, [counter, isSend]);
    return (
        <>
            {isLoading && <LoadingComponent desc="Đang gửi..." />}
            {
                canChange
                    ?
                    <div className="col-6 d-flex flex-column justify-content-between" style={{ background: "#FFFFFF", borderRadius: "1rem", boxShadow: "1px 2px 4px #999", minHeight: "65vh", padding: "2rem", margin: "2rem 0" }}>
                        <div>
                            <h3 style={{ fontWeight: "600" }}>{title}
                                Đặt lại mật khẩu
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
                            <div className="mt-3">
                                <label htmlFor="password" className="mb-1">Nhập lại mật khẩu</label>
                                <input className="form-control"
                                    value={rPassword}
                                    type="password"
                                    placeholder="Nhập lại mật khẩu"
                                    onChange={(e) => { setRPasssword(e.target.value) }}
                                />
                            </div>
                            {(password !== rPassword && rPassword.length > 0)
                                ?
                                <div class="alert alert-danger py-2 px-2 mt-3" role="alert">
                                    Mật khẩu không khớp!
                              </div>
                                :
                                <>
                                </>
                            }
                        </div>
                        <div className="d-flex justify-content-end">
                            <Button variant="success"
                                onClick={handleResetPassword}
                                disabled={password !== rPassword && rPassword.length > 0}
                            >
                                Đổi mật khẩu
                            </Button>
                        </div>
                    </div>
                    :
                    <div className="col-6 d-flex flex-column justify-content-between" style={{ background: "#FFFFFF", borderRadius: "1rem", boxShadow: "1px 2px 4px #999", minHeight: "65vh", padding: "2rem", margin: "2rem 0" }}>
                        <div>
                            <h3 style={{ fontWeight: "600" }}>{title}
                                {isSend && <span style={{ fontSize: "1rem", paddingLeft: "0.3rem" }}>(mail có thể có trong hộp thư rác của bạn)</span>}
                            </h3>
                            {
                                isSend
                                    ?
                                    <input className="form-control mt-5"
                                        value={verifyCode}
                                        type="number"
                                        onChange={(e) => { setVerifyCode(e.target.value) }}
                                    />
                                    :
                                    <input className="form-control mt-5"
                                        value={userInfo}
                                        onChange={(e) => { setUserInfo(e.target.value) }}
                                    />
                            }
                        </div>
                        <div className="d-flex justify-content-end">

                            {
                                isSend
                                    ?
                                    <>
                                        <Button className="mx-3" disabled={counter > 0}
                                            onClick={handleSend}
                                        >
                                            {
                                                counter > 0
                                                    ?
                                                    "Gửi lại sau " + counter + "s"
                                                    :
                                                    "Gửi lại"
                                            }
                                        </Button>
                                        <Button variant="success" disabled={verifyCode.length === 0}
                                            onClick={handleCheckCode}
                                        >
                                            Xác nhận
                                        </Button>
                                    </>
                                    :
                                    <Button
                                        onClick={handleSend}
                                        disabled={userInfo.length == 0}
                                    >
                                        Gửi mã xác thực
                            </Button>
                            }

                        </div>
                    </div>
            }
        </>
    )
}

export default ForgotPasswordComponent;