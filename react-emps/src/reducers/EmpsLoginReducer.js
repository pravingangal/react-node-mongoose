import {
  EMP_LOGGED_IN,
  EMP_LOGGED_OUT,
  EMP_LOGGED_ERR,
} from "../utilities/Types";
const initState = {  
  empsArr: [],
  loading: true,
  empLoginErrors: [],  
  role:"",
  refreshToken:"",
  empValidated:false,
  SUPER_ADMIN:false,
};
const empsLoginReducer = (state = initState, action = {}) => {
const newState = { ...state };
 
  switch (action.type) {
    case EMP_LOGGED_IN:      
      if (action.dataLoad) {       
        return {
          ...state,                  
          empsArr:action.dataLoad.emps,
          loading: false,
          empLoginErrors: [],        
          role:action.dataLoad.role,         
          refreshToken:action.dataLoad.refreshToken,
          empValidated:true ,         
          SUPER_ADMIN:action.dataLoad.SUPER_ADMIN
        };
      }
      break;
    case EMP_LOGGED_OUT:      
      return {
        ...state,        
        empsArr: [],
        loading: true,
        empLoginErrors: [],       
        role:"",
        refreshToken:"",
        empValidated:false,
        SUPER_ADMIN:false
      };
    case EMP_LOGGED_ERR:
      return {
        ...state,        
        empsArr: [],
        loading: false,      
        empLoginErrors: action.errLoad,
        role:"",
        refreshToken:"",
        empValidated:false,
        SUPER_ADMIN:false
      };
    default:
      return newState;
  }
};
export default empsLoginReducer;
