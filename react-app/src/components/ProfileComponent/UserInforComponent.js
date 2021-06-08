import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';
import check from '../../assets/images/check.svg';
import unCheck from '../../assets/images/un-check.svg';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fetchApi from '../../services/fetchApi';
import * as urls from '../../services/url';
import Cookies from 'js-cookie';
import * as utils from '../../utils';
import { useHistory } from 'react-router';

const GENDERS = ["Nữ", "Nam", "Khác", "Chưa có"];

function UserInforComponent({ user, other, loading, setLoading }) {
    const u = other ? other : user;
    const history = useHistory();

    const [firstname, setFirstname] = useState("");
    const [canEdit, setCanEdit] = useState(false);
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState(null);
    const [phone_number, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState(3);
    const [description, setDescription] = useState("");
    const [is_verify, setIs_verify] = useState(0);

    const goToBoxChat = () => {
        if (user.roles.length == 1) {
            history.push("/chats/conversation/" + user.account_id);
            return;
        } else {
            if (other && other.roles.length == 1) {
                history.push("/chats/conversation/" + other.account_id);
                return;
            }
        }
    }

    useEffect(() => {
        if (u === null) {

        } else {
            setFirstname(u.profile.firstname || "");
            setLastname(u.profile.lastname || "");
            setEmail(u.email || "");
            setDob(u.profile.dob ? new Date(u.profile.dob) : null);
            setPhoneNumber(u.profile.phone_number || "");
            setGender(u.profile.gender ? u.profile.gender : 3);
            setAddress(u.profile.address || "");
            setDescription(u.profile.description || "");
            setIs_verify(u.is_verify);
        }
    }, [u])// eslint-disable-line react-hooks/exhaustive-deps

    const handleUpdateProfile = async () => {
        if (!utils.validates.validatePhoneNumber(phone_number) && phone_number.length > 0) {
            alert("Số điện thoại không đúng định dạng");
            return;
        }
        setLoading(true);
        try {
            const token = Cookies.get('token');
            if (token) {
                await fetchApi("PUT", urls.PROFILE_URL, { firstname, lastname, dob, gender, address, description, phone_number }, token);
                setLoading(false);
                setTimeout(() => {
                    alert("Lưu thành công");
                }, 300)
                setCanEdit(false);
            } else {
                setLoading(false);
                setTimeout(() => {
                    alert("Không tìm thấy token");
                }, 300)
            }
        } catch (err) {
            setFirstname(user.profile.firstname || "");
            setLastname(user.profile.lastname || "");
            setDob(user.profile.dob ? new Date(user.profile.dob) : null);
            setPhoneNumber(user.profile.phone_number || "");
            setGender(user.profile.gender ? user.profile.gender : 3);
            setAddress(user.profile.address || "");
            setDescription(user.profile.description || "");
            setLoading(false);
            setTimeout(() => {
                alert(err.message);
            }, 300)
        }
    }
    return (
        <div className="profile-info" style={{ background: "#fff" }}>
            <div className="intro d-flex justify-content-between">
                <p className="title">Tài khoản của <span>{u.account_id === user.account_id ? "tôi" : (firstname)}</span>

                    {
                        is_verify
                            ?
                            <img src={check} alt="icon" style={{ width: "1.2rem", marginLeft: ".5rem" }}
                                title="Đã xác thực"
                            />
                            :
                            <img src={unCheck} alt="icon" style={{ width: "1.2rem", marginLeft: ".5rem" }}
                                title="Chưa xác thực"
                            />
                    }
                    <span>
                        {
                            "  (" + u.roles[u.roles.length - 1].role_name + ")"
                        }
                    </span>
                </p>
                <div className="btn-container">

                    {
                        u.account_id === user.account_id
                            ?
                            <>
                                {
                                    (is_verify === 1)
                                        ?
                                        <></>
                                        :
                                        <Button style={{ fontWeight: "bold" }} variant="warning" className="px-4">Xác thực</Button>
                                }
                                <Button style={{ fontWeight: "bold" }} className="px-4"
                                    onClick={() => { history.push("/change-password") }}
                                >Đổi mật khẩu</Button>
                            </>
                            :
                            (user.roles.length > 1 && other && other.roles.length > 1)
                            ?
                            <></>
                            :
                            <Button
                                onClick={goToBoxChat}
                                style={{ fontWeight: "bold" }} className="px-4">Nhắn tin</Button>
                    }
                </div>
            </div>
            <div className="user-info">
                <div className="d-flex justify-content-between">
                    <p className="title">
                        Thông tin người dùng
                    </p>
                    {
                        u.account_id === user.account_id
                            ?
                            <div>
                                {
                                    canEdit
                                        ?
                                        <Button
                                            onClick={() => { setCanEdit(false) }}
                                            className="mx-4 px-4 fw-bold"
                                            style={{ fontWeight: "bold" }}
                                        >
                                            Hủy
                            </Button>
                                        :
                                        <></>
                                }
                                <Button
                                    className="px-4"
                                    style={{ fontWeight: "bold" }}
                                    onClick={() => {
                                        if (canEdit) {
                                            handleUpdateProfile();
                                        } else {
                                            setCanEdit(true);
                                        }
                                    }}
                                    variant={canEdit ? "warning" : "primary"}
                                >
                                    {
                                        canEdit
                                            ?
                                            "Lưu"
                                            :
                                            "Chỉnh sửa"
                                    }
                                </Button>
                            </div>
                            :
                            <div>
                            </div>
                    }
                </div>
                {
                    canEdit
                        ?
                        <>
                            <Row>
                                <Col>
                                    <div className="mb-3">
                                        <label htmlFor="fistname">Tên</label>
                                        <input id="firstname" className="form-control"
                                            value={firstname}
                                            onChange={(e) => setFirstname(e.target.value)}
                                            placeholder="Tên"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="dob">Ngày sinh</label>
                                        <br></br>
                                        <DatePicker selected={dob ? dob : new Date('1-1-1990')} onChange={date => setDob(date)} className="form-control" style={{ width: "100%" }} />
                                    </div>

                                    <div className="mb-3">
                                        <Form.Group controlId="exampleForm.SelectCustomSizeLg">
                                            <Form.Label>Giới tính</Form.Label>
                                            <Form.Control as="select" custom
                                                value={gender}
                                                onChange={(e) => { setGender(e.target.value) }}
                                            >
                                                <option value={1}>Nam</option>
                                                <option value={0}>Nữ</option>
                                                <option value={3}>Khác</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="mb-3">
                                        <label htmlFor="lastname">Họ</label>
                                        <input id="lastname" className="form-control"
                                            value={lastname}
                                            onChange={(e) => setLastname(e.target.value)}
                                            placeholder="Họ"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="address">Địa chỉ</label>
                                        <input id="address" className="form-control"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder="Địa chỉ"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="phone">Số điện thoại</label>
                                        <input id="phone" className="form-control"
                                            value={phone_number}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            placeholder="Số điện thoại"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email">Email (Không được sửa)</label>
                                        <p id="email" className="form-control">
                                            {email}
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mb-3">
                                    <label htmlFor="desc">Mô tả</label>
                                    <textarea id="desc" className="form-control"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Mô tả"
                                    />
                                </Col>
                            </Row>
                        </>
                        :
                        <>
                            <Row>
                                <Col>
                                    <div>
                                        <label htmlFor="fistname">Tên</label>
                                        <p id="firstname" className="form-control">
                                            {firstname}
                                        </p>
                                    </div>

                                    <div>
                                        <label htmlFor="dob">Ngày sinh</label>
                                        <p id="dob" className="form-control">
                                            {
                                                dob
                                                    ?
                                                    (dob.getDate()) + "/" + (dob.getMonth() + 1) + "/" + dob.getFullYear()
                                                    :
                                                    "Chưa có"
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <label htmlFor="gender">Giới tính</label>
                                        <p id="gender" className="form-control">
                                            {GENDERS[gender]}
                                        </p>
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        <label htmlFor="lastname">Họ</label>
                                        <p id="lastname" className="form-control">
                                            {lastname}
                                        </p>
                                    </div>

                                    <div>
                                        <label htmlFor="address">Địa chỉ</label>
                                        <p id="address" className="form-control">
                                            {address}
                                        </p>
                                    </div>

                                    <div>
                                        <label htmlFor="phone">Số điện thoại</label>
                                        <p id="phone" className="form-control">
                                            {phone_number}
                                        </p>
                                    </div>

                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <p id="email" className="form-control">
                                            {email}
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <label htmlFor="desc">Mô tả</label>
                                    <p id="desc" className="form-control" style={{ minHeight: "5rem", height: "auto" }}>
                                        {description ? description : "Chưa có mô tả"}
                                    </p>
                                </Col>
                            </Row>
                        </>
                }
            </div>
        </div>
    )
}

export default UserInforComponent;