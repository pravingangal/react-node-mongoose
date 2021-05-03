import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import fs from "fs";
import ejs from "ejs";
import empModel from "../empModel/empModel";

function getEmp_Confirmation_Token(valObj) {
    return jwt.sign(
      {
        email: valObj["Email"],
        EmpId:valObj["EmpId"],
        EmpName:valObj["EmpName"],
        confirmed: false,
        emailSent: true,
      },  
      process.env.JSONWT_SEC_KEY,
      {
        expiresIn:"1h"
      }
    );
  };


  async function updateDBase(emailRecord)
  {
      const queryId={id:emailRecord.EmpId};
      const updateValues={$set:{emailErr:emailRecord.emailErr,
                          emailInfo:emailRecord.emailInfo,
                          emailSent:emailRecord.emailSent,
                          emailConfirmed:emailRecord.emailConfirmed,
                          confirmationToken:emailRecord.confirmationToken}
                        }; 
                        
     
        await empModel.updateOne(queryId,updateValues,(err,res)=>
        {
            if(err) 
              return(err)
            else 
              return(res);
        })
     
  }
  
  async function transportEmpEmail(valObj){
    
  const toEmp=valObj["Email"]; 
  const from = process.env.MAILER_FROM;
  const newValObj=Object.assign({},valObj);  
  
  const emailTransport = nodemailer.createTransport({    
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    secure: false, 
    auth: {
      user: process.env.MAILER_UID,
      pass: process.env.MAILER_PWD,
    },
    
  });

  const confirmationToken=getEmp_Confirmation_Token(valObj);  
  const empMailOptions = {
    from,
    to: toEmp,
    subject: "Welcome..!!!",   
    html: "",
    attachments:[{filename:"welcome.jpg",path:"templates/welcome.jpg",cid:"welcome"}]
  };

  return new Promise((resolve, reject) => 
  {

    fs.readFile("templates/emp-welcome-email.ejs","utf8",function(fserr,emailEJS){
      if(fserr)
      {
                                                  newValObj["emailErr"]="File err";
                                                  newValObj["emailInfo"]=null;
                                                  newValObj["emailSent"]=false;
                                                  newValObj["emailConfirmed"]=false;  
                                                  newValObj["confirmationToken"]=null;
                                                  const updateRes =  updateDBase(newValObj);
                                                                                                                                           
                                                  resolve(newValObj);
      }
      else //**************start main else */
      {
        let ejsErrFlag=false;
       try{
            empMailOptions.html=ejs.render(emailEJS,{empName:valObj["EmpName"],confirmationToken:confirmationToken});
          }
       catch(ejsHtmlErr)
          {
            ejsErrFlag=true;
          }
                        if(!ejsErrFlag)
                              {                                
                                    emailTransport.sendMail(empMailOptions, (err, info) => {
                                     
                                                  if (err) {                                                                                                   
                                                    newValObj["emailErr"]=err.errno + "-"+ err.code;
                                                    newValObj["emailInfo"]=null;
                                                    newValObj["emailSent"]=false;
                                                    newValObj["emailConfirmed"]=false;  
                                                    newValObj["confirmationToken"]=null; 
                                                    const updateRes =  updateDBase(newValObj);
                                                                                                 
                                                    resolve(newValObj);
                                                  } else {   
                                                    newValObj["emailErr"]=null;
                                                    newValObj["emailInfo"]=info.response;
                                                    newValObj["emailSent"]=true;
                                                    newValObj["emailConfirmed"]=false;  
                                                    newValObj["confirmationToken"]= confirmationToken
                                                   
                                                    const updateRes =  updateDBase(newValObj);
                                                                                                                                             
                                                    resolve(newValObj);
                                                  }
                                                });
                                }
                                else
                                {
                                  newValObj["emailErr"]="Internal Server(html template) Err..";
                                  newValObj["emailInfo"]=null;
                                  newValObj["emailSent"]=false;
                                  newValObj["emailConfirmed"]=false;  
                                  newValObj["confirmationToken"]=null; 
                                  const updateRes =  updateDBase(newValObj);                                                                               
                                  resolve(newValObj);
                                }
                         
      }//***end main else*********** */
    })
          
  }//************   return new Promise((resolve, reject)   end  */

                    );//************   return new Promise((resolve, reject)   end  */

                  
};


export default transportEmpEmail;
