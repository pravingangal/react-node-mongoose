import React from "react";
import { Link } from "react-router-dom";
import JumboTronComp from "../../codesnippets/JumboTronComp";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const homePage = (props) => {
  const { empValidated } = props;
  return ( <JumboTronComp displayMsg={"Homepage..!"} jumboID="homePageDiv">
   <Link to={!empValidated ?'/login':'/dashboard'} className="btn btn-primary btn-lg">{!empValidated ?"Login...":"Dashboard.."}</Link>
</JumboTronComp>                
);
};   
homePage.propTypes = {  
    empValidated: PropTypes.bool.isRequired
};
function mapStateToProps(state) { 
  return { empValidated: state.EmpsLoginReducer.empValidated,};
}

export default connect(mapStateToProps)(homePage);
