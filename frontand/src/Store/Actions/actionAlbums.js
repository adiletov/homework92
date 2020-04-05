import {
    ORDER_ALBUMS_SUCCESS,
    ORDER_ARTIST,
    ORDER_ALBUMS_ERROR,
    ORDER_ALBUMS_REQUEST,
    ADD_ALBUM_SUCCESS,
    ADD_ALBUM_REQUEST,
    ADD_ALBUM_ERROR,
    ORDER_ALL_ALBUMS_SUCCESS,
    ORDER_ALL_ALBUMS_REQUEST,
    ORDER_ALL_ALBUMS_ERROR
} from "./Actionstype";
import axiosApi from "../../axiosApi";
import {push} from 'connected-react-router';

export const orderAlbumSuccess = (albums) => ({type: ORDER_ALBUMS_SUCCESS, albums});
export const orderAlbumError = error => ({type: ORDER_ALBUMS_ERROR, error});
export const orderAlbumRequest = () => ({type: ORDER_ALBUMS_REQUEST});

export const orderArtist = (artist) => ({type: ORDER_ARTIST, artist});

export const addAlbumSuccess = () => ({type: ADD_ALBUM_SUCCESS});
export const addAlbumRequest = () => ({type: ADD_ALBUM_REQUEST});
export const addAlbumError = (error) => ({type: ADD_ALBUM_ERROR, error});

export const orderAllAlbumsSuccess = (albums) => ({type: ORDER_ALL_ALBUMS_SUCCESS, albums});
export const orderAllAlbumsRequest = () => ({type: ORDER_ALL_ALBUMS_REQUEST});
export const orderAllAlbumError = () => ({type: ORDER_ALL_ALBUMS_ERROR,});


export const orderAlbumId = (id) => {
    return async (dispatch) => {
        try {
            const res = await axiosApi.get('/albums?artist=' + id);
            dispatch(orderAlbumSuccess(res.data));
            dispatch(orderAlbumRequest());
        } catch (e) {
            dispatch(orderAlbumError(e.response));
            dispatch(orderAlbumRequest());
        }
    }
};


export const orderArtistName = (id) => {
    return async (dispatch) => {
        try {
            const res = await axiosApi.get('/artists/' + id);
            dispatch(orderArtist(res.data))
        } catch (e) {
            dispatch(orderAlbumRequest());
            dispatch(orderAlbumError(e.response));
        }
    }
};

export const addAlbumData = (album) => {
    return async (dispatch) => {
        try {
            dispatch(addAlbumRequest());
            await axiosApi.post('/albums', album);
            dispatch(addAlbumSuccess());
            dispatch(push('/'))
        } catch (e) {
            dispatch(addAlbumRequest());
            dispatch(addAlbumError(e.response.data))
        }
    }
};

export const orderAlbums = () => {
    return async (dispatch) => {
        try {
            dispatch(orderAllAlbumsRequest());
            const res = await axiosApi.get('/albums');
            dispatch(orderAllAlbumsSuccess(res.data))
        } catch (e) {
            dispatch(orderAllAlbumsRequest());
            dispatch(orderAllAlbumError())
        }
    }
};

export const toolbarPublishAlbums = (id) => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': 'Token ' + token}};
        try {
            await axiosApi.post(`/albums/${id}/publish`, {}, config);
        } catch (e) {
            console.error(e);
        }
    }
};

export const deleteAlbum = (id) => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': 'Token ' + token}};
        try {
            await axiosApi.delete('/albums/' + id, config);
        } catch (e) {
            console.error(e)
        }
    }
};
