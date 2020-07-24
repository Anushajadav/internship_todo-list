// import React, { Component } from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
// import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
// import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
// import {faPlus} from "@fortawesome/free-solid-svg-icons";
// import "./Add.css";
// import Todo from "./Todo";
// import Stationery from "./Stationery"
// import $ from "jquery";

// import {
//     Accordion,
//     AccordionItem,
//     AccordionItemHeading,
//     AccordionItemButton,
//     AccordionItemPanel,
// } from 'react-accessible-accordion';



// var retrievedData = localStorage.getItem("list");
// var movies2 = JSON.parse(retrievedData)
 

// class AddP extends Component{
//     constructor(props) {
//         super(props);
//         this.state={
//             todo: "",
//             term: '',
//             items: [],
//             showInfo:false
//         };
//      }


    
//      handleToogle=()=>{
//          this.setState({
//              showInfo: !this.state.showInfo
//          })
         
//      }
    
//     handleChangeToogle = () => {
//         this.setState({
//             showInfo: !this.state.showInfo
//         })

//     }
//     onFormHandler = event => {
//         event.preventDefault();
//         this.setState({
//             term: '',
//             items: [...this.state.items, this.state.term]


//         });

//     }

//     onDeleteHandler = index => {

//         const deleteTask = [...this.state.items];
//         deleteTask.splice(index, 1);
//         this.setState({
//             items: deleteTask
//         });
//     }

//     onChangeHandler = (event) => {
//         this.setState({
//             term: event.target.value
//         })
//     }

//     componentDidMount = () => {
//         this.documentData = JSON.parse(localStorage.getItem("list"))



//         if (localStorage.getItem("list")) {
//             this.setState({
//                 todo: this.documentData.list,
//             })
//             console.log(this.state.todo);
//         }
//     }

//     //handleForm=event=>{
//       //  event.preventDefault();
//         //this.props.history.push("/changePassword");
//     //}
    
    
//     render(){
            

        
//         return (

//             <div>
            
//                      <div className="guard">
//                     <Accordion>

//                         <AccordionItem>
//                             <AccordionItemHeading>
//                                 <AccordionItemButton>
//                                     {movies2[0]}
//                                 </AccordionItemButton>
//                             </AccordionItemHeading>
//                             <AccordionItemPanel>
//                                 <input type="text" placeholder="List Name..." onChange={this.onChangeHandler} value={this.state.term} />
//                                 <button onClick={this.onFormHandler}>Add Todo</button>
//                                 <Todo deleteTask={this.onDeleteHandler} items={this.state.items} />
//                             </AccordionItemPanel>
//                         </AccordionItem>
//                     </Accordion>
//                     <Accordion>
//                         <AccordionItem>
//                             <AccordionItemHeading>
//                                 <AccordionItemButton>
//                                     {movies2[1]}
//                                 </AccordionItemButton>
//                             </AccordionItemHeading>
//                             <AccordionItemPanel>
//                             </AccordionItemPanel>
//                         </AccordionItem>
//                         <AccordionItem>
//                             <AccordionItemHeading>
//                                 <AccordionItemButton>
//                                     {movies2[2]}
//                                 </AccordionItemButton>
//                             </AccordionItemHeading>
//                             <AccordionItemPanel>
//                             </AccordionItemPanel>
//                         </AccordionItem>
//                     </Accordion>







                         
                    
//                            </div>
//                            </div>

                
                    
                

                            
                            
            
                         
        
//         ); 
                   
//                         {/*<input className="input" type="text" placeholder="enter your todo" value={this.state.term} onChange={this.onChangeHandler} />
//                         <input type="radio" id="fa-dot-circle-o" className="hide"  value={this.state.term} onChange={this.onChangeHandler}/>
//                         <label>
//                             <i className="fa fa-fw fa-dot-circle-o"></i>&nbsp;
//                                         </label>
//                          <button onClick={this.onFormHandler}> Add</button>*/}
//                    {/*<input type="text" onChange={this.onChangeHandler} value={this.state.term} /> <button onClick={this.onFormHandler}>Add Checkbox</button> */}      
                    
                    
                    
        
//     }
// }
// export default AddP;

