const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  token:{
    type:String,
    
  },
  Phone:{
    type:Number
  },
  Address:{
    type:String
  },
  DOB:{
    type:String
  }
});
module.exports = User = mongoose.model("users", UserSchema);