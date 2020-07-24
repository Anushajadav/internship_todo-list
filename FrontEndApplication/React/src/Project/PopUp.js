import React,{Component} from "react";
import"./HomePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
//import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom"
//import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
//import ListItem from "./ListItem";
import axios from "axios";
//import { NotificationContainer, NotificationManager } from 'react-notifications';

var retrievedData = localStorage.getItem("currentDate");
var weekdate = localStorage.getItem("week")


var today = localStorage.getItem("Today");
var after = localStorage.getItem("minute");



class PopUp extends Component{
    constructor(props) {
        super(props);
        this.state = {
            alertmessage:'',
            items:'',
            currentDate: JSON.parse(retrievedData),
            week:  JSON.parse(weekdate),
            now: JSON.parse(today),
            then: JSON.parse(after),
            message:''
        }
    }
    handleClick = () => {
        this.props.history.push("/account");

    }
    handleClickmoment = () => {
        this.props.history.push("/changePassword");
    }

    handleChange1 = (event) => {
        event.preventDefault();
        let message = "";
        if(this.state.items===""){
            message="please add the task";

            this.setState({
                message:message
            })
        }
        else {
        
        
          var today= moment().calendar();
 
         var setTime= moment().add(2, 'minutes').calendar();
    
        console.log(today);
        console.log(setTime);
        
        // //var currentTime = moment().calendar();
        // var setTime = moment().add(2, 'minutes').calendar();
        // localStorage.setItem("Today", JSON.stringify(currentTime));
        // localStorage.setItem("minute", JSON.stringify(setTime));

        // console.log(this.state.now);
        // console.log(this.state.then);

        if (Date.parse.today===Date.parse.setTime) {
             alert("Hello you have added an notification to notify after")
        }

        //      this.setState({
        //          alertmessage:alertmessage
        //      })
            
        // }
    }
}
    handleChange = (event) => {
        event.preventDefault();
        let message = "";
        if (this.state.items ==="") {
            message = "please add the task";

            this.setState({
                message: message
            })
        }
        else{
       
        console.log("Hi");
        var currentDate = moment().calendar();
        var nextdate = moment().add(1, 'days').calendar();

        console.log(currentDate);
        console.log(nextdate);

        if (Date.parse.currentDate === Date.parse.nextdate) {
            alert("You have added an notification for Tomoorrow");
           
        }
    }
    }

    handleChange2 = (event) => {
        event.preventDefault();
        let message = "";
        if (this.state.items == "") {
            message = "please add the task";

            this.setState({
                message: message
            })
        }
      else { 
        var currentDate = moment().calendar();
        var nextdate = moment().add(7, 'days').calendar();
        localStorage.setItem("currentDate", JSON.stringify(currentDate));
        localStorage.setItem("week", JSON.stringify(nextdate));
        console.log(this.state.currentDate)
        console.log(this.state.week)
        
        if (Date.parse.currentDate ===Date.parse. week) {

            alert("You have set an notification for next Week")
        }

    }

        
            
    }

    handleChange3 = (event) => {
        let message = "";
        if (this.state.items == "") {
            message = "please add the task";

            this.setState({
                message: message
            })
        }
        else { 
        this.props.history.push("/customize");
    }
}
    handleClickmoment1 = event => {
        event.preventDefault();
        this.props.history.push("/addp");

    }

     handleClickmoment1 = event => {
        event.preventDefault();
        this.props.history.push("/addp");

    }

     handlepopup = event => {
       event.preventDefault();
       this.props.history.push("/example")

          const defaultOptions = {
              baseURL: 'https://91e20d9642ce.ngrok.io/',
              method: 'get',
              headers: {
            'Content-Type': 'application/json',
           },
        };

        // Create instance
         let instance = axios.create(defaultOptions);

        // // Set the AUTH token for any request
        instance.interceptors.request.use(function (config) {
            const token = localStorage.getItem('token');
            config.headers.Authorization = token ? `${token}` : '';
            console.log("home")
            return config;
        });

         instance.get('https://91e20d9642ce.ngrok.io/api/task/tasks', this.state).then(response => {
            console.log(response);

            localStorage.setItem("todos", JSON.stringify(response.data));



        })

            .catch(error => { console.log(error) })
        
        

   }

    onFormHandler = event => {
        event.preventDefault();
        let message = "";
        if (this.state.items == "") {
            message = "please add the task";

            this.setState({
                message: message
            })
        }
        else {
        this.setState({
            items: this.state.items
        });
        localStorage.setItem("list", JSON.stringify(this.state.items));

        const defaultOptions = {
            baseURL: 'https://7930b80c687f.ngrok.io/',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        // Create instance
         let instance = axios.create(defaultOptions);

        // Set the AUTH token for any request
          instance.interceptors.request.use(function (config) {
            const token = localStorage.getItem('token');
            config.headers.Authorization = token ? `${token}` : '';
            console.log("home")
            return config;
        });

            instance.post('https://91e20d9642ce.ngrok.io/api/task/tasks', this.state).then(response => {
            console.log(response);
               
        })

         .catch(error => { console.log(error) })

  }}
   
    onDeleteHandler = index => {

        const deleteTask = [...this.state.items];
        deleteTask.splice(index, 1);
        this.setState({
            items: deleteTask
        });
    }

    onChangeHandler = (event) => {
        this.setState({
            items:event.target.value
        })
    }

    


render(){
    return(
        
        <div >
        <form id="to-do-form">
        <div className="center">
                    <div style={{ color: "red", fontsize: 12 }}> {this.state.message} </div>     
                    <table>
                        
                        <tbody>
                            
                        <tr>
                            <th><input type="text" placeholder="List Name..." onChange={this.onChangeHandler} value={this.state.items} /></th>
                            <th className="ex3"> Remind me</th>
                                
                        </tr>
                        <tr>
                            <td>Notes</td>
                            <td><button onClick={this.handleChange1}><FontAwesomeIcon style={{ float: "right" }} icon={faBell} />Today </button></td>
                        </tr>
                        <tr>
                            <td>Insert Your notes</td>
                            <td><button onClick={this.handleChange}><FontAwesomeIcon style={{ float: "right" }} icon={faBell} />Tomorrow</button></td>
                            
                        </tr>
                        <tr>
                            <td></td>
                            <td> <button  onClick={this.handleChange2}><FontAwesomeIcon style={{ float: "right" }} icon={faBell} />Next Week</button></td>

                        </tr>
                        <tr>
                            <td></td> 
                            <td> <button  onClick={this.handleChange3}><FontAwesomeIcon style={{ float: "right" }} icon={faBell} />Custom</button><br /></td>

                        </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td><button onClick={this.onFormHandler}>Add Todo</button></td>
                                
                            </tr>
                        </tfoot>
                    </table>
                    <small>
                        <Link to="/example" onClick={this.handlepopup}> Click here to add the items </Link>
                    </small>
         </div>
         </form>
            
         </div>
         
        
         
                
    );
}
}
export default PopUp;