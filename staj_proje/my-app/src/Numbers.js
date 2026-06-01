import React,{Component} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Placeholder from 'react-bootstrap/Placeholder';
import Numbers from './Numbers';

class Numbers extends Component{
    render(){
        const customButtonStyle = {
            width: '50px',
            height: '50px'
          };
       return(

        <>
        <form>
            <Button aria-label={this.props.spacenum} variant="secondary" style={customButtonStyle} >{this.props.space}</Button>{' '}
            
        </form>
        </>
        
    );
    }
}
export default Numbers;











