import React, { createContext, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie'

import fetchApi from '../services/fetchApi';
import * as services from '../services'
import * as urls from '../services/url';
import LoadingComponent from '../components/commons/LoadingComponent';
import { Redirect } from 'react-router';
import NotAuthorizedComponent from '../components/commons/NotAuthorizedComponent';


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);

    const loadUserFromCookies = async () => {
        const token = Cookies.get('token');
        if (token) {
            setLoading(true);
            try {
                let user = await services.auth.getUserInfo(token);
                setUser(user);
            } catch (err) {
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        const ac = new AbortController();
        loadUserFromCookies();
        return () => ac.abort();
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    const loadUser = async function () {
        const token = Cookies.get('token');
        if (token) {
            setIsFetching(true);
            try {
                let user = await await services.auth.getUserInfo(token);
                setUser(user);
            } catch (err) {
            }
        }
        setIsFetching(false)
    }

    const login = (user_name, password) => {
        return new Promise(async (resolve, reject) => {
            setIsFetching(true);
            try {
                const result = await services.auth.login({ user_name, password });
                let user = await services.auth.getUserInfo(result.data.token);
                localStorage.removeItem("loginReq");
                Cookies.set('token', result.data.token, { expires: 60 })
                setUser(user);
                setIsFetching(false)
                resolve(user);
            } catch (err) {
                setIsFetching(false)
                reject(err)
            }
        })
    }

    const signup = (data) => {
        return new Promise(async (resolve, reject) => {
            setIsFetching(true);
            try {
                await services.auth.signup(data);
                const result = await services.auth.login({ user_name: data.user_name, password: data.password });
                await services.profile.createProfile({ firstname: data.firstname, lastname: data.lastname }, result.data.token);
                const res = await sendVerify(data);
                if (res.message === "Sent") {
                    localStorage.removeItem("signupReq");
                    setIsFetching(false)
                    resolve(res);
                }
                setIsFetching(false)
                reject(res)
            } catch (err) {
                setIsFetching(false)
                reject(err)
            }
        })
    }

    const sendVerify = (data) => {
        return new Promise(async (resolve, reject) => {
            setIsFetching(true);
            try {
                let res = await fetchApi("POST", urls.MAILS_URL, { user_name: data.user_name });
                setIsFetching(false)
                resolve(res)
            } catch (err) {
                setIsFetching(false)
                reject(err)
            }
        })
    }

    const verify = (data) => {
        return new Promise(async (resolve, reject) => {
            setIsFetching(true);
            try {
                const res = await fetchApi("POST", urls.VERIFY_URL, { code: data.code, user_name: data.user_name });
                setIsFetching(false)
                resolve(res);
            } catch (err) {
                setIsFetching(false)
                reject(err)
            }
        })
    }

    const logout = () => {
        Cookies.remove('token')
        setUser(null);
    }


    return (
        <AuthContext.Provider value={{ user: user, login, loading, isFetching, logout, signup, sendVerify, verify, loadUser }}>
            {children}
        </AuthContext.Provider>
    )
}



export const useAuth = () => useContext(AuthContext)

export const ProtectRoute = ({ children }) => {
    const { user, loading, isFetching } = useAuth();
    const [windowReady, setWindowReady] = useState(false);

    useEffect(() => {
        setWindowReady(true);
    }, [windowReady])
    if (!windowReady || loading) {
        return (
            <>
                <LoadingComponent />
            </>
        );
    } else if (isFetching) {
        return children;
    }
    else {
        const path = window.location.pathname;
        if (path === '/' || path === '/home' || path === '/verify') { // public pages
            return children;
        } else if (!user) {
            if (path !== '/login' && path !== '/forgot-password') {
                return (<Redirect to="/login" />);
            } else {
                return children;
            }
        } else {
            if (path === '/login') {
                if (user.roles.length > 1) {
                    return (<Redirect to="/admin/home" />)
                } else {
                    return (<Redirect to="/" />)
                }
            } else if (user.is_verify !== 1) {
                return (<Redirect to="/verify" />)
            } else if (path.startsWith('/admin')) {
                if (user.roles.length === 1) {
                    console.log("user");
                    return (<NotAuthorizedComponent />);
                } else if (path.startsWith('/admin/managements/employees')) {
                    if (user.roles.length === 3) {
                        return children;
                    } else {
                        return (<NotAuthorizedComponent />);
                    }
                } else {
                    return children;
                }
            } else {
                return children;
            }
        }
    }
};