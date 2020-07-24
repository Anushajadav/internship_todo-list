import React, { Component } from "react";
import "./Login.css";
import axios from 'axios';
import {Link} from "react-router-dom";





const initialState = {
    Emailid: "",
    Password: "",
    PasswordError: "",
    EmailidError: "",
    InvalidError:'',

    
    
};

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;

        }

    handleEmailidChange = event => {
        this.setState({
            Emailid: event.target.value
        });
    };

    handlePasswordChange = event => {
        this.setState({
            Password: event.target.value
        });
    };

    validate = () => {
        let EmailidError = "";
        let PasswordError = "";

        if (!this.state.Emailid.includes("@"&&".")){
            EmailidError = "invalid email";
        }
        if (this.state.Password.length < 6) {
            PasswordError = "password should contain atleast six characters";
        }

        if (EmailidError || PasswordError) {
            this.setState({
                EmailidError: EmailidError,
                PasswordError: PasswordError
            });
            return false;
        }
        return true;
    };


    handleSubmit = event => {

        event.preventDefault();
        let InvalidError='';
        let token='';
        //let Authenticate="";
        //let AuthenticatedError="";
    

        
        const isValid = this.validate();
        if (isValid) {

            console.log(this.state);
            //clear
            localStorage.setItem("document", JSON.stringify(this.state));
            this.setState(initialState);
        }
    
        axios.post('https://91e20d9642ce.ngrok.io/api/users/login', this.state)
            .then(response=> {
                console.log(response.data)
            if(response.data.message==="Password incorrect"|| response.data.emailnotfound==="Email not found"){
                    InvalidError="Invalid Email or Password"

                    this.setState({
                        InvalidError:InvalidError

                    })
                     
                    }
               
                    else{

                /* const { token } = response.data.token;
                 console.log(response.data.token);
                 localStorage.setItem("jwtToken", JSON.stringify(token));*/
                

                    token = response.data.token;
                    console.log(token);
                    localStorage.setItem("token", JSON.stringify(token));
                    
                if (token) {
                    // Apply authorization token to every request if logged in
                    axios.defaults.headers.common["Authorization"] = token;
                    this.props.history.push("/homePage");

                } else {
                    // Delete auth header
                    delete axios.defaults.headers.common["Authorization"];
                }

                        /*if(Authenticate===response.token){
                   
                       this.props.history.push("/homepage");
                     }
                       else
                       {
                           AuthenticatedError="Your are not an authenticated user";
                           this.setState({
                               AuthenticatedError:AuthenticatedError
                           })
                         
                     }*/
                
                }
            })
            
            
            
               

            .catch(error => {
                console.log(error)
            })
            
    };
    componentDidMount = () => {
        this.documentData = JSON.parse(localStorage.getItem("document"));
        
        if (localStorage.getItem("document")) {
            this.setState({
                Emailid: this.documentData.Emailid,
                Password: this.documentData.Password,
            });
        } else {
            this.setState({
               
                Emailid: "",
                Password: "",
            });
        }
        
     };

    render() {

        return (
            
            <div>
                
               <div className="login">
                   < form  onSubmit={this.handleSubmit}>
                        <div className="opp">
                            {this.state.InvalidError}
                        </div>
                        
                    <input type="text" placeholder="Username" id="username" value={this.state.Emailid}
                        onChange={this.handleEmailidChange}/>
                        <div className="opp">
                            {this.state.EmailidError}
                        </div>
                        
                        
                    <input type="password" placeholder="password" id="password"
                        value={this.state.Password}
                        onChange={this.handlePasswordChange} />
                        <div className="opp"> {this.state.PasswordError}</div>
                        
                        <input type="submit" value="Sign In"/><br/>
                         <div className="opps">
                            <small>New User?<Link to="/register">register</Link></small>
  
                        </div> 
                        </form>
                        </div>
                        <div className="shadow">

                        </div>
                        </div>

                        
            
            
            
        );
    };
};

export default Login;