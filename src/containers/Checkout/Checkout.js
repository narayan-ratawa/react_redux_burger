import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from "../Checkout/ContactData/ContactData";

class Checkout extends Component {

    checkoutCancelHandler = () => {
        this.props.history.goBack()
    }

    checkoutCountinueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        let summary = <Redirect to="/" />
        if (this.props.ings) {

            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary = <div>{purchasedRedirect}<CheckoutSummary ingredents={this.props.ings}
                checkoutCountinued={this.checkoutCountinueHandler}
                checkoutCancelled={this.checkoutCancelHandler} />
                <Route path={'/checkout/contact-data'} component={ContactData} />
            </div>
        }
        return summary

    }
}

const mapStateToProps = state => {
    return ({
        ings: state.burgerBuilder.ingredients,
        purchased: state.orders.purchased
    })
}


export default connect(mapStateToProps)(Checkout);