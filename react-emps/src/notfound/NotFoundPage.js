import React from "react";
import { Link } from "react-router-dom";
import JumboTronComp from "../codesnippets/JumboTronComp";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const NotFoundPage = ({ empValidated }) => {
  return ( <JumboTronComp displayMsg={"Page Not Found..!"} jumboID="notFoundPageDiv">
    <Link to={!empValidated ?'/login':'/dashboard'} className="btn btn-primary btn-lg">{!empValidated ?"Login...":"Dashboard.."}</Link>
  </JumboTronComp>                
  );
};  
NotFoundPage.propTypes = {  
  empValidated: PropTypes.bool.isRequired,
};
function mapStateToProps(state) { 
return { empValidated: state.EmpsLoginReducer.empValidated,
}
}
export default connect(mapStateToProps)(NotFoundPage);
