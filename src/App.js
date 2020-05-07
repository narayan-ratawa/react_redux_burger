import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Switch, withRouter } from 'react-router-dom'
import styles from './App.module.css';
import * as actions from "../src/store/actions";


import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from '../src/containers/Checkout/Checkout'
import Orders from "./containers/Checkout/Orders/Orders";
import Auth from './containers/Auth/Auth'
import Logout from './containers/Logout/Logout'
import Aux from './hoc/Auux';


class App extends Component {
    state = {
        data: null
    }

    componentDidMount() {
        this.props.onTryAuthSignUp()
    }

    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/orders" component={Orders} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/auth" component={Auth} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/" exact component={BurgerBuilder} />
                </Switch>
            </Layout>
        )
    }
}


const mapStateToProps = (state) => {
    return ({

    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        getCountryData: () => dispatch(() => { }),
        onTryAuthSignUp: () => dispatch(actions.authCheckStatus())

    })
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));