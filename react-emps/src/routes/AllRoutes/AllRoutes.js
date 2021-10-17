import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../../components/home/HomePage";
import LoginPage from "../../components/emplogin/LoginPage";
import DashboardPage from "../../components/dashboard/DashboardPage";
import EmpConfirmationPage from "../../components/empconfirmation/EmpConfirmationPage";
import NotFoundPage from "../../notfound/NotFoundPage";
import UploadXlsToDBase from "../../uploadxls_todb/UploadXlsToDBase";
import EmpLoggedinRoute from "../EmpLoggedinRoute";
import EmpNotLoggedinRoute from "../EmpNotLoggedinRoute"
import EmpEmailConfirmRoute from "../EmpEmailConfirmRoute";
import UserSession from "../../utilities/UserSession/UserSession";


export const UserSessionContext = React.createContext();

const AllRoutes = (props) =>
{
    const [newUserSession, setNewUserSession] = useState(null);
    useEffect(
        () => {           
           setNewUserSession(prev=>UserSession.setSessionVar("userSession","NewUser"));            
        },
        []
    );

    return (
        <UserSessionContext.Provider value={newUserSession}>
         <Switch>
           <EmpNotLoggedinRoute                  
                path="/"
                exact
                component={HomePage}
            /> 
              <EmpLoggedinRoute                            
              path="/dashboard"
              exact
              component={DashboardPage}
              /> 
            <EmpNotLoggedinRoute                  
                path="/login"
                exact
                component={LoginPage}
            /> 
              <EmpLoggedinRoute                  
                path="/upload"
                exact
                component={UploadXlsToDBase}
            /> 
            <EmpEmailConfirmRoute                  
                path="/confirm/:token"
                exact           
            component={EmpConfirmationPage}
           
          />
                            
            <Route component={NotFoundPage} />
                
        </Switch>
    </UserSessionContext.Provider>
    );
}
export default AllRoutes;
