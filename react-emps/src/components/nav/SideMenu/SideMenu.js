import React, { useEffect, forwardRef, useState } from "react";
import classesSideMenu from './SideMenu.module.css';
import ScreenCover from "../../../utilities/ScreenCover/ScreenCover";


const SideMenu =
     React.memo(
         forwardRef((props ,ref) => {
             let sideNavClasses = [classesSideMenu.SideMenu, props.showSideMenu ? classesSideMenu.Show : classesSideMenu.Hide];                      
            
             const [showScreenCover, setShowScreenCover] = useState(true);

             useEffect(() => {
            console.log("sidemenu");         
    },  []
      );
              useEffect(() => {
                                    
                   const windowSizeChanged = () => {
                                                        if (window.innerWidth >= 500) {
                                                            setShowScreenCover(prev => false);                     
                                                        }
                                                        else {
                                                            setShowScreenCover(prev => true);                      
                                                        }
                                                        
                                                    }


                  window.addEventListener("resize", windowSizeChanged);

                  return () => {

                      window.removeEventListener("resize", windowSizeChanged);
                  
                  }
             },[]);
             
    return (
        <React.Fragment>
            <ScreenCover displayScreenCover={props.showSideMenu  && showScreenCover} onClick={props.closeSideMenu}  />
            <div className={sideNavClasses.join(" ")} >                
                {<div >{props.sideMenuNavItems}</div>}                
            </div>
            
        </React.Fragment>
    );
         },
          (prevProps, nextProps) => {
             if (nextProps.showSideMenu===prevProps.showSideMenu)
                 return true;  //no rerender
              else                  
                 return false; //rerender
   
          }
    )
  );

export default SideMenu;
