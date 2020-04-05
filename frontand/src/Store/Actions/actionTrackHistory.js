import {ORDER_TRACK_HISTORY_REQUEST, ORDER_TRACK_HISTORY_SUCCESS, ORDER_TRACKS_ERROR} from "./Actionstype";
import axiosApi from "../../axiosApi";
import {push} from 'connected-react-router';

export const orderTrackHistorySuccess = tracks => ({type: ORDER_TRACK_HISTORY_SUCCESS, tracks});
export const orderTrackHistoryRequest = () => ({type: ORDER_TRACK_HISTORY_REQUEST});
export const orderTrackHistoryError = error => ({type: ORDER_TRACKS_ERROR, error});

export const orderTrackHistory = () => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        if (!token){
                dispatch(push('/login'))
        }else{
            try {
                dispatch(orderTrackHistoryRequest());
                const tracks = await axiosApi.get('/track_history', {headers: {'Authorization': `Token ${token}`}});
                dispatch(orderTrackHistorySuccess(tracks.data))
            } catch (e) {
                dispatch(orderTrackHistoryError(e))
            }
        }

    }
};

export const orderPlayMusik = (id) => {
    return async (dispatch, getState) => {
        const token = getState().users.user;
        try {
            dispatch(orderTrackHistoryRequest());
            await axiosApi.post('/track_history', {id}, {headers: {'Authorization': `Token ${token.token}`}})
        } catch (e) {
            dispatch(orderTrackHistoryError(e.response.data))
        }
    }
};