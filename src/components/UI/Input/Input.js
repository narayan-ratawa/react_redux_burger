import React from 'react'
import './Input.css'
const Input = (props) =>{
    const inputClasses = ["Input"];
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push("Invalid");
    }

    let inputElement = null;

    switch (props.elementType) {
        case 'input':
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.valule} onChange={props.changed} />
            break;
        case 'textarea':
            inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.valule} onChange={props.changed} />
            break;
        case 'select':
            inputElement = (<select className={"Input"} value={props.valule} onChange={props.changed}>
                {
                    props.elementConfig.options.map(option=><option key={option.value} value={option.value}>{option.displayValue}</option>)
                }
            </select>)
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.valule} onChange={props.changed} />
            break;
    }

    return(
        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElement}
        </div>
    )
}

export default Input;