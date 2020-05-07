import React from 'react'
import './BurgerIngredent.css'
import PropTypes from 'prop-types';

class BurgerIngredent extends React.Component {
    render() {
        let ingredernt = null;
        switch (this.props.type) {
            case 'bread-bottom':
                ingredernt = <div className="BreadBottom" />
                break;
            case 'bread-top':
                ingredernt = <div className="BreadTop">
                    <div className="Seeds1"></div>
                    <div className="Seeds2"></div>
                </div>
                break;
            case 'meat':
                ingredernt = <div className={"Meat"} />
                break;
            case 'bacon':
                ingredernt = <div className={"Bacon"} />
                break;
            case 'salad':
                ingredernt = <div className={"Salad"} />
                break;
            case 'cheese':
                ingredernt = <div className={"Cheese"} />
                break;
            default:
                ingredernt = null;
                break;
        }
        return ingredernt;
    }

}
BurgerIngredent.propTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerIngredent;