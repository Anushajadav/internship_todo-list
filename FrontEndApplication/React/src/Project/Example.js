import React, {Component} from  'react';
import "./Examples.css";
import axios from "axios";
//import $ from "jquery";



var list = localStorage.getItem("todos");
var names = JSON.parse(list);

 
//console.log(movies2[0].itemList);

//var Grocery = localStorage.getItem("Groceryitems");
//var handle = JSON.parse(Grocery)


class Example extends Component{
    constructor(props){
        super(props)
        this.state={
        task:'',
        term: '',
       ItemList: '',
       checked :false,
       TaskName:''
        
    }
}
    handleCheck =()=> {
    this.setState({ 
        checked: !this.state.checked 
    });
    console.log("checked")
}

    onFormHandler = event => {
        event.preventDefault();
        this.setState({
            
            ItemList: this.state.ItemList


        });
        const defaultOptions = {
            baseURL: 'https://91e20d9642ce.ngrok.io/',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        let instance = axios.create(defaultOptions);

        // Set the AUTH token for any request
        instance.interceptors.request.use(function (config) {
            const token = localStorage.getItem('token');
            config.headers.Authorization = token ? `${token}` : '';
            console.log("home")
            
            return config;
        });
        
        console.log(this.state)
        console.log(this.state.tid);
        instance.post("https://91e20d9642ce.ngrok.io/api/task/tasks/taskid/items", this.state).then(response => {
            console.log(response);
            localStorage.setItem("value", JSON.stringify(response.data));
            
        })

            .catch(error => { console.log(error) })

    }
    
    onDeleteHandler = index => {

        const deleteTask = this.state.itemList;
        deleteTask.splice(index, 1);
        this.setState({
            items: deleteTask
        });
        console.log(this.state.itemList)
    }

    onChangeHandler = (event) => {
        this.setState({
            ItemList: event.target.value 
        })
    }

    handleonClick= (event) => {
        event.preventDefault();
        this.setState({
            value :event.target.value
        })
        const defaultOptions = {
            baseURL: 'https://91e20d9642ce.ngrok.io/',
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        let instance = axios.create(defaultOptions);

        // Set the AUTH token for any request
        instance.interceptors.request.use(function (config) {
            const token = localStorage.getItem('token');
            config.headers.Authorization = token ? `${token}` : '';
            console.log("home")

            return config;
        });

        console.log(this.state)
        
        instance.get("https://91e20d9642ce.ngrok.io/api/task/tasks/taskName", this.state).then(response => {
            console.log(response);
            localStorage.setItem("todos", JSON.stringify(response.data));

        })

            .catch(error => { console.log(error) })

    }




    componentDidMount(){

        this.documentData = JSON.parse(localStorage.getItem("todos"))
        //console.log(this.documentData[0]._id)
        if (localStorage.getItem("todos")) {
            this.setState({
                task: this.documentData.todo,
            })
            console.log(this.state.task);
        }

        

        var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
                /* Toggle between adding and removing the "active" class,
                to highlight the button that controls the panel */
                this.classList.toggle("active");

                /* Toggle between hiding and showing the active panel */
                var panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                } else {
                    panel.style.display = "block";
                }
            });
            
        }
         
    }
    render(){
        return(
            
            <div>
            <h5 className="idiot">Your Todo Page</h5>
             <div className="guard">
               {
                  names.map((items,index)=>{
                   
                      return <li key={index}>
                           <button className="accordion"  value={names[index].items}  >{names[index].items}
                           </button>
                           <div className="panel">
                              <input type="text" placeholder="List Name..." onChange={this.onChangeHandler} value={this.state.ItemList} />
                              <button onClick={this.onFormHandler}>Add Todo</button><br/> 
                             
                                 {/* <button  onClick={this.onDeleteHandler}>Delete</button> */}
                                {
                                        names.map((itemList,id)=>{
                                        return<li key={id}>
                                      <input type="checkbox" value={names[index].itemList[id]} onChange={this.handleCheck} defaultChecked={this.state.checked} />
                                            <label>{names[index].itemList[id]} </label>
                                        </li>
                                    })
                                }
                                    

                          
                         </div>
                         </li>

                   })}
                    
                    {/* <ListItem deleteTask={this.onDeleteHandler} ItemList={this.state.ItemList} /> */}
            </div>
            </div>
        
            

        )
    }

}
export default Example;