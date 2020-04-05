import {ORDER_ALBUM, ORDER_TRACKS_ERROR, ORDER_TRACKS_REQUEST, ORDER_TRACKS_SUCCESS} from "../Actions/Actionstype";

const initialState ={
    tracks: [],
    album: {},
    preloader: null,
    error: null
};

const reducerTracks = (state = initialState, action) =>{
  switch (action.type) {
      case ORDER_TRACKS_SUCCESS:
          return {...state, tracks: action.tracks, preloader: false};
      case ORDER_TRACKS_REQUEST:
          return {...state, preloader: false};
      case ORDER_TRACKS_ERROR:
          return {...state, error: action.error, preloader: false};
      case ORDER_ALBUM:
          return {...state, album: action.album};
      default:
          return state
  }
};

export default reducerTracks;