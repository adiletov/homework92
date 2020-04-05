import {
    LOGIN_FB_USER_ERROR,
    LOGIN_FB_USER_REQUEST,
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
} from "./Actionstype";
import axiosApi from "../../axiosApi";
import {push} from 'connected-react-router';

export const orderRegisterSuccess = (user) => ({type: ORDER_REGISTER_SUCCESS, user});
export const orderRegisterRequest = () => ({type: ORDER_REGISTER_REQUEST});
export const orderRegisterError = (error) => ({type: ORDER_REGISTER_ERROR, error});


export const orderLoginSuccess = (user) => ({type: ORDER_LOGIN_SUCCESS, user});
export const orderLoginRequest = () => ({type: ORDER_LOGIN_REQUEST});
export const orderLoginError = (error) => ({type: ORDER_LOGIN_ERROR, error});

export const logoutUserSuccess = () => ({type: LOGOUT_USER_SUCCESS});
export const logoutUserRequest = () => ({type: LOGOUT_USER_REQUEST});
export const logoutUserError = error => ({type: LOGOUT_USER_ERROR, error});

export const loginFbUserSuccess = (user) => ({type: LOGIN_FB_USER_SUCCESS, user});
export const loginFbUserRequest = () => ({type: LOGIN_FB_USER_REQUEST});
export const loginFbUserError = error => ({type: LOGIN_FB_USER_ERROR, error});

export const orderRegister = (user) => {
    return async (dispatch) => {
        try {
            dispatch(orderRegisterRequest());
            const res = await axiosApi.post('/users', user);
            dispatch(orderRegisterSuccess(res.data));
            dispatch(push('/'));
        } catch (error) {
            if (error.response && error.response.data) {
                dispatch(orderRegisterError(error.response.data));
            } else {
                dispatch(orderRegisterError({global: 'No connection'}));
            }
        }
    }
};

export const facebookLogin = user => {
    return async (dispatch) => {
        try {
            dispatch(loginFbUserRequest());
            const res = await axiosApi.post('/users/facebook', user);
            dispatch(loginFbUserSuccess(res.data));
            dispatch(push('/'));
        }catch (e) {
            dispatch(loginFbUserError(e));
        }
    }
};

export const orderLogin = (user) => {
    return async (dispatch) => {
        try {
            dispatch(orderLoginRequest());
            const res = await axiosApi.post('/users/sessions', user);
            dispatch(orderLoginSuccess(res.data));
            dispatch(push('/'))
        } catch (error) {
            if (error.response && error.response.data) {
                dispatch(orderLoginError(error.response.data));
            } else {
                dispatch(orderLoginError({global: 'No connection'}));
            }
        }
    }
};


export const logoutUser = () => {
  return async (dispatch) =>{
      try {
          dispatch(logoutUserRequest());
          await axiosApi.delete('/users/sessions');
          dispatch(logoutUserSuccess());
          dispatch(push('/'));
      } catch (error){
          dispatch(logoutUserRequest());
          if (error.response && error.response.data) {
              dispatch(logoutUserError(error.response.data));
          } else {
              dispatch(logoutUserError({global: 'No connection'}));
          }
      }
  }
};