import React from 'react';

import classes from './SideMenuShowHideIcon.module.css';

const SideMenuShowHideIcon = (props) => {
   
     let iconClasses = [classes.outerDiv, props.showSideMenu ? classes.closeCross : null];
   return (    
       <div className={iconClasses.join(" ") }
           onClick={props.clicked}>
                   <div></div>
                    <div></div>
                    <div></div>
                   <div></div>
                </div>        
    );
};

export default SideMenuShowHideIcon;
