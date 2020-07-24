const keys = require("../../config/keys");
const express = require("express");
const authenticate = require("../../config/authenticate");
const passport = require("passport");
const router = express.Router();
const User = require("../../models/User");
const { response } = require("express");
const cors = require('./cors');
const bcrypt = require("bcryptjs");
 

router.get("/accountPage",cors.cors,authenticate.verifyUser,(req,res)=>{
   console.log(req.headers.authorization);
   User.findOne({ email: req.body.Email }).then(user=>{

      res.json(user);

      console.log("hii");
   }

   ).catch(error=>{
      console.log("hello");
      console.log(error);
   })
    
});


router.post("/accountPage",cors.cors,authenticate.verifyUser,(req,res)=>{
  //console.log(req.headers.authorization);
  let len = req.headers.authorization.split(" ")[1];
  let tokenid=len.substring(0,len.length-1);
   
   User.findOne({token:tokenid  }).then(user=>{
       user.firstName= req.body.FirstName;
          user.lastName= req.body.LastName;
          user.email=req.body.Email;
 
       
       user.phoneNumber=req.body.Phone;
       user.address=req.body.Address;
       user.dob=req.body.DOB;
       user.save().then(response=>{
          console.log(response)
          console.log("hi")
          res.json({message:"saved sucessfully"});
       }).catch(error=>{
          console.log("error")
          res.json(console.log(error))}
       )
   }

   ).catch(error=>{console.log(error);})
     
});

router.post("/accountPage/passwordChange",cors.cors,authenticate.verifyUser,(req,res)=>{
   console.log(authenticate.verifyUser)
   console.log(req.body);

   let len = req.headers.authorization.split(" ")[1];
  let tokenid=len.substring(0,len.length-1);
   User.findOne({ token: tokenid}).then(user=>{
           
      console.log(user)
       const password=req.body.OldPassword;
        
       
         console.log(user.password);
       bcrypt.compare(password,user.password).then(isMatch => {
         if (isMatch) {
            const password2=req.body.NewPassword;

            bcrypt.genSalt(10, (err, salt) => {
           
               bcrypt.hash( password2, salt, (err, hash) => {
                 if (err) throw err;
                 user.password = hash;
                 user
                   .save()
                   .then(user =>  {
                     res.json({
                       message: "saved sucessfully"
                        
                     });
                   })
                   .catch(err => console.log(err));
               });
             });

            
             
           
         } else {
           
           return res.json({ message: "old Password incorrect" });
         }
       });


       
   }

   ).catch(error=>{console.log(error);})
     
});

module.exports = router;