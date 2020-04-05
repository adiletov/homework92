import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Artists from "./Containers/Artists/Artists";
import AddArtist from "./Containers/AddArtist/AddArtist";
import AddAlbum from "./Containers/AddAlbum/AddAlbum";
import AddTrack from "./Containers/AddTrack/AddTrack";
import Login from "./Containers/Login/Login";
import Register from "./Containers/Register/Register";
import Albums from "./Containers/Albums/Albums";
import Tracks from "./Containers/Tracks/Tracks";
import TrackHistory from "./Containers/TrackHistory/TrackHistory";


const ProtectedRoute = ({isAllowed, ...props}) => (
    isAllowed ? <Route {...props} /> : <Redirect to="/login" />
);


const Routes = ({user}) => {
    return (
        <Switch>
            <Route path="/" exact component={Artists}/>

            <ProtectedRoute
                isAllowed={user && user.role === 'user'}
                path="/artists/add"
                exact
                component={AddArtist}
            />
            <ProtectedRoute
                isAllowed={user && user.role === 'user'}
                path="/albums/add"
                exact
                component={AddAlbum}
            />
            <ProtectedRoute
                isAllowed={user && user.role === 'user'}
                path="/tracks/add"
                exact
                component={AddTrack}
            />
            <ProtectedRoute
                isAllowed={user && (user.role === 'user' || user.role === 'admin')}
                path="/track_history"
                exact
                component={TrackHistory}
            />

                <Route path='/albums/:id' exact component={Albums}/>
                <Route path='/tracks/:id' exact component={Tracks}/>
                <Route path='/register' exact component={Register}/>
                <Route path='/login' exact component={Login}/>
        </Switch>
    );
};

export default Routes;