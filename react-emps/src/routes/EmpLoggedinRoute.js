import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const EmpLoggedinRoute = ({ empValidated, component: Component, ...rest }) => {

 return (    
  <Route
    {...rest}
    render={(props) =>       
      empValidated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);
}
 



EmpLoggedinRoute.propTypes = {
  component: PropTypes.object.isRequired,
  empValidated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return { empValidated: state.empValidated,};
}

export default connect(mapStateToProps)(EmpLoggedinRoute);
