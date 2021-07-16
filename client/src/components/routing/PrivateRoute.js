import React from "react";

// We have propTypes so we're going to use 'Redirect' 
import { Route, Redirect } from "react-router-dom";

import PropTypes from "prop-types";

//to interact with auth state in our reducer
import { connect } from "react-redux";

const PrivateRoute = ({
  // taking Component from component passed
  component: Component,
  //from mapStateToProps
  auth: { isAuthenticated, loading },
  //we want any other parameter passed in
  ...rest
}) => (
  // We want to redirect with Route tag in function of auth's state
  <Route
    // passing a bunch os stuff here...
    {...rest}
    render={(props) =>

      !isAuthenticated && !loading ? (

        <Redirect to="/login" />

      ) : (

        <Component {...props} />

      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  //we want the auth state
  auth: state.auth,
});
export default connect(mapStateToProps)(PrivateRoute);
