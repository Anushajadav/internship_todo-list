const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const mongoose = require("mongoose");
var passport=require('passport');

 

const User = mongoose.model("users");
const keys = require("./keys");
 

  function isAuthenticated(req, res, next) {
    const auth=req.headers.authorization;
    console.log("header")
    console.log(req.headers.authorization)
    if ( auth !== "undefined") {
        // retrieve the authorization header and parse out the
        // JWT using the split function
        console.log(req.body);
        let len = req.headers.authorization.split(" ")[1];
        let token=len.substring(0,len.length-1);
       // let token="\'" + tok + "\'";

        let privateKey = keys.secretOrKey
        // Here we validate that the JSON Web Token is valid and has been 
        // created using the same private pass phrase
        jwt.verify(token,privateKey , (err,decoded) => {
            console.log("down");
            console.log(token);

            // if there has been an error...
            if (err) {  
                // shut them out!
                console.log(err);
                res.status(402).json({ error: "Not Authorized" });
                
            }
            // if the JWT is valid, allow them to hit
            // the intended endpoint
            console.log(decoded)
            console.log('i am authenticated');
            return next();
        });
    } else {
        // No authorization header exists on the incoming
        // request, return not authorized and throw a new error 
        console.log("hello")
        res.status(401).json({ error: "Not Authorized" });
        
    }
}

exports.verifyUser =isAuthenticated;
// passport.authenticate('jwt', {session: false});