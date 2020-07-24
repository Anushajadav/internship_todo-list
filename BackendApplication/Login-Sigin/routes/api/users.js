const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
 
// Load User model
const User = require("../../models/User");
const cors = require('./cors');
 



 


 
router.post("/register",cors.cors, (req, res) => {
    
  User.findOne({ email: req.body.Email }).then(user => {
      if (user) {
        return res.json({ email: "Email already exists" });
      } else {
        
        const newUser = new User({
          firstName: req.body.FirstName,
          lastName: req.body.LastName,
          email: req.body.Email,
          password: req.body.Password
           
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
           
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user =>  {
                res.json({
                  message: "Registered sucessfully",
                  users: user
                });
              })
              .catch(err => console.log(err));
          });
        });

        
      }
    });
  });

   
router.post("/login",cors.cors, (req, res) => {
     
   const email = req.body.Emailid;
   const password = req.body.Password;

    
  // Find user by email
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.json({ emailnotfound: "Email not found" });
      }
  // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.firstName
          };
  // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey, 
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              user.token=token;
              user.save()
              .then(users => res.json({
                message: "Logged in sucessfully",
                token: "Bearer " + token
              }) )
              .catch(err => console.log(err));   

               
              
              
               
             
            }
          );
        } else {
          
          return res.json({ message: "Password incorrect" });
        }
      });
    });
  });

  

  module.exports = router;