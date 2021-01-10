import {
  EMP_LOGGED_IN_SEND_EMAIL,
  EMP_LOGGED_SEND_EMAIL_ERR
} from "../utilities/Types";


const initState = {  
  emailSentArr:[],
  empEmailErrors:{}
};

const EmpsLoginEmailReducer = (state = initState, action = {}) => {
  const newState = { ...state };
 
  switch (action.type) {
    case   EMP_LOGGED_IN_SEND_EMAIL:
      
      if (action.dataLoad) {       
        return {
          ...state,                  
          emailSentArr:action.dataLoad,          
          empEmailErrors:{}                  
        };
      }
      break;
    case EMP_LOGGED_SEND_EMAIL_ERR:
      if (action.dataLoad) {
      return {
        ...state,        
          emailSentArr:[],          
          empEmailErrors:action.dataLoad.emps.empEmailErrors    
      };
    }
    break;
    default:
      return newState;
  }
};

export default EmpsLoginEmailReducer;
