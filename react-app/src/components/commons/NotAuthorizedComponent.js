import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';

function NotAuthorizedComponent() {
    const history = useHistory();
    return (
        <div className="not-author d-flex flex-column justify-content-center align-items-center" style={{ height: "80vh" }}>
            <h1 className="text-center">
                Tài khoản của bạn không đủ quyền<br></br> để truy cập trang này
            </h1>
            <Button variant="primary mt-5 py-3 px-5"
                style={{ fontWeight: "bold", fontSize: "1.2rem" }}
                onClick={() => {
                    history.push("/");
                }}
            >Về trang chủ</Button>
        </div>
    )
}

export default NotAuthorizedComponent;
