import { put, takeEvery } from 'redux-saga/effects'
import fetchApi from '../services/fetchApi';
import * as urls from '../services/url';

import * as types from '../constants'

function* login(action) {
    try {
        const res = yield fetchApi("POST", urls.LOGIN_URL, action.payload);
        if (res.token) {
            yield put({
                type: types.LOGIN_SUCCESS,
                payload: {
                    token: res.token
                }
            })
            yield put({
                type: types.GET_USER_INFO_REQUEST,
            })
        } else {
            yield put({
                type: types.LOGIN_FAILURE,
                payload: res.message
            })
        }
    } catch (error) {
        yield put({
            type: types.LOGIN_FAILURE,
            payload: error
        })
    }
}

function* getMyInfo() {
    try {
        let auth = localStorage.getItem("token");
        auth = JSON.parse(auth);
        const res = yield fetchApi("GET", urls.USER_URL, null, auth.token);
        if (!res.message) {
            yield put({
                type: types.GET_USER_INFO_SUCCESS,
                payload: res
            })
        } else {
            yield put({
                type: types.GET_USER_INFO_FAILURE,
                payload: res.message
            })
        }
    } catch (error) {
        yield put({
            type: types.GET_USER_INFO_FAILURE,
            payload: error
        })
    }
}
export const UserSaga = [
    takeEvery(types.LOGIN_REQUEST, login),
    takeEvery(types.GET_USER_INFO_REQUEST, getMyInfo),
]