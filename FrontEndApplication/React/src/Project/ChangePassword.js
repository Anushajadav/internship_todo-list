import React, { Component } from "react";
import "./mystyle.css";
import axios from 'axios';

const user = localStorage.getItem("User");


const intialState = {
    OldPassword: "",
    Email: JSON.parse(user).Email,
    FirstName:JSON.parse(user).FirstName,
    NewPassword: "",
    ConfrimPassword: "",
    OldPasswordError:'',
    NewPasswordError:'',
    ConfrimPasswordError:'',
    messageerror:'',
    message:''
};

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = intialState;

    }
    handleOldPasswordChange = event => {
        this.setState({
            OldPassword: event.target.value
        });
    };
    handleNewPasswordChange = event => {
        this.setState({
            NewPassword: event.target.value
        });
    };

    handleConfrimPasswordChange = event => {
        this.setState({
            ConfrimPassword: event.target.value

        });
    };
    handleEmailChange = event => {
        console.log("first")
        const user = localStorage.getItem("User");
        this.setState({

            Email: JSON.parse(user).Email

        });
    };


    Validateform = () => {
        let OldPasswordError = "";
        let NewPasswordError = "";
        let ConfrimPasswordError = "";

        if (this.state.OldPassword.length < 6) {
            OldPasswordError = "Password should contain atleast six characters";
        }
        if (this.state.NewPassword.length < 6) {
            NewPasswordError = "Password should contain atleast six characters";
        }
        if (
            this.state.ConfrimPassword.length < 6 ||
            this.state.ConfrimPassword !== this.state.NewPassword
        ) 
        {
            ConfrimPasswordError = "Please Check the Password";
        }

        if (
            OldPasswordError ||
            NewPasswordError||
            ConfrimPasswordError
        ) {
            this.setState({
                OldPasswordError:OldPasswordError,
                NewPasswordError: NewPasswordError,
                ConfrimPasswordError: ConfrimPasswordError
            });
            return false;
        }
        return true;
    };

    handlebackChange = () => {
        this.props.history.push("/homepage");

    }


    handleonSubmit = event => {

        event.preventDefault();

        const isValid = this.Validateform();
        let messageerror ='';
        let  message ='';
        

        if (isValid) {

            //console.log(this.state);
          
            //this.setState(intialState);
            const defaultOptions = {
                baseURL: 'https://91e20d9642ce.ngrok.io/',
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
                console.log("hiii")
                return config;
            });
            

            instance.post("https://91e20d9642ce.ngrok.io/api/home/accountPage/passwordChange",this.state).then(response => {
                console.log(response);
               
                if (response.data.message ==="old Password incorrect"){
                    messageerror = "Check Your Old Passwword";

                    this.setState({
                        messageerror: messageerror
                    })
                }
                   if(response.data.message === "saved sucessfully"){
                      message = "Saved Sucessfully";

                      this.setState({
                          message:message
                      })


                   }
                
        


            })
            .catch(error => { console.log(error) })

            console.log(this.state);
            localStorage.setItem("Password", JSON.stringify(this.state));
            //clear
            this.setState(intialState);
        }

    }
    
    render() {
        return (
            <div>
                <h4 style={{ color:"blue"}}>Hello {this.state.FirstName} !!</h4>
            <form className="owl" onSubmit={this.handleonSubmit}>
                <div>
                        <div align="left" style={{ padding: "5px" }}>
                            <div>
                                <label>Old Password</label>
                            </div>
                            <input
                                type="Password"
                                placeholder="Enter your old Password"
                                value={this.state.FirstName}
                                onChange={this.handleOldPasswordChange}
                            />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.OldPasswordError}
                            </div>
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.messageerror}
                            </div>
                        </div>
                       <div align="left" style={{ padding: "5px" }}>
                            <div>
                        <label>New Password</label>
                    </div>
                    <input
                        type="Password"
                        placeholder="Enter your old Password"
                        value={this.state.FirstName}
                        onChange={this.handleNewPasswordChange}
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.NewPasswordError}
                    </div>
                </div>
                <div align="left" style={{ padding: "5px" }}>
                            <div>
                        <label>ConfrimPassword</label>
                    </div>
                    <input
                        type="Password"
                        placeholder="Enter your old Password"
                        value={this.state.FirstName}
                        onChange={this.handleConfrimPasswordChange}
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                        {this.state.ConfrimPasswordError}
                    </div>
                </div>
                        
                <div align="left" style={{ padding: "5px" }}>
                  <button style={{ color: "green" }}>Submit </button>
                <div align="right-left" style={{ padding: "5px" }}>
               <button style={{ color: "green" }} onClick={this.handlebackChange}>Back </button>
             </div>
                </div>
                        <div style={{ fontSize: 15, color: "green" }}>
                            {this.state.message}
                        </div>
                 </div> 
            </form>
            </div>

        );
    }
}
export default ChangePassword;
