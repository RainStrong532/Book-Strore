import React, { createContext, useState, useContext, useEffect } from 'react'
import Cookies from 'js-cookie'

import fetchApi from '../services/fetchApi';
import * as urls from '../services/url';
import LoadingComponent from '../components/commons/LoadingComponent';
import { Redirect } from 'react-router';



const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);

    async function loadUserFromCookies() {
        const token = Cookies.get('token');
        if (token) {
            setLoading(true);
            try {
                let user = await fetchApi("GET", urls.USER_URL, null, token);
                if (!user.message) {
                    setUser(user);
                }
            } catch (err) {
            }
        }
        setLoading(false)
    }

    useEffect(() => {
        loadUserFromCookies();
    }, [])

    const login = (username, password) => {
        return new Promise(async (resolve, reject) => {
            setIsFetching(true);
            try {
                const data = await fetchApi("POST", urls.LOGIN_URL, { user_name: username, password });
                if (data.token) {
                    Cookies.set('token', data.token, { expires: 60 })
                    let user = await fetchApi("GET", urls.USER_URL, null, data.token);
                    if (!user.message) {
                        setUser(user);
                        setIsFetching(false)
                        resolve(user);
                    }
                    setIsFetching(false)
                    reject(user)
                }
                setIsFetching(false)
                reject(data)
            } catch (err) {
                setIsFetching(false)
                reject(err)
            }
        })
    }

    const logout = () => {
        Cookies.remove('token')
        // setUser(null);
    }


    return (
        <AuthContext.Provider value={{ user: user, login, loading, isFetching, logout }}>
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
        if ((!user && window.location.pathname !== '/login')) {
            return (<Redirect to="/login" />);
        } else if ((window.location.pathname === '/login' || window.location.pathname === '/' || window.location.pathname === '' || window.location.pathname === '/home') && user) {
            return (<Redirect to="/" />);
        } else {
            return children;
        }
    }
};