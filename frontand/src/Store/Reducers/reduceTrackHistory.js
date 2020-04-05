import {
    ORDER_TRACK_HISTORY_ERROR,
    ORDER_TRACK_HISTORY_REQUEST,
    ORDER_TRACK_HISTORY_SUCCESS,
} from "../Actions/Actionstype";

const initialState = {
    tracks: [],
    error: null,
    loading: false
};

const reducerTrackHistory = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_TRACK_HISTORY_SUCCESS:
            return {...state, tracks: action.tracks, loading: false};
        case ORDER_TRACK_HISTORY_REQUEST:
            return {...state, loading: true};
        case ORDER_TRACK_HISTORY_ERROR:
            return {...state, error: action.error, loading: false};
        default:
            return state
    }
};


export default reducerTrackHistory;