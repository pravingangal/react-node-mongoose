import mongoose from "mongoose";
import nodemailer from "nodemailer";
import empModel from "../empModel/empModel";
import jwt_decode from "jwt-decode";


function empConfirmedEmailRouter(req, res) {

  const empConfirmedEmailData = req.body.confirmationToken;  
  const decodedConfirmationTokenObj=  jwt_decode(empConfirmedEmailData);

  if(mongoose.connection.readyState===1)
  {//*********************start mongoose.connection.readyState if************************ */      
    empModel.countDocuments({},function (err,noOfDocs)
    {//**********   start empModel.countDocuments ***************  //                  
        if(noOfDocs>0)
          {                            
              
              const queryId={id:decodedConfirmationTokenObj.EmpId};
              const updateValues={$set:{
                                        emailConfirmed:true,
                                        emailConfirmationErr:null
                                      }
                                  }; 

                                  empModel.updateOne(queryId,updateValues,(err,response)=>
                                  {
                                   
                                      if(err)
                                      {                                        
                                        setTimeout(()=>{
                                            res.json({ emailConfirmed:false,EmpId:decodedConfirmationTokenObj.EmpId,EmpName:decodedConfirmationTokenObj.EmpName,emailConfirmationErr:err});                                  
                                          },1000);                                                                              
                                          global.ioMsgSocket.emit("emailConfirmed",{ emailConfirmed:false,EmpId:decodedConfirmationTokenObj.EmpId,EmpName:decodedConfirmationTokenObj.EmpName,emailConfirmationErr:err});
                                      } 
                                        
                                      else
                                      {
                                           setTimeout(()=>{
                                            res.json({ emailConfirmed:true,EmpId:decodedConfirmationTokenObj.EmpId,EmpName:decodedConfirmationTokenObj.EmpName,emailConfirmationErr:null});                                  
                                          },1000);                                         
                                          global.ioMsgSocket.emit("emailConfirmed",{ emailConfirmed:true,EmpId:decodedConfirmationTokenObj.EmpId,EmpName:decodedConfirmationTokenObj.EmpName,emailConfirmationErr:null});
                                      }                                         
                                  })
          }
          else
          {                                                   
            res.status(400).json({ emailConfirmed:false,EmpId:decodedConfirmationTokenObj.EmpId,EmpName:decodedConfirmationTokenObj.EmpName,emailConfirmationError:"No Records in database"});
            global.ioMsgSocket.emit("emailConfirmed",{ emailConfirmed:false,EmpId:decodedConfirmationTokenObj.EmpId,EmpName:decodedConfirmationTokenObj.EmpName,emailConfirmationErr:"No Records In database"});
          }
    });//**********   end empModel.countDocuments ***************  //
  }//******************end mongoose.connection.readyState if************************** */
  else
  {//*********************start mongoose.connection.readyState else************************ */    
    res.status(400).json({ emailConfirmed:false,EmpId:decodedConfirmationTokenObj.EmpId,EmpName:decodedConfirmationTokenObj.EmpName,emailConfirmationError:"Unable to Connect to Mongodb"});
  }//*********************end mongoose.connection.readyState else************************ */
}

export default empConfirmedEmailRouter;
