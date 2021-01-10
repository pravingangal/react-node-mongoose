import nodemailer from "nodemailer";
import transportEmpEmail from "./transportEmpEmail";


async function empMailer(empLoginSendEmailData) {

    

  const emailArr= empLoginSendEmailData.map(async empValObj=>{
    const response=await transportEmpEmail(empValObj,"Email");
    return response;
  }
    );

    return await Promise.all(emailArr);   
  
}

export default empMailer;
