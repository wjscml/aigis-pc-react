import { loadLoginState, loadStick } from '../../common/js/cache.js'
import { type } from '../action'
const initialState = {
    userInfo: loadLoginState(),
    stickNumber: loadStick(),
    indexBar: null
}

export default (state=initialState, action) => {
    switch (action.type) {
        case type.USER_INFO:
            return {
                ...state,
                userInfo: action.userInfo
            }
        case type.STICK:
            return {
                ...state,
                stickNumber: action.stickNumber
            }
        case type.INDEX_BAR:
            return {
                ...state,
                indexBar: action.indexBar
            }
        default:
            return {
                ...state
            }
    }
}