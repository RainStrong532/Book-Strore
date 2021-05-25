import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/UserContext';

function Menu() {
    const auth = useAuth();
    const { user } = auth;
    const [isAdmin, setAdmin] = useState(false);

    useEffect(() => {
        if (user && user.roles && user.roles.length > 1) {
            setAdmin(true);
        } else {
            setAdmin(false);
        }
    }, [user])
    return (
        <>
            <nav id="menu" className="nav">
                <div className="inner">
                    <h2 className="h2-1">Menu</h2>
                    {
                        isAdmin
                            ?
                            <ul className="ul">
                                <li><a href="/" className="active">Home</a></li>

                                <li><a href="/admin/managements/books">Quản lý sách</a></li>

                                <li><a href="/admin/managements/promotional-programmes">Quản lý chương trình khuyến mãi</a></li>

                                <li><a href="/admin/managements/about-us">Quản lý thông tin giới thiệu</a></li>

                                {
                                    user.roles.length === 3
                                    ?
                                    <li><a href="/admin/managements/employees">Quản lý thông tin nhân viên</a></li>
                                    :
                                    <>
                                    </>
                                }
                            </ul>
                            :
                            <ul className="ul">
                                <li><a href="/" className="active">Trang chủ</a></li>

                                <li>
                                    <a href="#" className="dropdown-toggle" aria-disabled>Thể loại</a>
                                    <ul className="ul">
                                        <li><a href="/categories/comics">Truyện</a></li>
                                        <li><a href="/categories/books">Sách</a></li>
                                    </ul>
                                </li>

                                <li>
                                    <a href="/products/best-sale">Sách bán chạy</a>
                                </li>

                                <li>
                                    <a href="/products/discount">Giảm giá đặc biệt</a>
                                </li>

                                <li>
                                    <a href="/promotional-programmes">Chương trình khuyến mãi</a>
                                </li>

                                <li>
                                    <a href="/about-us">Giới thiệu</a>
                                </li>
                            </ul>
                    }
                </div><a className="close" href="#menu">Close</a></nav>
        </>
    )
}

export default Menu;