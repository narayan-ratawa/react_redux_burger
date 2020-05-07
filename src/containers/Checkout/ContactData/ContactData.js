import React, {Component} from 'react'
import {connect} from 'react-redux'
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input"
import axios from '../../../Axios-order'
import WithErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler'
import Spinner from "../../../components/UI/Spinner/Spinner";
import * as orderActionCreator from '../../../store/actions'
import  "./ContactData.css";

class ContactData extends Component{
    state={
        orderForm:{

            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            zip:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your ZIP'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your E-Mail'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            mode:{
                elementType:'select',
                elementConfig:{
                   options:[
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'cheapest', displayValue:'Cheapest'}
                   ]
                },
                validation:{},
                value:'fastest',
                valid:true,
                touched:false
            }
        },
        formIsValid:false
    }

    checkValidity = (value,rules)=>{
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== ''
        }
        if(rules.minLength && isValid){
            isValid = value.length >= rules.minLength
        }
        if(rules.maxLength && isValid){
            isValid = value.length <= rules.maxLength
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    orderHandler = (event) =>{
        event.preventDefault();
        const formData = {}
        for(let formElementID in this.state.orderForm){
            formData[formElementID] = this.state.orderForm[formElementID].value;
        }
        const order = {
            ingredents:this.props.ings,
            price:this.props.totalPrice,
            orderData:formData,
            userId:this.props.userId
        }
        this.props.purchaseOrder(order,this.props.token)
    }

    inputChangedHandler = (event,key) =>{
        const updateOrderForm = {
            ...this.state.orderForm
        }    
        const updatedField = {
            ...updateOrderForm[key]
        }
        updatedField.value = event.target.value;
        updatedField.valid = this.checkValidity(updatedField.value,updatedField.validation)

        updatedField.touched =true;
        updateOrderForm[key] = updatedField;
        //checking form validation
        let formIsValid = true;
        for(let inputIdentifier in updateOrderForm){
            formIsValid = updateOrderForm[inputIdentifier].valid && formIsValid
        }
         
        this.setState({
            orderForm:updateOrderForm,
            formIsValid:formIsValid
        })

    }

    render(){
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }

        let form = (
            <form>
                {
                    formElementsArray.map(element=> <Input key={element.id} 
                        elementType={element.config.elementType}
                        elementConfig={element.config.elementConfig} 
                        value={element.config.value} 
                        invalid={!element.config.valid}
                        shouldValidate={element.config.validation}
                        touched={element.config.touched}
                        changed={(event)=>this.inputChangedHandler(event,element.id)} />)
                }
                    <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER</Button>
                </form>
        );

        if(this.props.loading){
            form = <Spinner />
        }




        return(
            <div className="ContactData" >
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return ({
        ings: state.burgerBuilder.ingredients,
        totalPrice:state.burgerBuilder.totalPrice,
        loading:state.orders.loading,
        token:state.auth.token,
        userId:state.auth.userId
    })
}

const mapDispatchToProps = dispatch => {
    return ({
        purchaseOrder: (orderData,token) => dispatch(orderActionCreator.purchaseOrder(orderData,token))
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(ContactData,axios));