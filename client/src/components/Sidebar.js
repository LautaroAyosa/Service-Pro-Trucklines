import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link, NavLink as RouterNavLink } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, UncontrolledDropdown } from 'reactstrap';


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);

    const {
        user,
        isAuthenticated,
        loginWithRedirect,
        logout,
    } = useAuth0();

    const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

    const menuItem=[
        {
            path:"/dashboard/",
            name:"Dashboard",
            icon:<i className="fa-solid fa-chart-line"></i>
        },
        {
            path:"/dashboard/table",
            name:"Tables",
            icon:<i className="fa-solid fa-table-list"></i>
        },
        {
            path:"/dashboard/forms",
            name:"Forms",
            icon:<i className="fa-brands fa-wpforms"></i>
        },
    ]
    return (
        <div className="" style={{display: 'flex'}}>
            <div style={{width: isOpen ? "250px" : "50px"}} className="sidebar d-flex flex-column justify-content-between">
                <div>
                    <div className="top_section">
                        <h5 style={{display: isOpen ? "block" : "none"}}>SPT</h5>
                        <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                                <i className="fa-solid fa-bars" onClick={toggle}/>
                        </div>
                    </div>
                    {
                        menuItem.map((item, index)=>(
                            <RouterNavLink to={item.path} key={index} className="link" activeclassName="active">
                                <div className="icon">{item.icon}</div>
                                <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                            </RouterNavLink>
                        ))
                    }
                </div>
                <div className='d-flex'>

                    <UncontrolledDropdown inNavbar className='d-flex p-3'>
                        <DropdownToggle nav caret id="profileDropDown" className='d-flex justify-content-between align-items-center' style={{width: "100%"}}>
                            <img
                            src={user.picture}
                            alt="Profile"
                            className="nav-user-profile rounded-circle"
                            width="35"
                            height="35"
                            />
                            <h5 style={{display: isOpen ? "block" : "none"}}>{user.name}</h5>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem
                            tag={RouterNavLink}
                            to="/"
                            className="dropdown-profile"
                            activeClassName="router-link-exact-active"
                            >
                            <i className="fa-solid fa-house"></i> Home
                            </DropdownItem>
                            <DropdownItem
                            id="qsLogoutBtn"
                            onClick={() => logoutWithRedirect()}
                            >
                            <FontAwesomeIcon icon="power-off" className="mr-3" /> Log
                            out
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            </div>
            <main className="container py-5">{children}</main>
        </div>
    );
};

export default Sidebar;