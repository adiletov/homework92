import React, {Component} from 'react';
import './App.css';
import Header from "./Containers/Header/Header";

import {connect} from "react-redux";
import {logoutUser} from "./Store/Actions/actionUser";
import Routers from "./Routers";

class App extends Component {
    render() {
        return (
            <div>
                <Header user={this.props.user} logout={this.props.logoutUser}/>
                <div className="container">
                   <Routers user={this.props.user}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user
});
const mapDispatchToProps = dispatch => ({
    logoutUser: ()=>dispatch(logoutUser())
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
