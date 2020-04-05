import {
    ADD_TRACK_ERROR,
    ADD_TRACK_REQUEST,
    ADD_TRACK_SUCCESS,
    ORDER_ALBUM,
    ORDER_TRACKS_ERROR,
    ORDER_TRACKS_REQUEST,
    ORDER_TRACKS_SUCCESS
} from "./Actionstype";
import axiosApi from "../../axiosApi";
import {push} from 'connected-react-router';

export const orderTracksSuccess = tracks => ({type: ORDER_TRACKS_SUCCESS, tracks});
export const orderTracksRequest = () => ({type: ORDER_TRACKS_REQUEST});
export const orderTracksError = error => ({type: ORDER_TRACKS_ERROR, error});

export const orderAlbum = album => ({type: ORDER_ALBUM, album});

export const addTrackSuccess = () => ({type: ADD_TRACK_SUCCESS});
export const addTrackRequest = () => ({type: ADD_TRACK_REQUEST});
export const addTrackError = () => ({type: ADD_TRACK_ERROR});


export const orderTracks = id => {
    return async (dispatch) => {
        try {
            const res = await axiosApi.get('/tracks?album=' + id);
            dispatch(orderTracksRequest());
            dispatch(orderTracksSuccess(res.data));
        } catch (e) {
            dispatch(orderTracksRequest());
            dispatch(orderTracksError(e.response));
        }
    }
};

export const orderAlbumName = id => {
    return async (dispatch) => {
        try {
            dispatch(orderTracksRequest());
            const res = await axiosApi.get('/albums/' + id);
            dispatch(orderAlbum(res.data))
        } catch (e) {
            dispatch(orderTracksRequest());
            dispatch(orderTracksError(e.response))
        }
    }
};

export const addTrackData = (track) => {
    return async (dispatch) => {
        try {
            dispatch(addTrackRequest());
            await axiosApi.post('/tracks', track);
            dispatch(addTrackSuccess());
            dispatch(push('/'))
        } catch (e) {
            dispatch(addTrackRequest());
            dispatch(addTrackError())
        }
    }
};

export const toolbarPublishTrack = (id) => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': 'Token ' + token}};
        try {
            await axiosApi.post(`/tracks/${id}/publish`,{}, config);
        } catch (e) {
            console.error(e);
        }
    }
};

export const deleteTrack = (id) => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': 'Token ' + token}};
        try {
            await axiosApi.delete('/tracks/' + id, config)
        } catch (e) {
            dispatch(console.error(e))
        }
    }
};