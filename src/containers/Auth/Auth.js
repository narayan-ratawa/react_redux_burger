import React, { Component } from 'react'
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import { checkValidity } from '../../store/util'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import * as authActionCreator from "../../store/actions";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../Axios-order"
import './Auth.css'


class Auth extends Component {
    state = {
        authForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 7
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false,
        isSignUp: true
    }

    inputChangedHandler = (event, key) => {
        const updateOrderForm = {
            ...this.state.authForm
        }
        const updatedField = {
            ...updateOrderForm[key]
        }
        updatedField.value = event.target.value;
        updatedField.valid = checkValidity(updatedField.value, updatedField.validation)

        updatedField.touched = true;
        updateOrderForm[key] = updatedField;
        //checking form validation
        let formIsValid = true;
        for (let inputIdentifier in updateOrderForm) {
            formIsValid = updateOrderForm[inputIdentifier].valid && formIsValid
        }
        this.setState({
            authForm: updateOrderForm,
            formIsValid: formIsValid
        })
    }

    authHandler = (event) => {
        event.preventDefault();
        const email = this.state.authForm['email'].value
        const password = this.state.authForm['password'].value
        this.props.onAuth(email, password, this.state.isSignUp);
    }

    switchSignup = (event) => {
        event.preventDefault();

        this.setState({ isSignUp: !this.state.isSignUp })
    }

    componentDidMount() {
        if (!
            this.props.buildingBurger &&
            this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath()
        }

    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.authForm) {
            formElementsArray.push({
                id: key,
                config: this.state.authForm[key]
            })
        }
        let errMessage = null;
        if (this.props.error) {
            errMessage = <p>{this.props.error}</p>
        }
        let redirectToHome = null;
        if (this.props.token) {
            redirectToHome = <Redirect to={this.props.authRedirectPath} />
        }
        return (
            <div className="Auth">
                {redirectToHome}
                {errMessage}
                {
                    this.props.loading ? <Spinner /> : <form>
                        {
                            formElementsArray.map(element => <Input key={element.id}
                                elementType={element.config.elementType}
                                elementConfig={element.config.elementConfig}
                                value={element.config.value}
                                invalid={!element.config.valid}
                                shouldValidate={element.config.validation}
                                touched={element.config.touched}
                                changed={(event) => this.inputChangedHandler(event, element.id)} />)
                        }
                        <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.authHandler}>{this.state.isSignUp ? 'SIGNUP' : 'LOGIN'}</Button>
                        <Button btnType="Danger" clicked={this.switchSignup}>SWITCH TO {this.state.isSignUp ? 'LOGIN' : 'SIGNUP'}</Button>
                    </form>

                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return ({
        loading: state.auth.loading,
        auth: state.auth.auth,
        error: state.auth.error,
        token: state.auth.token,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    })
}

const mapDispatchToProps = dispatch => {
    return ({
        onAuth: (email, password, isSignUp) => dispatch(authActionCreator.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(authActionCreator.setAuthRedirectionPath('/'))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Auth, axios));