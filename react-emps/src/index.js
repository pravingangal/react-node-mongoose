import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store/store";
import decode from "jwt-decode";
import UserSession from "./utilities/UserSession/UserSession";
import App from "./App";
import {empLoggedIn} from "./actions/EmpLoginAction";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "jquery/dist/jquery";
import "bootstrap/dist/js/bootstrap"
import "font-awesome/css/font-awesome.min.css";

if (UserSession.getSessionVar("refreshJWToken")) {  
  const tokenLoad = decode(UserSession.getSessionVar("refreshJWToken"));   
  if(tokenLoad.SUPER_ADMIN)
  {
    tokenLoad.emps=[];
    tokenLoad.refreshToken = UserSession.getSessionVar("refreshJWToken");
  }
  else
  {     
      tokenLoad.emps= {...tokenLoad};
    tokenLoad.refreshToken = UserSession.getSessionVar("refreshJWToken");
  }
  store.dispatch(empLoggedIn({...tokenLoad})); 
}
else
 {
   
 }

 const app = (
   <Router>
     <Provider store={store}>
       <App />
    </Provider>        
    </Router>
 );

 ReactDOM.render(       
  app,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
serviceWorker.register();
