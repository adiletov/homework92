import axiosApi from "../../axiosApi";
import {
    ADD_ARTIST_ERROR,
    ADD_ARTIST_REQUEST,
    ADD_ARTIST_SUCCESS,
    ORDER_ARTISTS_ERROR,
    ORDER_ARTISTS_REQUEST,
    ORDER_ARTISTS_SUCCESS
} from "./Actionstype";

import {push} from 'connected-react-router';


export const orderArtistsSuccess = (artists) => ({type: ORDER_ARTISTS_SUCCESS, artists});
export const orderArtistsError = (error) => ({type: ORDER_ARTISTS_ERROR, error});
export const orderArtistsRequest = () => ({type: ORDER_ARTISTS_REQUEST});

export const addArtistSuccess = () => ({type: ADD_ARTIST_SUCCESS});
export const addArtistRequest = () => ({type: ADD_ARTIST_REQUEST});
export const addArtistError = (error) => ({type: ADD_ARTIST_ERROR, error});

export const orderArtist = () => {
    return async (dispatch) => {
        try {
            dispatch(orderArtistsRequest());
            const res = await axiosApi.get('/artists');
            dispatch(orderArtistsSuccess(res.data));
        } catch (e) {
            dispatch(orderArtistsError(e))
        }
    }
};

export const addArtistData = (artist) => {
    return async (dispatch) => {
        try {
            dispatch(addArtistRequest());
            await axiosApi.post('/artists', artist);
            dispatch(addArtistSuccess());
            dispatch(push('/'))
        } catch (e) {
            dispatch(addArtistRequest());
            dispatch(addArtistError(e.response.data))
        }
    }
};

export const toolbarPublishArtist = (id) => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = { headers: {'Authorization': 'Token ' + token}};
        try {
            await axiosApi.post(`/artists/${id}/publish`,{}, config);
            dispatch(orderArtist())
        } catch (e) {
            console.error(e);
        }
    }
};

export const deleteArtist = id => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = { headers: {'Authorization': 'Token ' + token}};
        try {
            await axiosApi.delete('/artists/' + id, config);
            dispatch(orderArtist())
        } catch (e) {
            console.error(e)
        }

    }
};





