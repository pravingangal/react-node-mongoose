import axios from '../axios-inst';

const empApi = {
  emps: {
    Login: (empLoginData) => {     
      return axios.post(      
        "/empApi/empLoggedIn",
        empLoginData
      );
    },
    loggedInSendEmail:(empLoginSendEmailData)=>{
      return axios.post(       
        "/empApi/empLoggedInSendEmail",
        empLoginSendEmailData
      );
    },
    empConfirmedEmail:(empConfirmEmailData)=>{
      return axios.post(        
        "/empApi/empConfirmedEmail",
        empConfirmEmailData
      );
    }
  },
 
};

export default empApi;
