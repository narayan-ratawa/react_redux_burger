import React from 'react'
import './DrawerToggle.css'

const DrawerToggle = (props) => {
    return(
        <div className="DrawerToggle" onClick={props.onClick}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default DrawerToggle;