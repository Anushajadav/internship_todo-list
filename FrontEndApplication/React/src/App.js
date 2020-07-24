import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Project/Login";
import Register from "./Project/Register";
import HomePage from "./Project/HomePage";
import  Account from "./Project/Account";
import ChangePassword from "./Project/ChangePassword";
import List from "./Project/List";
import axios from "axios";
//import ShoppingList from "./Project/ShoppingList"
import TravelList from "./Project/TravelList";
import Customize from "./Project/Customize";
//import AddP from "./Project/AddP";
import PopUp from "./Project/PopUp";
//import Tomorrow from "./Project/Tomorrow";
//import SList from "./Project/SList";
//import Todo from "./Project/Todo";
import Example from "./Project/Example";
//import Stationery from "./Project/Stationery";
class App extends Component {

  //constructor(props){
    //super(props)
  // this.state={
   // posts:[]
 // }
//}
 // componentDidMount(){
    
   // axios.get('https://jsonplaceholder.typicode.com/posts')
    //.then(response=> {
     // 
      //console.log(response)
      //this.setState({posts: response.data})
    //})
    //.catch(error=>{
     // console.log(error)
    //})
 // }

  

  
  render() {
    let token;
    axios.interceptors.request.use(function (config){
     token = localStorage.getItem(token);
    config.headers.Authorization = token;

    return config;
  });
   // const {posts} =this.state
    return (
      <div>
      <Router>
        <Switch>
          <Route exact path="/Register" component={Register} />
          <Route  exact path="/" component={Login} />
          <Route exact path="/homePage" component= {HomePage} />
         <Route exact path="/account" component={Account}></Route>
          <Route exact path="/changepassword" component={ChangePassword}></Route>
          <Route exact path ="/list" component={List}></Route>
          {/* <Route exact path ="/shoppinglist" component={ShoppingList}></Route> */}
           <Route exact path="/travellist" component={TravelList}></Route>
           <Route exact path="/customize" component={Customize}></Route>
            {/* <Route exact path="/addp" component={AddP}></Route> */}
            <Route exact path="/popup" component={PopUp}></Route>
             <Route exact path="/example" component ={Example}></Route>
            {/* <Route exact path="/stationery" component={Stationery}></Route> */}
          </Switch>
      </Router>
     
      {/*<Todo/>*/}
    </div>
    );
  }
}
export default App;
