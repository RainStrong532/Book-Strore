import * as types from '../constants'

export function login(payload) {
    return ({
        type: types.LOGIN_REQUEST,
        payload
    })
}

export function signup(payload) {
    return ({
        type: types.SIGNUP_REQUEST,
        payload
    })
}

export function sendMailSignup(payload) {
    return ({
        type: types.SEND_MAIL_SIGNUP_REQUEST,
        payload
    })
}

export function logout(payload) {
    return ({
        type: types.LOGOUT_REQUEST,
        payload
    })
}

export function getMyInfor(payload) {
    return ({
        type: types.GET_USER_INFO_REQUEST,
        payload
    })
}