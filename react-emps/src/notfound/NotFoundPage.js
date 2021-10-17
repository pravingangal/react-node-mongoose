import React from "react";
import { Link } from "react-router-dom";
import JumboTronComp from "../codesnippets/JumboTronComp";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const notFoundPage = (props) => {

  const { empValidated } = { ...props };
  const OTHERS = props.location.pathname.substring(1).trim(); 
  const DISPLAY_MSG =  OTHERS=== "aboutus" || OTHERS==="contact" ? props.location.pathname.substring(1) : "Page Not Found..!";
  
  return ( <JumboTronComp displayMsg={DISPLAY_MSG} jumboID="notFoundPageDiv">
    <Link to={!empValidated ?'/login':'/dashboard'} className="btn btn-primary btn-lg">{!empValidated ?"Login...":"Dashboard.."}</Link>
  </JumboTronComp>                
  );
};  
notFoundPage.propTypes = {  
  empValidated: PropTypes.bool.isRequired,
};
function mapStateToProps(state) { 
return { empValidated: state.EmpsLoginReducer.empValidated,
}
}
export default connect(mapStateToProps)(notFoundPage);
