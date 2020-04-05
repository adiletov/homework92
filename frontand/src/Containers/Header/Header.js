import React from 'react';
import {Nav, Navbar, NavbarBrand, NavItem, NavLink} from "reactstrap";
import {NavLink as RouterNavLink} from 'react-router-dom';
import UserMenu from "./UserMenu/UserMenu";
import {apiUrl} from "../../apiUrl";

const Header = ({user, logout}) => {
    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand>MusikOffline</NavbarBrand>
            <Nav className="mr-auto" navbar>
                <NavItem>
                    <NavLink tag={RouterNavLink} to="/">Playlist</NavLink>
                </NavItem>
                {user ?
                    user.role === 'admin' ?
                    <>
                        <NavItem className="mr-4">
                            <span className="mr-2 ">Hello, {user.fullName}</span>
                            {user.image && <img style={avatar} src={apiUrl + '/uploads/'+ user.image} alt={user.fullName} className="avatar-image"/>
                            }
                        </NavItem>
                        <NavItem>
                            <NavLink tag={RouterNavLink} to="/track_history">Track history</NavLink>
                        </NavItem>
                            <button onClick={logout}>Logout</button>
                    </> :
                        <UserMenu
                        user={user}
                        logout={logout}
                        />
                    : <>
                        <NavItem>
                            <NavLink tag={RouterNavLink} to="/register">Sign up</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={RouterNavLink} to="/login">Sign in</NavLink>
                        </NavItem>
                    </>
                }
            </Nav>
        </Navbar>
    );
};
const avatar = {
    width: '50px',
    borderRadius: '50%'
};
export default Header;

