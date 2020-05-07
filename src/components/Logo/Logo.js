import React from 'react'
import './Logo.css'
import logo from '../../assets/images/logo.png'

const Logo = (props) =>{
    return(
        <div className="Logo">
            <img src={logo} alt="logo"></img>
        </div>
    )
}

export default Logo;