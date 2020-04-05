import {
    ORDER_ALBUMS_ERROR,
    ORDER_ALBUMS_SUCCESS,
    ORDER_ARTIST,
    ORDER_ALBUMS_REQUEST,
    ADD_ALBUM_ERROR, ADD_ALBUM_REQUEST, ADD_ALBUM_SUCCESS, ORDER_ALL_ALBUMS_SUCCESS
} from "../Actions/Actionstype";

const initialState = {
    allAlbums: [],
    albums: [],
    artist: {},
    preloader: null,
    error: null,
    addError: null,
    addLoad: false,
};

const reducerAlbums = (state=initialState, action)=>{
    switch (action.type) {
        case ORDER_ALBUMS_SUCCESS:
            return {...state, albums: action.albums, preloader: false};
        case ORDER_ALBUMS_REQUEST:
            return {...state, preloader: true};
        case ORDER_ALBUMS_ERROR:
            return {...state, error: action.error , preloader: false};
        case ORDER_ARTIST:
            return {...state, artist: action.artist};
        case ADD_ALBUM_SUCCESS:
            return {...state, addLoad: false, addError: null};
        case ADD_ALBUM_ERROR:
            return {...state, addError: action.error, addLoad: false};
        case ADD_ALBUM_REQUEST:
            return {...state, addLoad: true};
        case ORDER_ALL_ALBUMS_SUCCESS:
            return {...state, allAlbums: action.albums};
        default:
            return state
    }
};

export default reducerAlbums;
