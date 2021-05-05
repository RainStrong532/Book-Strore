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

export function logout(payload) {
    return ({
        type: types.LOGOUT_REQUEST,
        payload
    })
}