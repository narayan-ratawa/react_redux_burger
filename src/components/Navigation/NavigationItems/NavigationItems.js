import React from 'react'
import './NavigationItems.css'
import NavigationItem  from './NavigationItem/NavigationItem'
const NavigationItems = (props) => {
    return(
        <ul className="NavigationItems">
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            {props.token ? <NavigationItem link="/orders">Orders</NavigationItem> : null }
            {
                props.token ? <NavigationItem link="/logout">Logout</NavigationItem> :
                <NavigationItem link="/auth">Login</NavigationItem>
            }
        </ul>
    )
}

export default NavigationItems;