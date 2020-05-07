import React, { Component } from 'react';
import { connect } from 'react-redux'
import Aux from '../../hoc/Auux.js'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import './Layout.css'

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerHandler = (visible) => {
        this.setState({ showSideDrawer: visible })
    }

    render() {
        return (
            <Aux>
                <Toolbar sideDrawerHandler={this.sideDrawerHandler} token={this.props.token} />
                <SideDrawer showSideDrawer={this.state.showSideDrawer} closed={this.sideDrawerHandler} token={this.props.token} />
                <main className="Content">
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
}
export default connect(mapStateToProps)(Layout);
