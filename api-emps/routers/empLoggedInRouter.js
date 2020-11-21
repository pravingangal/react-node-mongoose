import mongoose from "mongoose";
import empModel from "../empModel/empModel";
import jwt from "jsonwebtoken";


function getSuper_JSON_WEB_TOKEN()
{

  return jwt.sign(
    {
      role:"Super",
      SUPER_ADMIN:true,           
    },   
    process.env.JSONWT_SEC_KEY
  );

}

function empLoggedInRouter(req, res) {

  const loggedInEmp = req.body;
  
  if(mongoose.connection.readyState===1)
  {//*********************start mongoose.connection.readyState if************************ */

      if(loggedInEmp.employeeId===process.env.ADMIN_UID && loggedInEmp.passWord===process.env.ADMIN_PWD)//*************************  uid and pwd admin if start*/
      {
                 

                  empModel.countDocuments({},function (err,noOfDocs){
                          if(noOfDocs>0)
                          {
                                  empModel
                                  .find({}).select("-pwdHash -confirmationToken")
                                  .then((emps) => {
                                    res.json({ emps,role:"Super",refreshToken:getSuper_JSON_WEB_TOKEN(),SUPER_ADMIN:true });
                                    
                                  })
                                  .catch((err) => {
                                   
                                    res.status(400).json({
                                      empsError: "No emps data",
                                    });
                                  });
                          }
                          else
                          {
                            const emps=[];
                            res.json({emps, SUPER_ADMIN:true,role:"Super",refreshToken:getSuper_JSON_WEB_TOKEN() });
                          }
                  }
                  );
                  
                 


      }//*************************  uid and pwd admin if end*/
      else  //*************************  uid and pwd admin else start*/
      {

                      empModel.countDocuments({},function (err,noOfDocs){//**********   start empModel.countDocuments ***************  //

                      
                        
                          if(noOfDocs>0)
                          {
                          
                            empModel
                              .findOne({ id: loggedInEmp.employeeId }).select("-_id -id -emailSent -emailConfirmed -confirmationToken -createdAt -updatedAt -__v")                              
                              .then((emps) => {
                                
                                const PWDEXISTS=emps.checkPassword(loggedInEmp.passWord);

                                if(!PWDEXISTS)
                                  res.status(400).json({empsError: "Incorrect Password",});
                                  
                                if (emps && emps.role === "User" && PWDEXISTS) {
                                 
                                  emps["pwdHash"]=null;
                                                                   
                                    res.json({ emps,role:"User",refreshToken:emps.getEmp_JSON_WEB_TOKEN(),SUPER_ADMIN:false, });                                                                      
                                   
                                } else if (emps && (emps.role === "Admin" || emps.role === "Super") && PWDEXISTS) {  
                                  const role= emps.role;
                                  const adminEmp=emps;
                                  empModel
                                    .find({}).select("-_id -pwdHash -confirmationToken -createdAt -updatedAt -__v")
                                    .then((allEmps) => {  
                                      const emps=allEmps ;                                   
                                      
                                      const tempRefreshToken=adminEmp.getAdmin_JSON_WEB_TOKEN(loggedInEmp.employeeId);
                                     
                                      res.json({ emps,role:role,refreshToken:tempRefreshToken,SUPER_ADMIN:false, });
                                      
                                    })
                                    .catch((err) => {
                                      
                                      res.status(400).json({
                                        empsError: "No emps data",
                                      });
                                    });
                                }
                                if (!emps)
                                {
                                  
                                  res.status(400).json({
                                    empsError: "Emp not found",
                                  });
                                }
                              })
                              .catch((err) => {
                                                                
                                res.status(400).json({
                                  empsError: "Emp not found",
                                });
                              });

                            }
                            else
                            {                              
                              res.status(400).json({
                                empsError: "No Records in database",
                              });
                            }

                      })//**********   end empModel.countDocuments ***************  //

        }//********    uid and pwd admin else end */

  }//******************end mongoose.connection.readyState if************************** */
  else
  {//*********************start mongoose.connection.readyState else************************ */
    
    res.status(400).json({
      empsError: "Unable to Connect to Mongodb",
    });
  }//*********************end mongoose.connection.readyState else************************ */


}

export default empLoggedInRouter;
