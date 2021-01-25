import {
  EMP_LOGGED_IN_SEND_EMAIL,
  EMP_LOGGED_SEND_EMAIL_ERR,
  EMP_LOGGED_OUT,
} from "../utilities/Types";
const initState = {  
  emailSentArr:[],
  empEmailErrors:null,
  empEmailsLoading:false
};
const EmpsLoginEmailReducer = (state = initState, action = {}) => {
  const newState = { ...state }; 
  switch (action.type) {   
    case   EMP_LOGGED_IN_SEND_EMAIL:    
      if (action.dataLoad) {       
        return {
          ...state,                  
          emailSentArr:action.dataLoad,          
          empEmailErrors:null ,
          empEmailsLoading:!state.empEmailsLoading              
        };
      }
      break;
    case EMP_LOGGED_SEND_EMAIL_ERR:     
      if (action.errLoad) {
      return {
        ...state,        
          emailSentArr:[],          
          empEmailErrors:action.errLoad.empsError  ,
          empEmailsLoading:!state.empEmailsLoading
      };
    }
    break;
    case EMP_LOGGED_OUT:
      return { 
        ...state,         
            emailSentArr:[],
            empEmailErrors:null,
            empEmailsLoading:!state.empEmailsLoading
      }      
    default:
      return newState;
  }
};
export default EmpsLoginEmailReducer;
