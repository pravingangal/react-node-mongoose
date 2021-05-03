
import {EMP_EMAIL_CONFIRMED, EMP_EMAIL_CONFIRMATION_ERR} from "../utilities/Types";
import { EmpApi } from "../apiemps_serverops/EmpApi";

    
  export const empConfirmedEmail = (emps) => {  
    return {
      type:   EMP_EMAIL_CONFIRMED,    
      dataLoad: emps,
    };
  }; 

  export const empConfirmedEmailErr = (err) => { 
    return { type: EMP_EMAIL_CONFIRMATION_ERR,   
      errLoad: err 
    };
  };  

  export const empConfirmEmailAction = (empConfirmEmailData) => {
    return (dispatch) => {

      const confirmationToken={confirmationToken:empConfirmEmailData};
     
      EmpApi.emps.empConfirmedEmail(confirmationToken)
       .then((res) => {                  
                        dispatch(empConfirmedEmail(res.data));                              
         }).catch((e) => {          
           if(e.response)
           {                  
              dispatch(empConfirmedEmailErr(e.response.data));          
           }        
         });
    }
    };
