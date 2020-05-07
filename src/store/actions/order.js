import * as actionTypes from '../actions/actionTypes';
import axios from '../../Axios-order'

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = error => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseOrder = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post("/orders.json?auth=" + token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => dispatch(purchaseBurgerFail()))
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderSuccess = (orders) => {
    return ({
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    })
}

export const fetchOrderFail = () => {
    return ({
        type: actionTypes.FETCH_ORDER_FAIL,
    })
}

export const fetchOrderStart = () => {
    return ({
        type: actionTypes.FETCH_ORDER_START
    })
}

export const fetchOrders = (token,userId) => {
    return dispatch => {
        dispatch(fetchOrderStart())
        console.log("hmm"+token+userId)
        const queryParam = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId +'"'
        axios.get("/orders.json" + queryParam)
            .then(response => {

                let orders = [];
                for (let item in response.data) {
                    orders.push({
                        ...response.data[item],
                        id: item
                    })
                }
                dispatch(fetchOrderSuccess(orders))
            })
            .catch(error => dispatch(fetchOrderFail())
            )
    }
}