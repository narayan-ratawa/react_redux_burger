import * as actionType from './actionTypes'
import axios from '../../Axios-order'

export const addIngrident = name => {
    return {
        type: actionType.ADD_INGRIDENT,
        ingredientName: name
    }
}

export const removeIngrident = name => {
    return {
        type: actionType.REMOVE_INGRIDENT,
        ingredientName: name
    }
}

export const setIngrident = (ingridents) => {
    return {
        type: actionType.SET_INGRIDENT,
        ingridents: ingridents
    }
}

export const initIngridents = () => {
    return ((dispatch, getState) => {
        axios.get("https://burger-7fcc5.firebaseio.com/ingredients.json")
            .then(response => {
                dispatch(setIngrident(response.data))
            })
            .catch(error => {
                dispatch({
                    type: actionType.FETCH_ING_FAILED
                })
            }
            )
    })
}