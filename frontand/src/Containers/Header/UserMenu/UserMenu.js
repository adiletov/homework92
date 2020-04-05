import React from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, UncontrolledDropdown} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";
import {apiUrl} from "../../../apiUrl";

const UserMenu = ({user, logout}) => {
    return (
        <Nav>
            <NavItem className="mr-4">
                <span className="mr-2 ">Hello, {user.fullName}</span>
                {user.image ?
                    user.facebookId
                        ? <img style={avatar} src={user.image} alt={user.fullName} className="avatar-image"/>
                        : <img style={avatar} src={apiUrl + '/uploads/' + user.image} alt={user.fullName}/>
                    : null
                }
            </NavItem>
            <NavItem>
                <UncontrolledDropdown>
                    <DropdownToggle nav caret>
                        Add new
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem tag={RouterNavLink} to="/artists/add">
                            Artist
                        </DropdownItem>
                        <DropdownItem tag={RouterNavLink} to="/albums/add">
                            Album
                        </DropdownItem>
                        <DropdownItem tag={RouterNavLink} to="/tracks/add">
                            Track
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </NavItem>
            <NavItem>
                <NavLink tag={RouterNavLink} to="/track_history">Track history</NavLink>
            </NavItem>
            <NavItem>
                <span className="nav-link" onClick={logout}>Logout</span>
            </NavItem>
        </Nav>
    );
};

const avatar = {
    width: '50px',
    borderRadius: '50%'
};

export default UserMenu;