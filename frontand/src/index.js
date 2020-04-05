import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
import {Provider} from 'react-redux';
import reducerArtist from "./Store/Reducers/reducerArtist";
import {createBrowserHistory} from "history";
import {connectRouter, routerMiddleware, ConnectedRouter} from "connected-react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import reducerAlbums from "./Store/Reducers/reducerAlbums";
import reducerTracks from "./Store/Reducers/reducerTracks";
import reducerUser from "./Store/Reducers/reducerUser";
import reducerTrackHistory from "./Store/Reducers/reduceTrackHistory";


const saveToLocalStorage = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (e) {
        console.log('Could not save state');
    }
};

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
};

const history = createBrowserHistory();

const middleware = [
    thunk,
    routerMiddleware(history)
];

const rootReducer = combineReducers({
    router: connectRouter(history),
    artists: reducerArtist,
    albums: reducerAlbums,
    tracks: reducerTracks,
    users: reducerUser,
    trackHistory: reducerTrackHistory
});

const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer, persistedState, applyMiddleware(...middleware));

store.subscribe(() => {
    saveToLocalStorage({
        users: {
            user: store.getState().users.user
        }
    });
});

const app = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
