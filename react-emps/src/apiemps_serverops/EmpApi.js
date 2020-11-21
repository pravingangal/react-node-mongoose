import axios from "axios";

export const EmpApi = {
  emps: {
    Login: (empLoginData) => {     
      return axios.post(
        "http://localhost:4000/empApi/empLoggedIn",
        empLoginData
      );
    },
  },
};
