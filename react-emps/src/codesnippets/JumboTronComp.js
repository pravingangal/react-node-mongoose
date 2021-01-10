import React from "react";
import "./JumboTronComp.css";
import PropTypes from "prop-types";


const JumboTronComp = ({displayMsg,children}) => {    
  return ( 
   
     <div className=" container  opacity8  ">
    <div className=" jumbotron">
      <h1 >{displayMsg}</h1>
      <p className="lead">Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum</p>    
      {children}  
    </div>
  </div>               
  );
};

JumboTronComp.propTypes = {  
    displayMsg: PropTypes.string.isRequired,
  };


export default JumboTronComp;
