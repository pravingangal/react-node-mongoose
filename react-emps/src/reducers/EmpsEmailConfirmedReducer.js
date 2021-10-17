import {
  EMP_EMAIL_CONFIRMED,
  EMP_EMAIL_CONFIRMATION_ERR
} from "../utilities/Types";
const initState = {    
  empEmailConfirmed:false,
  empIdOfConfirmedEmail:null,
  empNameOfConfirmedEmail:null,
  empEmailConfirmationErr:null  
};
const empsEmailConfirmedReducer = (state = initState, action = {}) => {  
  const newState = { ...state };   
  switch (action.type) {
    case   EMP_EMAIL_CONFIRMED:      
      if (action.dataLoad) {                  
        return {
          ...state,                  
          empEmailConfirmed:action.dataLoad.emailConfirmed,          
          empIdOfConfirmedEmail:action.dataLoad.EmpId,
          empNameOfConfirmedEmail: action.dataLoad.EmpName,
          empEmailConfirmationErr:action.dataLoad.emailConfirmationErr          
        };
      }
      break;
    case   EMP_EMAIL_CONFIRMATION_ERR:
      if (action.errLoad) {
      return {
        ...state,        
        empEmailConfirmed:false,         
        empIdOfConfirmedEmail:action.errLoad.EmpId,
        empNameOfConfirmedEmail:action.errLoad.EmpName,
        empEmailConfirmationErr:action.errLoad.emailConfirmationError  
      };
    }
    break;
    default:
      return newState;
  }
};

export default empsEmailConfirmedReducer;
