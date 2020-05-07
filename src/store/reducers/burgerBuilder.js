import * as actionTypes from '../actions/actionTypes'
import { updatedState } from "../util";

const initState = {
    ingredients: null,
    error: false,
    totalPrice: 4,
    building:false
}

const INGREDENTS_PRICE = {
    salad: 0.5, cheese: 0.5, meat: 0.3, bacon: 0.2
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGRIDENT:
            const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
            const updatedIngredients = updatedState(state.ingredients, updatedIngredient)
            const updatedStateData = updatedState(state, {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDENTS_PRICE[action.ingredientName],
                error: false,
                building:true
            })
            return updatedStateData
        case actionTypes.REMOVE_INGRIDENT:
            const updatedIngredientIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
            const updatedIngredientsIng = updatedState(state.ingredients, updatedIngredientIng)
            const updatedStateDataIng = updatedState(state, {
                ingredients: updatedIngredientsIng,
                totalPrice: state.totalPrice - INGREDENTS_PRICE[action.ingredientName],
                error: false,
                building:true
            })
            return updatedStateDataIng
        case actionTypes.FETCH_ING_FAILED:
            const updatedStateIngFail = updatedState(state, {
                ingredients: null,
                error: true
            })
            return updatedStateIngFail
        case actionTypes.SET_INGRIDENT:
            const updatedStateSetIng = updatedState(state, {
                ingredients: action.ingridents,
                totalPrice: 4,
                building:false
            })
            return updatedStateSetIng
        default:
            return state;
    }
}

export default reducer;