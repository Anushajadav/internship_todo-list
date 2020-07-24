const keys = require("../../config/keys");
const express = require("express");
const authenticate = require("../../config/authenticate");
const passport = require("passport");
const router = express.Router();
const User = require("../../models/User");
 
 
const cors = require('./cors');
const Tasks = require("../../models/Tasks");
 
 //get all the task
 router.get("/tasks",cors.cors,authenticate.verifyUser,(req,res)=>{
   
   let len = req.headers.authorization.split(" ")[1];
   let tokenid=len.substring(0,len.length-1);
 
   User.findOne({ token: tokenid}).then(user=>{
      console.log(req.body);
      console.log(user)
      console.log(user._id)
      Tasks.findOne({id:user._id}).then(resp=>{
         console.log(user._id)
        if(resp){
        Tasks.find({id:user._id},function(err,todos){
            if(err){
               console.log(err)
            }
            else{
               Tasks.find({id:user._id},function(err,todos){
                  if(err){
                     console.log(err)
                  }
                  else{
                     res.json(todos
                      
          );
                  }
               })
            }
         })
       
        }
        else
        {
           res.json("add the task");
        }

   
  }).catch(err=>{console.log(err)});
  }).catch(err=>{console.log(err)})
 
});

//to get perticular task with list
router.get("/tasks/taskName",cors.cors,authenticate.verifyUser,(req,res)=>{
   
   let len = req.headers.authorization.split(" ")[1];
   let tokenid=len.substring(0,len.length-1);
 
   User.findOne({ token: tokenid}).then(user=>{
      console.log(req.body);
      console.log(user)
      console.log(user._id)
      Tasks.findOne({id:user._id}).then(resp=>{
         console.log(user._id)
        if(resp){
        Tasks.find({items:req.body.TaskName},function(err,todos){
           
            if(err){
               console.log(err)
            }
            else{
                
                     res.json(todos);
                 
              
            }
         })
       
        }
        else
        {
           res.json("add the task");
        }

   
  }).catch(err=>{console.log(err)});
  }).catch(err=>{console.log(err)})
 
});

//deleat all the task
router.delete("/tasks",cors.cors,authenticate.verifyUser,(req,res)=>{
   
   let len = req.headers.authorization.split(" ")[1];
   let tokenid=len.substring(0,len.length-1);
 
   User.findOne({ token: tokenid}).then(user=>{
      Tasks.findOne({id:user._id}).then(resp=>{
         if(resp){ 
            Tasks.remove({id:user._id},function(err,todos){
            if(err){
               console.log(err)
            }
            else{
               Tasks.find({id:user._id},function(err,todos){
                  if(err){
                     console.log(err)
                  }
                  else{
                     res.json(todos
                      
                  );
                  }
               })
            }
         }

         );
      }
         else{
            res.json("no items to deleate");
         }
         
       
  
 
  });
  });
 
});

//post the task
router.post("/tasks",cors.cors,authenticate.verifyUser,(req,res)=>{
   console.log(req.body);
   let len = req.headers.authorization.split(" ")[1];
    let tokenid=len.substring(0,len.length-1);
    
    User.findOne({ token: tokenid}).then(user=>{
     console.log(user);
     console.log(user._id);
     Tasks.findOne({items:req.body.items}).then(resp=>{
        if(resp){
       return res.json("items already exist");}
       else{
        const newTask=new Tasks({
           id:user._id,
           items:req.body.items,
          // TaskNote:req.body.TaskNote,
           //Remainder:req.body.Remainder,
     });
        newTask.save().then(resp=>{
         Tasks.find({id:user._id},function(err,todos){
            if(err){
               console.log(err)
            }
            else{
               res.json(todos
                
            );
            }
         })
     
        })
        .catch(err => console.log(err));
       }
     }).catch(err=>{console.log(err)});
      
  
    });    
   });

//deleat particular task
 router.delete("/tasks/:taskid",cors.cors,authenticate.verifyUser,(req,res)=>{
   let len = req.headers.authorization.split(" ")[1];
    let tokenid=len.substring(0,len.length-1);
     
    User.findOne({ token: tokenid}).then(user=>{
      Tasks.findOne({id:user._id}).then(resp=>{
   if(resp){
      Tasks.findByIdAndRemove(
         { _id:req.body.Itemid },(err,doc)=>{
            if(err){
               console.log(err);
     
            }
            else{
               Tasks.find({id:user._id},function(err,todos){
                  if(err){
                     console.log(err)
                  }
                  else{
                     res.json(todos
                      
                  );
                  }
               })
            }
         }  
     );
   }
   else{
      console.log("no task to delete")
   }
     
});
}); 
});
  
 

//update perticular task        
   
router.put("/tasks/taskid",cors.cors,authenticate.verifyUser,(req,res)=>{
   let len = req.headers.authorization.split(" ")[1];
    let tokenid=len.substring(0,len.length-1);
     
    User.findOne({ token: tokenid}).then(user=>{
      Tasks.findOne({id:user._id}).then(resp=>{
         if(resp){
            Tasks.findOne({_id:req.body.Itemid}).then(resp=>{
               resp.items=req.body.Itemid;
               resp.TaskNote=req.body.TaskNote;
               resp.Remainder=req.body.Remainder;
    
               resp.save().then(res=>{
                  Tasks.find({id:user._id},function(err,todos){
                     if(err){
                        console.log(err)
                     }
                     else{
                        res.json(todos
                         
                     );
                     }
                  })
    
               }).catch(err=>{console.log(err)});
    
            }).catch(err=>{console.log(err)});
         }
         else{
            res.json("no task to update")
         }
         
          
  
               });
            }); 
});
 


//adding item to a perticular task
 router.post("/tasks/taskid/items",cors.cors,authenticate.verifyUser,(req,res)=>{
   let len = req.headers.authorization.split(" ")[1];
    let tokenid=len.substring(0,len.length-1);
    console.log("body"+req.body);
     
    User.findOne({ token: tokenid}).then(user=>{
      Tasks.findOne({id:user._id}).then(resp=>{
         if(resp){
            Tasks.findByIdAndUpdate(
               { _id:req.body.Itemid }, 
               { $push: { itemList:req.body.ItemList }},(err,doc)=>{
                  if(err){
                     console.log(err);
           
                  }
                  else{
                     Tasks.find({id:user._id},function(err,todos){
                        if(err){
                           console.log(err)
                        }
                        else{
                           res.json(todos);
                        }
                     })
                        
                      
                           }
                        }  
                       );
         }
         else{
            res.json("no task found")
         }
      
      });
            });    
         });

//remove a item from perticular task
   router.put("/tasks/:taskid/items",cors.cors,authenticate.verifyUser,(req,res)=>{
   let len = req.headers.authorization.split(" ")[1];
   let tokenid=len.substring(0,len.length-1);
     
    User.findOne({ token: tokenid}).then(user=>{
      Tasks.findOne({id:user._id}).then(resp=>{
         if(resp){
            Tasks.findByIdAndUpdate(
               { _id:req.body.Itemid}, 
               { $pull: { itemList:req.body.ItemList }},(err,doc)=>{
                  if(err){
                     console.log(err);
           
                  }
                  else{
                     Tasks.find({id:user._id},function(err,todos){
                        if(err){
                           console.log(err)
                        }
                        else{
                           res.json(todos
                            
                        );
                        }
                     })
                           }
                        }  
                       );
                     }
                     else{
                        res.json("No item")
                     }
   
               });
            });    
         });
            
 
    
  
    


 module.exports = router;