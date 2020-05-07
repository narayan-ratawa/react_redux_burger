import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import './CheckoutSummary.css'
const CheckoutSummary = (props) =>{
    return(
        <div className="CheckoutSummary">
            <h1>Hope it taste well!!!</h1>
            <div style={{width:'100%',margin:'auto'}}>
                <Burger ingredents={props.ingredents} />
            </div>
            <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.checkoutCountinued}>COUNTINUE</Button>
        </div>
    )
}

export default CheckoutSummary;