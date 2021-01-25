import {
  EMP_LOGGED_IN,
  EMP_LOGGED_OUT,
  EMP_LOGGED_ERR,
  EMP_LOGGED_IN_SEND_EMAIL,
  EMP_LOGGED_SEND_EMAIL_ERR
} from "../utilities/Types";
import { EmpApi } from "../apiemps_serverops/EmpApi";

export const empLoggedIn = (emps) => {
  return {
    type: EMP_LOGGED_IN,    
    dataLoad: emps,
  };
};
export const empLoggedInSendEmail = (empsEmails) => {
  return {
    type: EMP_LOGGED_IN_SEND_EMAIL,    
    dataLoad: empsEmails,
  };
};
export const empLoggedOut = () => ({
  type: EMP_LOGGED_OUT,
});
export const empLoggedErr = (err) => { 
  return { type: EMP_LOGGED_ERR,   
    errLoad: err 
  };
};
export const empLoggedInSendEmailErr = (err) => { 
  return { type: EMP_LOGGED_SEND_EMAIL_ERR,   
    errLoad: err 
  };
};
export const empLoginAction = (empLoginData) => { 
  return (dispatch) => {
    EmpApi.emps	
      .Login(empLoginData)
      .then((res) => {             
        localStorage.refreshJWToken = res.data.refreshToken;       
        dispatch(empLoggedIn(res.data));        
      })
      .catch((e) => {
        if(e.response)
        {         
        dispatch(empLoggedErr(e.response.data));
        }        
      });
  };
};
export const empLoginSendEmailAction = (empLoginSendEmailData) => { 
  return (dispatch) => {
    EmpApi.emps.loggedInSendEmail(empLoginSendEmailData).then((res) => {             
        dispatch(empLoggedInSendEmail(res.data));        
      }).catch((e) => {
        if(e.response)
        {                 
			dispatch(empLoggedInSendEmailErr(e.response.data));
        }        
      });
  }
  };
export const empLogoutAction = () => (dispatch) => { 
   localStorage.removeItem("refreshJWToken");  
  dispatch(empLoggedOut());
};
