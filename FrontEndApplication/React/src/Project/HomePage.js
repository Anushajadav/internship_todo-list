import React,{Component} from 'react'


import "./HomePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
//import { faBell} from "@fortawesome/free-solid-svg-icons";
//import 'react-calendar/dist/Calendar.css';
 //import moment from 'moment';
//import ListItem from "./ListItem";
 
//import TimePicker from 'react-time-picker';


//var currentDate = moment().format("DD/MM/YYYY");
//var nextDate = moment().add(1,'days').calendar();



class HomePage extends Component{
    constructor(props){
        super(props);
        this.state={
            term: '',
            items: [],
            textDisplay:false,
            message: '',
            message1:'',
            message2:''
         }
    }
    handleClick=()=>{
        this.props.history.push("/account");

    }
    handleClickmoment=()=>{
        this.props.history.push("/changePassword");
    }

    handleClickmoment1=event=>{
        event.preventDefault();
        this.props.history.push("/popup");

    }
    
       
    
    render() {
        
        return(
            <div>
                <form id="to-do-form">
            <div className="ex1" >
                <FontAwesomeIcon  icon={faCheckSquare} />

                <span> HexaToDo  </span>
                <span style={{ float: "right" }}><button onClick={this.handleClickmoment}>CPassword</button></span>&nbsp;
                 <br/>
                <span style={{float:"right"}}><button onClick={this.handleClick}>Account</button></span>
                 </div>
                 
                 <div className="ex2">
                <span> Lets Plan </span>    

                <FontAwesomeIcon icon={faPlusCircle} onClick={this.handleClickmoment1} />
                </div>
                </form>
                </div>

              
                
                

            
            
        );
    }
}

export default HomePage;