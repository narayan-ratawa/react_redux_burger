import React from "react";
import "./Order.css";
const Order = (props) => {
    const { data: { price, ingredents } } = props;

    const indrdients = [];
    for (let indrident in ingredents) {
        indrdients.push({
            name: indrident,
            amount: ingredents[indrident]
        })
    }

    const indrdientsOutput = indrdients.map(ig =>
        <span
            style={{
                textTransform: "capitalize",
                display: 'inline-block',
                margin: '8px 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ig.name}>{ig.name} {ig.amount}</span>)

    return (
        <div className="Order">
            <p>Ingredients: {indrdientsOutput}</p>
            <p>Price: <strong>USD {price}</strong></p>
        </div>
    )
}

export default Order;