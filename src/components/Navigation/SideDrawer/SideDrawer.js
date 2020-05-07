import React from 'react'
import './SideDrawer.css'
import Logo from '../../Logo/Logo'
import Aux from '../../../hoc/Auux'
import Backdrop from '../../UI/Backdrop/Backdrop'
import NavigationItems from '../NavigationItems/NavigationItems'

const SideDrawer = (props) =>{
    let attachedClasses = "SideDrawer Close";
    if(props.showSideDrawer){
        attachedClasses = attachedClasses + " Open"
    }
    return(
        <Aux>
            <Backdrop show={props.showSideDrawer}  clicked={()=>props.closed(false)}/>
            <div className="SideDrawer" onClick={()=>props.closed(false)} style={{transform:props.showSideDrawer ? "translateX(0)" : "translateX(-100%)"}}>
            <div style={{height:"11%", marginBottom:"32px"}}>
            <Logo/>
            </div>
            <nav>
                <NavigationItems token={props.token}/>
            </nav>
        </div>
        </Aux>
       
    )
}

export default SideDrawer;