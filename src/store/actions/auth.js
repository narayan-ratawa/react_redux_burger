import * as actionTypes from "../actions/actionTypes";
import axios from "axios";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idtToken: authData.idToken,
        userId: authData.localId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expireTime');
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000);
    }
}

export const auth = (email, password, isSignUp) => {

    return dispatch => {
        dispatch(authStart())
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDI2grxJDxyVvtP373o7Hm7-2XhZ9yWe3A";
        if (isSignUp) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDI2grxJDxyVvtP373o7Hm7-2XhZ9yWe3A";
        }
        axios.post(url, authData)
            .then(response => {
                const expTime = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('expireTime', expTime)
                localStorage.setItem('userId', response.data.localId)

                dispatch(authSuccess(response.data))
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(error => dispatch(authFail(error.response.data.error)))
    }

}

export const setAuthRedirectionPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckStatus = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        } else {
            const expTime = new Date(localStorage.getItem('expireTime'))
            if (expTime < new Date()) {
                dispatch(logout())
            } else {
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess({idToken:token, localId:userId}))
                dispatch(checkAuthTimeout((expTime.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}