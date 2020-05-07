import React, { Component } from 'react';
import { connect } from 'react-redux'
import Aux from '../../hoc/Auux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../Axios-order'
import Spinner from '../../components/UI/Spinner/Spinner'
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'

import * as BurgerBuilderActions from '../../store/actions'

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount() {
        this.props.onPurchaseInit()
        this.props.getInfridents()
    }


    handleModalVisible = (visible) => {
        if(this.props.token){
            this.setState({ purchasing: visible })
        }else{
            this.props.onSetAuthRedirectionPath('/checkout')
            this.props.history.push('/auth')
        }
    }

    handleSuccessOrder = () => {

        this.props.history.push({
            pathname: '/checkout',
            // search: '?' + queryString
        })
    }




    render() {
        const disableInfo = {
            ...this.props.ings
        }
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] === 0
        }

        let orderSummary = <Spinner />


        let burger = this.props.error ? <p>Error while fetching ingredients</p> : <Spinner />
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredents={this.props.ings} />
                    <BuildControls
                        added={this.props.onIngridentAdded}
                        removed={this.props.onIngridenRemoved}
                        disable={disableInfo}
                        price={this.props.totalPrice}
                        purchasable={this.props.totalPrice > 4}
                        handleModalVisible={this.handleModalVisible}
                        token={this.props.token}
                    />
                </Aux>
            )
            orderSummary = <OrderSummary
                totalPrice={this.props.totalPrice}
                ingredents={this.props.ings}
                handleModalVisible={this.handleModalVisible}
                handleSuccessOrder={this.handleSuccessOrder}
            />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} handleModalVisible={this.handleModalVisible}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }

}

const mapStateToProps = state => {
    return ({
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        token:state.auth.token
    })
}

const mapDispatchToProps = dispatch => {
    return ({
        onIngridentAdded: (ingredientName) => dispatch(BurgerBuilderActions.addIngrident(ingredientName)),
        onIngridenRemoved: (ingredientName) => dispatch(BurgerBuilderActions.removeIngrident(ingredientName)),
        getInfridents: () => dispatch(BurgerBuilderActions.initIngridents()),
        onPurchaseInit: () => dispatch(BurgerBuilderActions.purchaseInit()),
        onSetAuthRedirectionPath: (path) => dispatch(BurgerBuilderActions.setAuthRedirectionPath(path))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));