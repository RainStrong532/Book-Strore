import { all } from 'redux-saga/effects'
import { UserSaga } from './UserSaga'

function* rootSaga() {
    yield all(
        [
            ...UserSaga
        ]
    )
}
export default rootSaga;