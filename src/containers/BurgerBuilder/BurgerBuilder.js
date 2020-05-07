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
        // axios.get("https://burger-7fcc5.firebaseio.com/ingredients.json")
        // .then(response =>{
        //     console.log(response)
        //     this.setState({ingredents:response.data})
        // })
        // .catch(error => this.setState({error:error})
        // )
        this.props.onPurchaseInit()
        this.props.getInfridents()
    }

    // addIngredentHandle = type => {
    //     const oldCount = this.state.ingredents[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredents = {
    //         ...this.state.ingredents
    //     }
    //     updatedIngredents[type] = updatedCount;
    //     const additionPrice = INGREDENTS_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + additionPrice;
    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredents: updatedIngredents
    //     })
    // }

    // removeIngredentHandle = type => {
    //     const oldCount = this.state.ingredents[type];
    //     if (oldCount) {
    //         const updatedCount = oldCount - 1;
    //         const updatedIngredents = {
    //             ...this.state.ingredents
    //         }
    //         updatedIngredents[type] = updatedCount;
    //         const dedictionPrice = INGREDENTS_PRICE[type];
    //         const oldPrice = this.state.totalPrice;
    //         const newPrice = oldPrice - dedictionPrice;
    //         this.setState({
    //             totalPrice: newPrice,
    //             ingredents: updatedIngredents
    //         })
    //     }

    // }

    handleModalVisible = (visible) => {
        if(this.props.token){
            this.setState({ purchasing: visible })
        }else{
            this.props.onSetAuthRedirectionPath('/checkout')
            this.props.history.push('/auth')
        }
    }

    handleSuccessOrder = () => {

        // const queryParams = [];
        // for (let i in this.state.ingredents) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredents[i]))
        // }
        // queryParams.push("price=" + this.props.totalPrice)
        // const queryString = queryParams.join('&')

        this.props.history.push({
            pathname: '/checkout',
            // search: '?' + queryString
        })
    }




    render() {
        console.log(this.props.ings)
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