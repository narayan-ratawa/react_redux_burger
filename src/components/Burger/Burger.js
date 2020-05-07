import React from 'react';
import './Burger.css'
import BurgerIngredent from './BurgerIngredent/BurgerIngredent';
const Burger = (props) => {

    let transformIngredents = Object.keys( props.ingredents )
        .map( igKey => {
            return [...Array( props.ingredents[igKey] )].map( ( _, i ) => {
                return <BurgerIngredent key={igKey + i} type={igKey} />;
            } );
        } )
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);

    if(transformIngredents.length === 0){
        transformIngredents = <div>Please start adding ingredents</div>
    }

    return (
        <div className={"Burger"}>
            <BurgerIngredent type="bread-top" />
            {transformIngredents}
            <BurgerIngredent type="bread-bottom" />
        </div>
    )
}

export default Burger;