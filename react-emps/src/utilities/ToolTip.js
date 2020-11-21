import React from "react";
import "./ToolTip.css"; 


const EmpToolTip = ({empErrMsg,classList}) => { 
  return (<span  className={classList? classList + " empTooltip":" empTooltip"}>{" " +empErrMsg}</span>);
}

export default EmpToolTip;
 