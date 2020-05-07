import React,{Component} from 'react'
import Aux from '../../../hoc/Auux'
import BackDrop from '../Backdrop/Backdrop'
import './Modal.css'


class Modal extends Component{
    shouldComponentUpdate(nextProps,nextState){
        return (nextProps.show !== this.props.show || nextProps.children !==this.props.children)
    }
    render(){
        return(
            <Aux>
                <BackDrop show={this.props.show} clicked={ this.props.handleModalVisible}/>
                <div style={{
                transform:this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity:this.props.show ? '1':'0'
            }} className="Modal">
                {this.props.children}
            </div>
              
     
            </Aux>
           
    
        )
    }
}

export default Modal;