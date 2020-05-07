import React,{ Component } from "react";
import Order from "../../../components/Order/Order";
import axios from "../../../Axios-order";
import {connect} from 'react-redux'
import * as orderActionCreator from '../../../store/actions'
import Spinner from "../../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHandler";

class Orders extends Component{

    state={
        orders:[],
        error:null,
        loading:true
    }

    componentDidMount(){
        console.log("miyo"+this.props.token+this.props.userId)
        this.props.fetchOrders(this.props.token,this.props.userId)
        // axios.get("https://burger-7fcc5.firebaseio.com/orders.json")
        // .then(response =>{
        //     console.log(response)
        //     let orders= [];
        //     for(let item in response.data){
        //         orders.push({...response.data[item],
        //             id:item
        //         })
        //     }
        //     this.setState({orders:orders,loading:false,error:null})
        // })
        // .catch(error => this.setState({error:error})
        // )
    }

    render(){
        console.log("data" + this.props.orders)
        let orders = <Spinner />
        if(!this.props.loading){
            
            orders = (this.props.orders.map((order) => <Order key={order.id} data={order} />))
        }
        return orders
    }
}

const mapStateToProps = state => {
    return({
        orders:state.orders.orders,
        loading:state.orders.loading,
        token:state.auth.token,
        userId:state.auth.userId
    })
}

const mapDispatchToProps = dispatch =>{
    return({
        fetchOrders: (token,userId) => dispatch( orderActionCreator.fetchOrders(token,userId))
    })
}

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(Orders,axios));