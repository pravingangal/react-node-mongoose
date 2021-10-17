import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const empEmailConfirmRoute = ({ empEmailConfirmed, component: Component, ...rest }) => { 
  
  return (    
  <Route
    {...rest}
    render={(props) =>             
        <Component {...props} />     
    }
  />
);
}
 empEmailConfirmRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object.isRequired,PropTypes.func.isRequired]),
  empEmailConfirmed: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return { empEmailConfirmed: state.EmpsEmailConfirmedReducer.empEmailConfirmed,};
}

export default connect(mapStateToProps)(empEmailConfirmRoute);
