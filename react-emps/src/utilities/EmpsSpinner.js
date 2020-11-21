import React from "react";
import "./EmpsSpinner.css"; 

const EmpsSpinner = ({ spinType }) => {    
    return (
        <div className={"marginL40p spin"+spinType}></div>
    );
  };
  
  
  export default EmpsSpinner;