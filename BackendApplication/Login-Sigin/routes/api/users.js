const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
 
// Load User model
const User = require("../../models/User");
const cors = require('./cors');
 



 


 
router.post("/register",cors.cors, (req, res) => {
    console.log(req.body.Email);
    console.log(req.body.Password);

  User.findOne({ Email: req.body.Email }).then(user => {
      if (user) {
        return res.json({ email: "Email already exists" });
      } else {
        
        const newUser = new User({
          FirstName: req.body.FirstName,
          LastName: req.body.LastName,
          Email: req.body.Email,
          Password: req.body.Password
           
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
           
          bcrypt.hash(newUser.Password, salt, (err, hash) => {
            if (err) throw err;
            newUser.Password = hash;
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
     
   const email = req.body.Email;
   const password = req.body.Password;

    
  // Find user by email
    User.findOne({Email: req.body.Email  }).then(user => {
      // Check if user exists
      console.log(email);
  console.log(password);
      if (!user) {
        return res.json({ emailnotfound: "Email not found" });
      }
  // Check password
  
      bcrypt.compare(password, user.Password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.FirstName
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