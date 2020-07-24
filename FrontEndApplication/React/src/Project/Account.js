import React,{Component} from 'react';
import "./mystyle.css";
import axios from 'axios';


const intialState = {
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    Address:"",
    Phone:"",
    DOB:"",
    FirstNameError: "",
    LastNameError: "",
    EmailError: "",
    PasswordError: "",
    message:'',
    messageerror:''

     
};


class Account extends Component{
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
handleAddressChange = event => {
    this.setState({
        Address: event.target.value
    });
};
    handlePhoneChange = event => {
        this.setState({
            Phone: event.target.value
        });
    };
    handleDOBChange = event => {
        this.setState({
            DOB: event.target.value
        });
    };

Validateform = () => {
    let FirstNameError = "";
    let LastNameError = "";
    let EmailError = "";
    let PasswordError = "";
    let AddressError = "";
    let PhoneError="";
    let DOBError="";
    

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
    if (!this.state.Address)
    {
        AddressError = "Please Check the Address ";
    }
    if(this.state.Phone.length !==10 || 
        this.state.Phone.length===0){
        PhoneError=" please check"

    }
    if(!this.state.DOB){
       DOBError ="Field required"
    }

    if (
        FirstNameError ||
        LastNameError ||
        EmailError ||
        PasswordError ||
        AddressError||
        PhoneError||
        DOBError
    ) {
        this.setState({
            FirstNameError: FirstNameError,
            LastNameError: LastNameError,
            EmailError: EmailError,
            PasswordError: PasswordError,
            AddressError: AddressError,
            PhoneError:PhoneError,
            DOBError:DOBError
        });
        return false;
    }
    return true;
};

handlebackChange=()=>{
    this.props.history.push("/homepage");
 
}



handleonSubmit = event => {
    event.preventDefault();
    
    const isValid = this.Validateform();
    let message = "";
    let messageerror = "";

        //clear


    if(isValid) {

        /*console.log(this.state);
        localStorage.setItem("Account", JSON.stringify(this.state));
        //clear
        this.setState(intialState);
    }
    axios.post("https://d9e69c83f765.ngrok.io/api/home/accountPage", this.state.Email)

        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        });*/
        const defaultOptions = {
            baseURL:'https://91e20d9642ce.ngrok.io/',
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

        console.log(this.state.Email);

        instance.post('https://91e20d9642ce.ngrok.io/api/home/accountPage', this.state).then(response => {
            console.log(response);
            if(response.data.message==="saved sucessfully") {
                message="Saved Successfully"

               this.setState({
                   message:message
               })
            
           
            }
            else{
                messageerror="Please check the fields"

                this.setState({
                    messageerror:messageerror
                })
            }
     }).catch(error => { console.log(error) })

        console.log(this.state);
        localStorage.setItem("Account", JSON.stringify(this.state));
        //clear
        this.setState(intialState);
    }

}


componentDidMount = () => {
    this.documentData = JSON.parse(localStorage.getItem("User"))
    
    

    if (localStorage.getItem("User")) {
        this.setState({
            FirstName: this.documentData.FirstName,
            LastName: this.documentData.LastName,
            Email: this.documentData.Email,
            Password: this.documentData.Password,
            
        });
    } else {
        this.setState({
            FirstName: "",
            LastName: "",
            Email: "",
            Password: "",
        });
    }
}
    



    render(){
        return(
            <div>
                <form className="hello1" onSubmit={this.handleonSubmit}>
                   <h5 align="left" style={{ borderBottom: "1px solid #ccc" }}>
                        Account Details
                        </h5>
                    
                        <div>
                        <div style={{ fontSize: 12, color: "green" }}>
                            {this.state.messageerror}
                        </div>
                    <div>
                        <div align="left" style={{ padding: "5px" }}>
                            <div>
                        <label>First Name</label>
                        </div>
                            <input type="text" placeholder="Enter your FirstName"
                                value={this.state.FirstName}
                                onChange={this.handleFirstNameChange}/>
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.FirstNameError}
                            </div>
                   </div>
                 </div>
                    <div>
                        <div align="left" style={{ padding: "5px" }}>
                            <div>
                        <label>Last Name</label>
                        </div>
                            <input type="text" placeholder="Enter your LastName"
                                value={this.state.LastName}
                                onChange={this.handleLastNameChange}/>
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.LastNameError}
                            </div>
                    </div>
                    </div>
                    <div>
                        <div align="left" style={{ padding: "5px" }}>
                            <div>
                        <label>Email</label>
                        </div>
                            <input type="text" placeholder="Enter your email"
                                value={this.state.Email}
                                onChange={this.handleEmailChange}/>
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.EmailError}
                            </div>
                        </div>
                        </div>
                    <div>
                        <div align="left" style={{ padding: "5px" }}>
                            <div>
                        <label>Password</label>
                        </div>
                            <input type="password" placeholder="Enter your Password"
                                value={this.state.Password} disabled/>
                    </div>
                    </div>
                    <div>
                        <div align="left" style={{ padding: "5px" }}>
                        <div>
                        <label>Address</label>
                        </div>
                            <input type="text" placeholder="Enter your Address"
                                value={this.state.Address}
                                onChange={this.handleAddressChange}/>
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.AddressError}
                            </div>
                    </div>
                    </div>
                    <div>
                        <div align="left" style={{ padding: "5px" }}>
                            <div>
                        <label>Phone no</label>
                        </div>
                            <input type="tel" placeholder="Enter your Phone no"
                                value={this.state.Phone}
                                onChange={this.handlePhoneChange}/>
                                </div>
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.PhoneError}
                            </div>
                            </div>
                    <div>
                        <div align="left" style={{ padding: "5px" }}>
                            <div>
                        <label>DOB</label>
                        </div>
                            <input type="date" placeholder="Enter your DOB"
                                value={this.state.DOB}
                                onChange={this.handleDOBChange}/>
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.DOBError}
                            </div>
                    </div>
                    </div>
                    <div align="left" style={{ padding: "5px" }}>
                        <button style={{ color: "green" }}>Save Changes </button>
                        </div>
                    
                        <div align="right-left" style={{ padding: "5px" }}>
                            <button style={{ color: "green" }} onClick={this.handlebackChange}>Back </button>
                        </div>
                
                        <div className="apple" style={{ fontSize: 14, color: "green" }}>
                            {this.state.message}
                        </div>
                    </div>

                    
                </form>
            </div>
        )
    }
}
export default Account;