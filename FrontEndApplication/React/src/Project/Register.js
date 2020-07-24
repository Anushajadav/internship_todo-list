import React, { Component } from "react";
import "./mystyle.css";
import axios from 'axios';

const intialState = {
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    ConfrimPassword: "",
    FirstNameError: "",
    LastNameError: "",
    EmailError: "",
    PasswordError: "",
    ConfrimPasswordError: "",
    InvalidError:''
};

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = intialState;
        
    }
    handleFirstNameChange = event => {
        this.setState({
            FirstName: event.target.value
        });
    };
    handleLastNameChange = event => {
        this.setState({
            LastName: event.target.value
        });
    };

    handleEmailChange = event => {
        this.setState({
            Email: event.target.value

        });
    };
    handlePasswordChange = event => {
        this.setState({
            Password: event.target.value
        });
    };
    handleConfrimPasswordChange = event => {
        this.setState({
            ConfrimPassword: event.target.value
        });
    };

    Validateform = () => {
        let FirstNameError = "";
        let LastNameError = "";
        let EmailError = "";
        let PasswordError = "";
        let ConfrimPasswordError = "";
        

        if (!this.state.FirstName) {
            FirstNameError = "Please fill FirstName";
        }
        if (!this.state.LastName) {
            LastNameError = "Please fill LastName";
        }
        if (!this.state.Email.includes("@" && ".")) {
            EmailError = "Invalid Emailid";
        }
        if (this.state.Password.length < 6) {
            PasswordError = "Password should contain atleast six characters";
        }
        if (
            this.state.ConfrimPassword.length < 6 ||
            this.state.ConfrimPassword !== this.state.Password
        ) {
            ConfrimPasswordError = "Please Check the Password ";
        }

        if (
            FirstNameError ||
            LastNameError ||
            EmailError ||
            PasswordError ||
            ConfrimPasswordError
        ) {
            this.setState({
                FirstNameError: FirstNameError,
                LastNameError: LastNameError,
                EmailError: EmailError,
                PasswordError: PasswordError,
                ConfrimPasswordError: ConfrimPasswordError
            });
            return false;
        }
        return true;
    };

    handleonSubmit = event => {
        event.preventDefault();
        const isValid = this.Validateform();
          let InvalidError=""
        

        if (isValid) {

            console.log(this.state);
            localStorage.setItem("User", JSON.stringify(this.state));
            //clear
            this.setState(intialState);
        }
        
        axios.post("https://91e20d9642ce.ngrok.io/api/users/register",this.state)
        .then(response=>{
            console.log(response)
            if (response.data.email === "Email already exists"){
                InvalidError ="Email already exist";
             this.setState({
                    InvalidError:InvalidError
            
                })
            }
        
            else{
                
                this.props.history.push("/login");
                
            }
        })
        .catch(error=>{
            console.log(error)
        })

        };

    componentDidMount = () => {
        this.documentData = JSON.parse(localStorage.getItem("User"))
        
        if (localStorage.getItem("User")) {
            this.setState({
                FirstName: this.documentData.FirstName,
                LastName: this.documentData.LastName,
                Email: this.documentData.Email,
                Password: this.documentData.Password,
                ConfrimPassword: this.documentData.ConfrimPassword
            });
        } else {
            this.setState({
                FirstName: "",
                LastName: "",
                Email: "",
                Password: "",
                ConfrimPassword: ""
            });
        }
    };



    render() {
        return (
            
            <form className="hello" onSubmit={this.handleonSubmit}>
                <div>
                    <h4 align="left"> Create New Customer account</h4>
                    <h5 align="left" style={{ borderBottom: "1px solid #ccc" }}>
                        Personal Information
          </h5>
                    <div>
                        <div align="left" style={{ padding: "5px" }}>
                            <div>
                                <label>First Name</label>
                            </div>
                            <input
                                type="text"
                                placeholder="Enter your FirstName"
                                value={this.state.FirstName}
                                onChange={this.handleFirstNameChange}
                            />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.FirstNameError}
                            </div>
                        </div>
                        <div align="left" style={{ padding: "5px" }}>
                            <div>
                                <label> Last Name </label>
                            </div>
                            <input
                                type="text"
                                placeholder="Enter your LastName"
                                value={this.state.LastName}
                                onChange={this.handleLastNameChange}
                            />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.LastNameError}
                            </div>
                        </div>
                        <div align="left" style={{ padding: "5px" }}>
                            <div>
                                <label> Email </label>
                            </div>
                            <input
                                type="text"
                                placeholder="Enter your Email"
                                value={this.state.Email}
                                onChange={this.handleEmailChange}
                            />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.EmailError}
                            </div>
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.InvalidError}
                            </div>
                        </div>
                        <div align="left" style={{ padding: "5px" }}>
                            <div>
                                <label>Password</label>
                            </div>
                            <input
                                type="password"
                                placeholder="Enter your Password"
                                value={this.state.Password}
                                onChange={this.handlePasswordChange}
                            />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.PasswordError}
                            </div>
                        </div>
                        <div align="left" style={{ padding: "5px" }}>
                            <div>
                                <label>Confrim Password </label>
                            </div>
                            <input
                                type="password"
                                placeholder="Enter Password again"
                                value={this.state.ConfrimPassword}
                                onChange={this.handleConfrimPasswordChange}
                            />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.ConfrimPasswordError}
                            </div>
                        </div>
                        <div align="left" style={{ padding: "5px" }}>
                            <button style={{ color: "green" }}>Create an Account </button>
                        </div>
                        <div className="pour" style={{ padding: "5px" }}>
                        </div>
                    </div>
                    
                </div>
            </form>
        
        );
    }
}
export default Register;
