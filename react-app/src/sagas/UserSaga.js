import { put, takeEvery } from 'redux-saga/effects'

import * as types from '../constants'

function* login() {
    try {
        // const res = yield callGetApi()
        yield put({
            type: types.LOGIN_SUCCESS,
            payload: {
                user_name: "abc"
            }
        })
    } catch (error) {
        yield put({
            type: types.LOGIN_FAILURE,
            payload:"Error"
        })
    }
}
export const UserSaga = [
    takeEvery(types.LOGIN_REQUEST, login),
]