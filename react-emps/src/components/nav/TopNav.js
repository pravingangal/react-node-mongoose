import React, { useState, useEffect, useRef, useCallback } from "react";
import { NavLink } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {empLogoutAction} from "../../actions/EmpLoginAction";
import decode from "jwt-decode";
import UserSession from "../../utilities/UserSession/UserSession";
import classesTopNav from "./TopNav.module.css";
import classesPopulateNav from "../nav/PopulateNav/PopulateNav.module.css";
import classesSideMenu from "./SideMenu/SideMenu.module.css";
import SideMenuShowHideIcon from "./SideMenu/SideMenuShowHide/SideMenuShowHideIcon";
import SideMenu from "../../components/nav/SideMenu/SideMenu";
import PopulateNav from "./PopulateNav/PopulateNav";
import { withRouter, useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";


const initSideNavElems = (topNavRefVals, refSideNav, navItemClicked) =>
{   
  return [].concat(topNavRefVals) 
    .map(navItem => {
      const NAVLINK = (<NavLink
        to={navItem.current.title}
        exact
        id={"link_" + navItem.current.id}
        key={navItem.current.id }
          >
            {navItem.current.innerText}
      </NavLink>);
     
      const showItem = (/showItem/).test(navItem.current.className);
      const hideItem = (/hideItem/).test(navItem.current.className);
      const activeItem = (/active/).test(navItem.current.className);
      const sideNavClasses = [showItem ? classesSideMenu.showSideNavItem : "", hideItem ? classesSideMenu.hideSideNavItem : "", activeItem ? classesSideMenu.activeSideNavItem : ""];
      
      return (
        <span id={navItem.current.id} key={navItem.current.id} type={navItem.current.type}          
          className={sideNavClasses.join(" ")}
          onClick={(event) => navItemClicked(event, navItem.current.id, navItem.current.type, "sideNavItem")}
          ref={refSideNav[navItem.current.id]}>
                      {NAVLINK}
                  </span>
            );
    })
    .reduce((prevElem, currElem) =>
    { return prevElem.concat(currElem); }, []);
     
}

const TopNav =
  (props) => {
     
    const { refreshToken, empLogoutAction, empEmailConfirmed, emailVerifyingEmpName, navItemsData } = props;
    const [showSideMenu, setShowSideMenu] = useState(false);
    const prevActiveNavItemObj = useRef(null);
    const logoutActiveNavItemObj = useRef(null);
    const loginActiveNavItemObj = useRef(null);
    const displayActiveNavItemObj = useRef(null);
    const [refTopNav, setRefTopNav] = useState([]);
    const [refSideNav, setRefSideNav] = useState([]);
    const [sideNavElems, setSideNavElems] = useState([]);  
    const CURRENT_ROUTE = useRouteMatch("/confirm/:token");
    const [currRouteToken, setCurrRouteToken] = useState(false);
    const [currRouteTokenErr, setCurrRouteTokenErr] = useState(false);
    
    useEffect(() => {
      setRefTopNav([...Array(navItemsData.length).fill(0).map((_, index) => React.createRef())]);
      setRefSideNav([...Array(navItemsData.length).fill(0).map((_, index) => React.createRef())]);
    }, [navItemsData]);

     const _userLoggedInSetTopSideNav = useCallback((tokenLoad) => {
        
       if (prevActiveNavItemObj && prevActiveNavItemObj.current) {

         refTopNav[prevActiveNavItemObj.current.id].current.classList.remove(classesPopulateNav.active);
         refTopNav[logoutActiveNavItemObj.current.id].current.classList.remove(classesPopulateNav.hideItem);
         refTopNav[logoutActiveNavItemObj.current.id].current.classList.add(classesPopulateNav.showItem);
         refTopNav[logoutActiveNavItemObj.current.id].current.classList.add(classesPopulateNav.active);
          
         refTopNav[loginActiveNavItemObj.current.id].current.classList.remove(classesPopulateNav.showItem);
         refTopNav[loginActiveNavItemObj.current.id].current.classList.remove(classesPopulateNav.active);
         refTopNav[loginActiveNavItemObj.current.id].current.classList.add(classesPopulateNav.hideItem);         
          
         refTopNav[displayActiveNavItemObj.current.id].current.classList.remove(classesPopulateNav.hideItem);
         refTopNav[displayActiveNavItemObj.current.id].current.classList.add(classesPopulateNav.showItem);
         refTopNav[displayActiveNavItemObj.current.id].current.innerText = "Welcome " + tokenLoad;
          
         refSideNav[prevActiveNavItemObj.current.id].current.classList = "";
         refSideNav[logoutActiveNavItemObj.current.id].current.classList.remove(classesSideMenu.hideSideNavItem);
         refSideNav[logoutActiveNavItemObj.current.id].current.classList.add(classesSideMenu.showSideNavItem);         
         refSideNav[logoutActiveNavItemObj.current.id].current.classList.add(classesSideMenu.activeSideNavItem);  
         refSideNav[loginActiveNavItemObj.current.id].current.classList.remove(classesSideMenu.showSideNavItem);
         refSideNav[loginActiveNavItemObj.current.id].current.classList.remove(classesSideMenu.activeSideNavItem);
         refSideNav[loginActiveNavItemObj.current.id].current.classList.add(classesSideMenu.hideSideNavItem);
         
         refSideNav[displayActiveNavItemObj.current.id].current.classList.remove(classesSideMenu.hideSideNavItem);
         refSideNav[displayActiveNavItemObj.current.id].current.classList.add(classesSideMenu.showSideNavItem);
         refSideNav[displayActiveNavItemObj.current.id].current.innerText = "Welcome " + tokenLoad;

         prevActiveNavItemObj.current = { id: logoutActiveNavItemObj.current.id, type: logoutActiveNavItemObj.current.type };
       }
        
      }, [refSideNav, refTopNav]);

     
    useEffect(() => {
        
      if (refreshToken) {

        const tokenLoad = refreshToken ? (
        decode(refreshToken).SUPER_ADMIN ?
          " SUPER_ADMIN" : decode(refreshToken).name
      ) : null;
        
        _userLoggedInSetTopSideNav(tokenLoad);
      }
         
    }, [refreshToken, _userLoggedInSetTopSideNav]);
  
    useEffect(() => {     
      if (!!CURRENT_ROUTE) {
        try {
          const ROUTE_TOKEN = decode(CURRENT_ROUTE.params.token);      
          if (ROUTE_TOKEN)
            setCurrRouteToken(prev => true);
        }
        catch (err) {
          setCurrRouteTokenErr(prev => true);
          UserSession.setSessionVar("emailToken", "Invalid");
          props.history.replace({pathname: "/invalidToken",search:UserSession.getSessionVar("emailToken"), opener:null});                
        }
              
      }
     
    }, [CURRENT_ROUTE,props.history]);
   
    const _setTopAndSideMenuConfig = (event, navItemId, itemType, navType) => {
        
      switch (itemType) {
        case "display": return true;

        case "item":
        
          refTopNav[prevActiveNavItemObj.current.id].current.classList.remove(classesPopulateNav.active);            
          refTopNav[navItemId].current.classList.add(classesPopulateNav.active);
            
          refSideNav[prevActiveNavItemObj.current.id].current.classList = "";
          refSideNav[navItemId].current.classList.add(classesSideMenu.activeSideNavItem);
            
          break;
                          
        case "login":          
        
          refTopNav[prevActiveNavItemObj.current.id].current.classList.remove(classesPopulateNav.active);
          refTopNav[loginActiveNavItemObj.current.id].current.classList.add(classesPopulateNav.active);

          refSideNav[prevActiveNavItemObj.current.id].current.classList = "";
          refSideNav[navItemId].current.classList.add(classesSideMenu.activeSideNavItem);
                              
          break;
                          
        case "logout":
            
          refTopNav[prevActiveNavItemObj.current.id].current.classList.remove(classesPopulateNav.active);           
          refTopNav[logoutActiveNavItemObj.current.id].current.classList.remove(classesPopulateNav.showItem);
          refTopNav[logoutActiveNavItemObj.current.id].current.classList.add(classesPopulateNav.hideItem);
          
          refTopNav[loginActiveNavItemObj.current.id].current.classList.remove(classesPopulateNav.hideItem);
          refTopNav[loginActiveNavItemObj.current.id].current.classList.add(classesPopulateNav.showItem);
          refTopNav[loginActiveNavItemObj.current.id].current.classList.add(classesPopulateNav.active);
          
          refTopNav[displayActiveNavItemObj.current.id].current.classList.remove(classesPopulateNav.showItem);
          refTopNav[displayActiveNavItemObj.current.id].current.classList.add(classesPopulateNav.hideItem);
          
          refSideNav[prevActiveNavItemObj.current.id].current.classList = "";
          refSideNav[logoutActiveNavItemObj.current.id].current.classList.remove(classesSideMenu.showSideNavItem);
          refSideNav[logoutActiveNavItemObj.current.id].current.classList.add(classesSideMenu.hideSideNavItem);
          refSideNav[loginActiveNavItemObj.current.id].current.classList.remove(classesSideMenu.hideSideNavItem);
          refSideNav[loginActiveNavItemObj.current.id].current.classList.add(classesSideMenu.showSideNavItem);
          refSideNav[loginActiveNavItemObj.current.id].current.classList.add(classesSideMenu.activeSideNavItem);
          refSideNav[displayActiveNavItemObj.current.id].current.classList.remove(classesSideMenu.showSideNavItem);
          refSideNav[displayActiveNavItemObj.current.id].current.classList.add(classesSideMenu.hideSideNavItem);
                                            
          break;
                        
        default:
          break;
      }
                     
      if (itemType === "logout") {
        prevActiveNavItemObj.current = { id: loginActiveNavItemObj.current.id, type: loginActiveNavItemObj.current.type };
        empLogoutAction();
      }
      else {
        prevActiveNavItemObj.current = { id: navItemId, type: itemType }
      }
    }
    const navItemClicked = (event, navItemId, itemType, navType = "topNavItem") => {      
      _setTopAndSideMenuConfig(event, navItemId, itemType, navType);       
    }
    const closeSideMenuHandler = () => {
      setShowSideMenu(prevState => false);
    }

    const showHideSideMenuHandler = () => {
      setShowSideMenu(prevState => !prevState);
    }
    const initNavData = (loginNavItemObj, logoutNavItemObj, displayNavItemObj) => {
      if (!!!refreshToken)
        prevActiveNavItemObj.current = { ...loginNavItemObj };
      else
        prevActiveNavItemObj.current = { ...logoutNavItemObj };
        
      loginActiveNavItemObj.current = { ...loginNavItemObj };
      logoutActiveNavItemObj.current = { ...logoutNavItemObj };
      displayActiveNavItemObj.current = { ...displayNavItemObj };

      if (refTopNav.length > 0) {        
        setSideNavElems(prev => [...initSideNavElems(refTopNav, refSideNav, navItemClicked)])
      }
    }
    const clsWindow = () => {
      window.close();
      window.open("/", "_self", "");      
    }

      
    return (
      <React.Fragment>      
        {
         currRouteToken===true || currRouteTokenErr===true?
          
            (
                
              <nav className={classesTopNav.navbar + " " + classesTopNav.fixedHeader}  >
                <div className={"navbar-text navbar-right   "} >
                  <h5 className={"left navbar-brand" + classesTopNav.left} style={{ top: "5px", height: "30px", marginLeft: "5px" }}>Logo..</h5>
                </div>

                <div style={{ width: "100%" }}>
                  <span className={"navbar-link  " + classesTopNav.spanEmailVerifyingEmp} >                    
                    {emailVerifyingEmpName}
                    {empEmailConfirmed ? "Email Confirmed" : "Email Not Confirmed"}
                    &nbsp;&nbsp;&nbsp;
                  </span>
                  <span className={classesTopNav.spanEmailVerifyingEmp}><button id="cls" name="cls" onClick={clsWindow}>Close</button>
                    &nbsp;&nbsp;&nbsp;
                  </span>
                </div>
              </nav>
                  
            ) :
            (
              <nav className={"navbar " + classesTopNav.navbar + " " + classesTopNav.fixedHeader} style={empEmailConfirmed ? { display: "none" } : { display: "flex" }} >

                <SideMenuShowHideIcon clicked={showHideSideMenuHandler} showSideMenu={showSideMenu} />
                <h5 className={"left navbar-brand"}>Logo..</h5>

                <ul className={classesTopNav.NavigationItems + " " + classesTopNav.right + " " + classesTopNav.showNav} >
                  < PopulateNav topNavItemClicked={navItemClicked} navItemsData={navItemsData} initNavData={initNavData}
                    refreshToken={refreshToken}
                    ref={refTopNav} />
                </ul>
              </nav>
            )
                
        }
          
        <SideMenu
          showSideMenu={showSideMenu}
          closeSideMenu={closeSideMenuHandler}
          sideMenuNavItems={sideNavElems}
          sideNavItemClicked={navItemClicked}
          ref={refSideNav}
        />
      </React.Fragment>
        
    );
  };
TopNav.propTypes = {  
  refreshToken:PropTypes.string.isRequired,
  empLogoutAction: PropTypes.func.isRequired,  
};
function mapStateToProps(state) {   
  return {
    refreshToken: state.EmpsLoginReducer.refreshToken,
    empEmailConfirmed: state.EmpsEmailConfirmedReducer.empEmailConfirmed
  };
}
function mapDispatchToProps(dispatch) {
  return {
    empLogoutAction: bindActionCreators(empLogoutAction, dispatch),
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(TopNav));
