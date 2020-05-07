import * as actionTypes from "../actions/actionTypes";

const initState = {
    loading: false,
    token: null,
    userId: null,
    error: null,
    authRedirectPath: '/'
}

const reducer = (state = initState, action) => {
    console.log(action)
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
                error: null
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                userId: action.userId,
                token: action.idtToken
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error.message
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                error: null,
                userId: null,
                loading: false
            }
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return {
                ...state,
                authRedirectPath: action.path
            }

        default:
            return state;
    }

}

export default reducer;