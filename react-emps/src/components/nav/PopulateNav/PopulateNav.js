import React, { useRef, useEffect, useState, useCallback, forwardRef } from "react";
import classes from './PopulateNav.module.css';
import { NavLink } from 'react-router-dom';
import decode from "jwt-decode";
        
const PopulateNav =
  forwardRef(({ topNavItemClicked, navItemsData, initNavData, refreshToken }, ref) => {
      
    const [forceState, updateForceState] = useState();
    const forceReRender = useCallback(() => updateForceState({}), []);  
    const navListData = useRef([]);
    const loginNavItemObj = useRef(null);
    const logoutNavItemObj = useRef(null);
    const displayNavItemObj = useRef(null);     
    const loadNavList = useCallback(async => {
        
       const tokenLoad = refreshToken ? (
        decode(refreshToken).SUPER_ADMIN ?
          " SUPER_ADMIN" : decode(refreshToken).name
      ) : null;
        
        const getLiNavElem = navItem => {

          const navItemText = navItem._id === "Welcome" ? (!tokenLoad ? navItem.itemText : navItem.itemText + tokenLoad): (navItem.itemText);
                    
          const NAVLINK = (<NavLink
            to={navItem.link}
            exact            
            activeClassName={classes.active}
            id={"link_" + navItem.itemId}
          >
            {navItemText}
            </NavLink>);
            
          switch (navItem._id) {
            case "Welcome":
              displayNavItemObj.current = { id:navItem.itemId, type:navItem.type};  
              return (<li className={!!!refreshToken?[classes.displayText, classes.hideItem].join(" "):[classes.displayText, classes.showItem].join(" ")}
              key={navItem.itemId}
              onClick={(event) => topNavItemClicked(event, navItem.itemId, navItem.type)}
              id={navItem.itemId}
              title={navItem.link}
              type={navItem.type}             
              ref={ref[navItem.itemId]}>
              {NAVLINK}
            </li>);
            case "Aboutus":              
            case "Contact": return (<li className={classes.NavigationItem}
              key={navItem.itemId}
              onClick={(event) => topNavItemClicked(event, navItem.itemId, navItem.type)}
              id={navItem.itemId}
              title={navItem.link}
              type={navItem.type}              
              ref={ref[navItem.itemId]}>
              {NAVLINK}
            </li>);
            case "Login":
              loginNavItemObj.current = { id:navItem.itemId, type:navItem.type};
              return (<li className={!!!refreshToken?[classes.NavigationItem, classes.borderRight, classes.active, classes.showItem].join(" "):[classes.NavigationItem, classes.borderRight, classes.hideItem].join(" ")}
              key={navItem.itemId}
              onClick={(event) => topNavItemClicked(event, navItem.itemId, navItem.type)}
              id={navItem.itemId}
              title={navItem.link}
              type={navItem.type}              
              ref={ref[navItem.itemId]}>
              {NAVLINK}
            </li>);
            case "Logout":
              logoutNavItemObj.current = { id:navItem.itemId, type:navItem.type};
              return (<li className={!!!refreshToken?[classes.NavigationItem, classes.borderRight, classes.hideItem].join(" "):[classes.NavigationItem, classes.borderRight, classes.active, classes.showItem].join(" ")}
              key={navItem.itemId}
              onClick={(event) => topNavItemClicked(event, navItem.itemId, navItem.type)}
              id={navItem.itemId}
              title={navItem.link}
              type={navItem.type}              
              ref={ref[navItem.itemId]}>
              {NAVLINK}
            </li>);
            default: break;
          };
        }
        
      const liNavElem = async item => {
        return await getLiNavElem(item);
        }        
        const pendingLiPromises = navItemsData.map(item =>liNavElem(item));                
        const resultantNavList =  Promise.all(pendingLiPromises);
        resultantNavList.then(response => {         
          if (response.length > 0 && !!!forceState)
          {            
              navListData.current = [...response];                        
            forceReRender();
             if (!!loginNavItemObj.current && !!logoutNavItemObj.current && !!displayNavItemObj.current) {                 
                    initNavData(loginNavItemObj.current, logoutNavItemObj.current, displayNavItemObj.current)
         }
            
          }
           
        }).catch(e => console.log("Error populating top nav...", e));
        
      }, [navItemsData, topNavItemClicked, forceReRender, forceState, refreshToken, ref, initNavData]);

      useEffect(() => {       
          if(navListData.current.length===0 && ref.length>0)
            loadNavList();
         },           
           [loadNavList,ref]
      );
      return (navListData.current);
}
);

export default PopulateNav;
