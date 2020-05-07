import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Switch, withRouter,Redirect } from 'react-router-dom'
import * as actions from "../src/store/actions";
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from '../src/containers/Checkout/Checkout'
import Orders from "./containers/Checkout/Orders/Orders";
import Auth from './containers/Auth/Auth'
import Logout from './containers/Logout/Logout'
import asyncComponent from './hoc/AsyncComponent/AsyncComponent'

const asyncCheckout = asyncComponent(()=>{
    return import("../src/containers/Checkout/Checkout")
})

const asyncOrder = asyncComponent(()=>{
    return import("./containers/Checkout/Orders/Orders")
})

const asyncAuth = asyncComponent(()=>{
    return import("./containers/Auth/Auth")
})

class App extends Component {
    state = {
        data: null
    }

    componentDidMount() {
        this.props.onTryAuthSignUp()
    }

    render() {
        let routePath = (<Switch>
            <Route path="/auth" component={asyncAuth} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/"/>
        </Switch>)
        if(this.props.token){
            routePath = (<Switch>
                <Route path="/orders" component={asyncOrder} />
                <Route path="/checkout" component={asyncCheckout} />
                <Route path="/auth" component={asyncAuth} />
                <Route path="/logout" component={Logout} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/"/>
            </Switch>)
        }
        return (
            <Layout>
                {routePath}
            </Layout>
        )
    }
}


const mapStateToProps = (state) => {
    return ({
        token:state.auth.token
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        getCountryData: () => dispatch(() => { }),
        onTryAuthSignUp: () => dispatch(actions.authCheckStatus())

    })
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));