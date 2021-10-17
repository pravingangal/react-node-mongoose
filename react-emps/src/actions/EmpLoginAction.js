import {
  EMP_LOGGED_IN,
  EMP_LOGGED_OUT,
  EMP_LOGGED_ERR, 
} from "../utilities/Types";
import EmpApi from "../apiemps_serverops/EmpApi";
import UserSession from "../utilities/UserSession/UserSession";

export const empLoggedIn = (emps) => {
  return {
    type: EMP_LOGGED_IN,    
    dataLoad: emps,
  };
};

const empLoggedOut = () => ({
  type: EMP_LOGGED_OUT,
});

export const empLoggedErr = (err) => {
  return { type: EMP_LOGGED_ERR,   
    errLoad: err 
  };
};

export const empLoginAction = (empLoginData) => { 
  return (dispatch) => {
    EmpApi.emps	
      .Login(empLoginData)
      .then((res) => {        
                      if (res.response)
                      {                        
                        if ("empsError" in res.response.data && +res.response.status === 400) {                          
                          dispatch(empLoggedErr({ ...res.response.data }));
                        }
                                                
                      }
                      else
                      {                        
                        if (res.status === 200) {                          
                          UserSession.setSessionVar("refreshJWToken",res.data.refreshToken,false);
                          dispatch(empLoggedIn(res.data));
                        }
                        else
                        {                         
                          dispatch(empLoggedErr({empsError: "Network Error"}));
                          }
                        
                      }
                    })
      .catch((e) => {
        
                          if(e.response)
                          {         
                                dispatch(empLoggedErr(e.response.data));
                          }
                          else {
                                dispatch(empLoggedErr({empsError: "Internal Server Error"}));
                               }
                    });
  };
};

export const empLogoutAction = () => (dispatch) => { 
  UserSession.reSetSessionVar("refreshJWToken", "");
    dispatch(empLoggedOut());
};
