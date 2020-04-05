import {
    LOGIN_FB_USER_ERROR, LOGIN_FB_USER_REQUEST,
    LOGIN_FB_USER_SUCCESS,
    LOGOUT_USER_ERROR,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    ORDER_LOGIN_ERROR,
    ORDER_LOGIN_REQUEST,
    ORDER_LOGIN_SUCCESS,
    ORDER_REGISTER_ERROR,
    ORDER_REGISTER_REQUEST,
    ORDER_REGISTER_SUCCESS
} from "../Actions/Actionstype";

const initialState = {
    user: null,
    error: null,
    loading: false,
    loginError: null,
    logoutLoad: null,
    logoutError: null,
    loginFbError: null,
    loginFbLoad: false
};

const reducerUser = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_REGISTER_SUCCESS:
            return {...state,user: action.user, loading: false, error: null};
        case ORDER_REGISTER_REQUEST:
            return {...state, loading: true};
        case ORDER_REGISTER_ERROR:
            return {...state, error: action.error, loading: false};
        case ORDER_LOGIN_SUCCESS:
            return {...state, user: action.user, loading: false, loginError: null};
        case ORDER_LOGIN_REQUEST:
            return {...state, loading: true, loginError: null};
        case ORDER_LOGIN_ERROR:
            return {...state, loginError: action.error};
        case LOGOUT_USER_SUCCESS:
            return {...state, user: null, logoutLoad: false};
        case LOGOUT_USER_REQUEST:
            return {...state, logoutLoad: true};
        case LOGOUT_USER_ERROR:
            return {...state, logoutError: action.error, logoutLoad: false};
        case LOGIN_FB_USER_SUCCESS:
            return {...state, user: action.user, loginFbError: null, loginFbLoad: false};
        case LOGIN_FB_USER_ERROR:
            return {...state, loginFbError: action.error, loginFbLoad: false};
        case LOGIN_FB_USER_REQUEST:
            return {...state, loginFbLoad: true};
        default:
            return state
    }
};

export default reducerUser;