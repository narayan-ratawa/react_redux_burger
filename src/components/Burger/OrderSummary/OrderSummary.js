import React from 'react'
import Aux from '../../../hoc/Auux'
import Button from '../../UI/Button/Button'
import './OrderSummary.css'

const OrderSummary =(props)=>{
    const ingredientsSummary = Object.keys(props.ingredents)
    .map(igKey=>{
    return <li key={igKey}><span style={{textTransform:"capitalize"}}>{igKey}</span>: {props.ingredents[igKey]}</li>
    })
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
            {ingredientsSummary}
            </ul>totalPrice
    <p>Total Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType={"Danger"} clicked={()=>{props.handleModalVisible(false)}}>CANCEL</Button>
            <Button  btnType={"Success"} clicked={()=>{props.handleSuccessOrder()   }}>CONTINUE</Button>
        </Aux>
    )
}

export default OrderSummary;