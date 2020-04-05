import {
    ADD_ALBUM_SUCCESS,
    ADD_ARTIST_ERROR, ADD_ARTIST_REQUEST,
    ORDER_ARTISTS_ERROR,
    ORDER_ARTISTS_REQUEST,
    ORDER_ARTISTS_SUCCESS,
} from "../Actions/Actionstype";

const initialState = {
    artists: null,
    preloader: '',
    error: null,
    addError: null,
    addLoad: false
};

const reducerArtist = (state = initialState, action)=>{
    switch (action.type) {
        case ORDER_ARTISTS_SUCCESS:
            return {...state, artists: action.artists, preloader: false };
        case ORDER_ARTISTS_REQUEST:
            return {...state, preloader: true};
        case ORDER_ARTISTS_ERROR:
            return {...state, error: action.error, preloader: false};
        case ADD_ALBUM_SUCCESS:
            return {...state, addError: null, addLoad: false};
        case ADD_ARTIST_ERROR:
            return {...state, addError: action.error, addLoad: false};
        case ADD_ARTIST_REQUEST:
            return {...state, addLoad: true};
        default:
            return state
    }
};

export default reducerArtist;