import React, { Component } from "react";
import { BrowserRouter as Router, Route ,  Switch } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import LoginPage from "./components/emplogin/LoginPage";
import TopNav from "./components/nav/TopNav";
import EmpLoggedinRoute from "./routes/EmpLoggedinRoute";
import EmpNotLoggedinRoute from "./routes/EmpNotLoggedinRoute";
import DashboardPage from "./components/dashboard/DashboardPage";
import UploadXlsToDBase from "./uploadxls_todb/UploadXlsToDBase";
import Footer from "./components/footer/Footer";
import NotFoundPage from "./notfound/NotFoundPage";
import EmpConfirmationPage from "./components/empconfirmation/EmpConfirmationPage";
import "./App.css";

class App extends Component {
  constructor(props) {    
    super();        
  }
 
  render() {
    const { history } = this.props; 
    return (
      <div className="container-fluid" >
         <TopNav    />       
           <Router >
           <Switch>

           <EmpNotLoggedinRoute   
                location={this.props.location}
                history={history}   
                path="/"
                exact
                component={HomePage}
            /> 

              <EmpLoggedinRoute   
              location={this.props.location}
              history={history}   
              path="/dashboard"
              exact
              component={DashboardPage}
              /> 

            <EmpNotLoggedinRoute   
                location={this.props.location}
                history={history}   
                path="/login"
                exact
                component={LoginPage}
            /> 

              <EmpLoggedinRoute   
                location={this.props.location}
                history={history}   
                path="/upload"
                exact
                component={UploadXlsToDBase}
            /> 

            <Route   
                location={this.props.location}
                history={history}   
                path="/confirm/:token"
                exact
                component={EmpConfirmationPage}
            />        

             <Route component={NotFoundPage} />

             </Switch> 
       </Router>
       <Footer />
      </div>
    );
  }
}

export default App;
