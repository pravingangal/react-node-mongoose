import React from "react";
import "./JumboTronComp.css";
import PropTypes from "prop-types";

const jumboTronComp = ({displayMsg,jumboID,children}) => {  
  return (    
     <div className=" container  opacity8  " id={jumboID}>
    <div className=" jumbotron">
      <h1 >{displayMsg}</h1>
      <p className="lead">Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum Lorem Epsum</p>    
      {children}  
    </div>
  </div>               
  );
};

jumboTronComp.propTypes = {  
    displayMsg: PropTypes.string.isRequired,
  };
export default jumboTronComp;
