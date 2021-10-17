import mongoose from "mongoose";
import nodemailer from "nodemailer";
import empModel from "../empModel/empModel";
import empMailer from "../empMailer/empMailer";

function empLoggedinSendEmailRouter(req, res) {

  const empLoginSendEmailData = req.body;
  
  if(mongoose.connection.readyState===1)
  {//*********************start mongoose.connection.readyState if************************ */
      
    empModel.countDocuments({},function (err,noOfDocs)
    {//**********   start empModel.countDocuments ***************  //
                            
        if(noOfDocs>0)
          {                     
              empMailer(empLoginSendEmailData)
              .then((response) => {                                     
                res.status(200).send(response);         
              })
              .catch((err) => {  
                res.status(400).json({
                     empsError: "Internal Server Err..",
                 });                                       
              });                                                               
          }
          else
          {                                       
            res.status(400).json({
              empsError: "No Records in database",
            });
          }

    });//**********   end empModel.countDocuments ***************  //

  }//******************end mongoose.connection.readyState if************************** */
  else
  {//*********************start mongoose.connection.readyState else************************ */    
    res.status(400).json({
      empsError: "Unable to Connect to Mongodb...",
    });
  }//*********************end mongoose.connection.readyState else************************ */
}

export default empLoggedinSendEmailRouter;
