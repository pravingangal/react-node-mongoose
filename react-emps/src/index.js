import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import decode from "jwt-decode";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "jquery/dist/jquery";
import "bootstrap/dist/js/bootstrap"
import "font-awesome/css/font-awesome.min.css";
import {empLoggedIn} from "./actions/EmpLoginAction";

if (localStorage.refreshJWToken) {  
  const tokenLoad = decode(localStorage.refreshJWToken); 
  if(tokenLoad.SUPER_ADMIN)
  {
    tokenLoad.emps=[];
    tokenLoad.refreshToken=localStorage.refreshJWToken;
  }
  else
  {     
      tokenLoad.emps= {...tokenLoad};
      tokenLoad.refreshToken=localStorage.refreshJWToken;          
  }
  store.dispatch(empLoggedIn({...tokenLoad})); 
}
else
 {
   
 }

ReactDOM.render(
   <Provider store={store}>     
      <App />
    </Provider>  
  ,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
serviceWorker.register();
