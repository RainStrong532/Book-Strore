import * as types from '../constants';

const DEFAULT_STATE = {
    user: null,
    hasLoginError: false,
    isFetching: false,
    dataFetched: false,
    errorMessage: null
}

const reducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS: {
            return {
                ...state,
                hasLoginError: false,
                user: action.payload.DEFAULT_STATE,
                dataFetched: true,
                isFetching: false
            }
        }
        case types.LOGIN_FAILURE: {
            return {
                ...state,
                hasLoginError: true,
                user: null,
                dataFetched: false,
                isFetching: false,
                errorMessage: action.payload
            }
        }
        case types.LOGIN_REQUEST: {
            return {
                ...state,
                hasLoginError: false,
                user: null,
                dataFetched: false,
                isFetching: true,
                errorMessage: null
            }
        }
        default:
            return {
                ...state
            }
    }
}

export default reducer;