const mongoose = require("mongoose");
const User = require("./User");
const Schema = mongoose.Schema;
// Create Schema
 
const TasksSchema = new Schema({
items:{
    type:String,
    required:true,
    unique:true
},
TaskNote:{
    type:String,
    default:""
},
Remainder:{
    type:Date
},
id:{
    type:String
},
 
itemList:{type:Array,
    unique:true
}
});
module.exports = Tasks = mongoose.model("tasks",TasksSchema);