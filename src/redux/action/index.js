import { saveLoginState, saveStick } from '../../common/js/cache.js'
export const type = {
    USER_INFO: 'USER_INFO',
    STICK: 'STICK',
    INDEX_BAR: 'INDEX_BAR'
}

export function saveUserInfo(val) {
    return {
        type: type.USER_INFO,
        userInfo: saveLoginState(val)
    }
}

export function saveStickNumber(val) {
    return {
        type: type.STICK,
        stickNumber: saveStick(val)
    }
}

export function saveIndexBar(val) {
    return {
        type: type.INDEX_BAR,
        indexBar: val
    }
}