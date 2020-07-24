import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "./mystyle.css";

class List extends Component {
   handleOnclick=()=>{
       this.props.history.push("/shoppinglist");
   }
    handleOntravelclick = () => {
        this.props.history.push("/travellist");
    }
    handleOnscienceclick = () => {
        this.props.history.push("/slist");
    }


    render() {
        return (
            
            <div>
                <div className="mine">
                    <h1>List Page</h1>
                    <div className="opp"><h4>Welcome User!</h4></div>
                    <div className="people">
                        <small>
                            <Link to="/account"> AccountsPage </Link>
                        </small>
                    </div>
                    <div className="people">
                        <small>
                            <Link to="/changepassword"> Change Password </Link>
                        </small>
                    </div>
                </div>
                <div>
                    <button className="block" onClick={this.handleOnclick} >Shopping list</button>
                     <button className="block1" onClick={this.handleOntravelclick} >Travel</button>
                    <button  className="block2"onClick={this.handleOnscienceclick} >Science and Technology</button>
                </div>
            </div>
        
            

        );
    }

}
export default List;