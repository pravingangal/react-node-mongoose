import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";


function getEmp_Confirmation_Token(valObj,emailKey) {
    return jwt.sign(
      {
        email: valObj[emailKey],
        confirmed: false,
        emailSent: true,
      },  
      process.env.JSONWT_SEC_KEY,
      {
        expiresIn:"1h"
      }
    );
  };
  

async function transportEmpEmail(valObj,emailKey){

  
  const toEmp=valObj[emailKey]; 
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

  const confirmationToken=getEmp_Confirmation_Token(valObj,emailKey); 
  const empMailOptions = {
    from,
    to: toEmp,
    subject: "Welcome..!!!",
    text: `Welcome to Corp. Pl confirm yr email....
    URL : http://localhost:3000/confirm/${confirmationToken}`,
    html: "",
  };



  return new Promise((resolve, reject) => {
                                              emailTransport.sendMail(empMailOptions, (err, info) => {

                                                if (err) {                                                                                                   
                                                  newValObj["emailErr"]=err.errno + "-"+ err.code;
                                                  newValObj["emailInfo"]=null;
                                                  newValObj["emailSent"]=false;
                                                  newValObj["emailConfirmed"]=false;  
                                                  newValObj["confirmationToken"]=null;                                               
                                                  resolve(newValObj);
                                                } else {   
                                                  newValObj["emailErr"]=null;
                                                  newValObj["emailInfo"]=info.response;
                                                  newValObj["emailSent"]=true;
                                                  newValObj["emailConfirmed"]=false;  
                                                  newValObj["confirmationToken"]= confirmationToken                                                                                          
                                                  resolve(newValObj);
                                                }
                                              });
                                        }
                    );
}


export default transportEmpEmail;
