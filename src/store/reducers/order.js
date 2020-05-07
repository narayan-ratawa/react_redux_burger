import * as actionType from '../actions/actionTypes'
const initState = {
    orders: [],
    loading: false,
    error: false,
    purchased: false
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        case actionType.PURCHASE_BURGER_SUCCESS:
            return {
                ...state,
                orders: state.orders.concat({
                    ...action.orderData,
                    id: action.orderId
                }),
                loading: false,
                error: false,
                purchased: true
            }
        case actionType.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false,
                error: true
            }
        case actionType.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true,
                error: false
            }
        case actionType.FETCH_ORDER_START:
            return {
                ...state,
                loading: true,
            }
        case actionType.FETCH_ORDER_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false,
                error: false
            }
        case actionType.FETCH_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: true
            }

        default:
            return state;
    }

}

export default reducer;