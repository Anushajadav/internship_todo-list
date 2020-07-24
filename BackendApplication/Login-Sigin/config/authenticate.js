const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const mongoose = require("mongoose");
var passport=require('passport');

 

const User = mongoose.model("users");
const keys = require("./keys");
// const opts = {};
// //jwtFromRequest- Function that accepts a request as the only parameter and returns either the JWT as a string or null. 
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();//reads the JWT from the http Authorization header with the scheme 'bearer':
// //creates a new extractor that looks for the JWT in the authorization header with the scheme 'bearer'
// opts.secretOrKey = keys.secretOrKey;
// //is a string or buffer containing the secret (symmetric) or PEM-encoded public key
// exports.jwtPassport = passport.use( new JwtStrategy(opts, (jwt_payload, done) => {
//     console.log(jwt_payload + " "+"jwt_payload");
//     User.findById(jwt_payload.id)
//       .then(user => {
//         if (user) {
//           return done(null,user,{message:"Your authenticated"});
//           console.log(user)
//         }
//         console.log(user)
//         return res.status(401).send({
//             "error": {
//                 "code": "INVALID_AUTHORIZATION_CODE",
//                 "message": "Invalid authorization code"
//             }
//         });
         
//       })
//       .catch(err => console.log(err));
      
//   }))

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