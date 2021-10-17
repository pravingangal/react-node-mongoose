import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const empNotLoggedinRoute = ({ empValidated, component: Component, ...rest }) => {
 return (    
  <Route
    {...rest}
    render={(props) =>       
      !empValidated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/dashboard" />
      )
    }
  />
);
}
empNotLoggedinRoute.propTypes = {
  component: PropTypes.object.isRequired,
  empValidated: PropTypes.bool.isRequired,
  
};
function mapStateToProps(state) {
  return { empValidated: state.EmpsLoginReducer.empValidated,
  };
}

export default connect(mapStateToProps)(empNotLoggedinRoute);
