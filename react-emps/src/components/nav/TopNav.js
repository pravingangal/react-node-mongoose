import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {empLogoutAction} from "../../actions/EmpLoginAction";
import decode from "jwt-decode";
import "./TopNav.css";

const TopNav = ({ empValidated,refreshToken,empLogoutAction }) => {

 const tokenLoad=refreshToken?(
   decode(refreshToken).SUPER_ADMIN?
   "Welcome SUPER_ADMIN":"Welcome "+decode(refreshToken).name
   ):"";
  
  const logIn=()=>{alert("Please Log In")}
  return (
    <nav className="navbar navbar-inverse nav-fill w-100 fixed-header " >
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="true">
            Logo..
          </a>
        </div>
        <p className="navbar-text navbar-right">
          {tokenLoad+ "   "}
          <span  className="navbar-link">
            {empValidated?(<button onClick={()=>empLogoutAction()}>Logout</button>):(<span  onClick={logIn}>Login</span>)}
          </span>
        </p>
      </div>
    </nav>
  );
};


TopNav.propTypes = {  
  empValidated: PropTypes.bool.isRequired,
  refreshToken:PropTypes.string.isRequired,
  empLogoutAction: PropTypes.func.isRequired,
  
};

function mapStateToProps(state) { 
  
return { empValidated: state.EmpsLoginReducer.empValidated,refreshToken:state.EmpsLoginReducer.refreshToken};
}

function mapDispatchToProps(dispatch) {
  return {
    empLogoutAction: bindActionCreators(empLogoutAction, dispatch),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(TopNav);
