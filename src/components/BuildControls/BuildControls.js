import React from 'react';
import BuildControl from './BuildControl/BuildControl'
import './BuildControls.css'
const BuildControls = (props) => {
    const controls = [
        {label:"Salad", type:'salad'},
        {label:"Cheese", type:'cheese'},
        {label:"Meat", type:'meat'},
        {label:"Bacon", type:'bacon'}
    ]
    return (
        <div className="BuildControls">
            <div>Total Price: <strong>{props.price.toFixed(2    )}</strong></div>
            {
                controls.map(item=>
                <BuildControl 
                key={item.label} 
                label={item.label} 
                added = {()=> props.added(item.type)}
                removed = {()=>props.removed(item.type)}
                disabled={props.disable[item.type]}
                />)
            }
            <button className="OrderButton" disabled={!props.purchasable} onClick={()=>{props.handleModalVisible(true)}}>{props.token ? 'ORDER NOW' : 'SIGNUP TO ORDER'}</button>
        </div>
    )
}

export default BuildControls;