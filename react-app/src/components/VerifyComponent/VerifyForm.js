import React from 'react';
import { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
import { useHistory } from "react-router";
import { useAuth } from "../../contexts/UserContext";
import LoadingComponent from '../commons/LoadingComponent';
import Cookies from 'js-cookie';

function VerifyForm() {
    const [title, setTitle] = useState("");
    const [verifyCode, setVerifyCode] = useState("");
    const auth = useAuth();
    const [counter, setCounter] = useState(30);
    const [isSend, setIsSend] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const histoty = useHistory();
    const [user_name, setUserName] = useState(null);

    const handleVerify = async () => {
        if (auth.verify) {
            setIsLoading(true);
            try {
                const res = await auth.verify({ code: verifyCode, user_name: user_name ? user_name : auth.user.user_name });
                if (res.message === "success") {
                    alert("Xác thực tài khoản thành công bạn cần đăng nhập lại để tiếp tục");
                    Cookies.remove("token");
                    histoty.push("/login");
                } else {
                    alert(res.message);
                }
            }
            catch (err) {
                alert(err.message);
            }
            setIsLoading(false);
        }
    }

    const handleResend = async () => {
        if (auth.sendVerify) {
            setIsLoading(true);
            try {
                const res = await auth.sendVerify({ user_name: auth.user.user_name });
                if (res.message !== "Sent") {
                    alert(res.message);
                } else {
                    setTitle("Mã xác thực đã được gửi tới email " + auth.user.email);
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
        }
    }

    useEffect(() => {
        if (!auth.user) {
            if (window.history.state.state && window.history.state.state.user_name) {
                setUserName(window.history.state.state.user_name);
            } else {
                alert('Bạn cần đăng nhập để xác thực tài khoản');
                histoty.push("/login");
            }

        }
        else if (auth.user.is_verify === 0) {
            if (!isSend)
                setTitle("Tài khoản của bạn chưa được xác thực.\n Xác thực ngay?");
        } else {
            alert("Tài khoản của bạn đã được xác thực. Trở về trang chủ");
            if (auth.user.roles.length===1) {
                histoty.push("/");
            }
            else {
                histoty.push("/admin/home");
            }
        }
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
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
            <div className="col-6 d-flex flex-column justify-content-between" style={{ background: "#FFFFFF", borderRadius: "1rem", boxShadow: "1px 2px 4px #999", minHeight: "65vh", padding: "2rem", margin: "2rem 0" }}>
                <div>
                    <h3 style={{ fontWeight: "600" }}>{title}
                        {isSend && <span style={{ fontSize: "1rem", paddingLeft: "0.3rem" }}>(mail có thể có trong hộp thư rác của bạn)</span>}
                    </h3>
                    {
                        isSend && <input className="form-control mt-5"
                            value={verifyCode}
                            onChange={(e) => { setVerifyCode(e.target.value) }}
                        />
                    }
                </div>
                <div className="d-flex justify-content-end">

                    {
                        isSend
                            ?
                            <>
                                <Button className="mx-3" disabled={counter > 0}
                                    onClick={handleResend}
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
                                    onClick={handleVerify}
                                >
                                    Xác nhận
                            </Button>
                            </>
                            :
                            <Button
                                onClick={handleResend}
                            >Xác thực</Button>
                    }

                </div>
            </div>
        </>
    )
}

export default VerifyForm;