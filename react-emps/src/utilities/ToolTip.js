import React from "react";
import "./ToolTip.css"; 

const empToolTip = ({empErrMsg,classList}) => { 
  return (<span  className={classList? classList + " empTooltip":" empTooltip"}>{" " +empErrMsg}</span>);
}
export default empToolTip;
