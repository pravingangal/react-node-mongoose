import React from "react";
import "./EmpsSpinner.css"; 

const empsSpinner = ({ spinType,msg }) => {    
    return (
       <React.Fragment> <span>{msg?msg:""}</span><div className={"marginL40p spin"+spinType}></div></React.Fragment>
    );
  };
  
export default empsSpinner;
