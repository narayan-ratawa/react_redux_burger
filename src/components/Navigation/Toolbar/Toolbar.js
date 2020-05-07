import React from 'react'
import './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
const Toolbar = (props) => {
    return (
        <header className="Toolbar">
            <DrawerToggle onClick={() => props.sideDrawerHandler(true)} />
            <div style={{ height: "80%" }}>
                <Logo />
            </div>

            <nav className="DesktopOnly">
                <NavigationItems token={props.token}></NavigationItems>
            </nav>
        </header>

    )
}

export default Toolbar;