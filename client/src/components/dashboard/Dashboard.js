import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getCurrentProfile } from "../../actions/profile";

import DashboardActions from './DashboardActions';

//Chargin page
import Spinner from "../layout/spinner";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  //using a hook as useEffect we can call current profile as soon as this loads
  useEffect(() => {
    getCurrentProfile();
  }, []);

  //if profile and loading are null
  return loading && profile === null ? (
    //show charging page
    <Spinner />
  ) : (
    // if not... show dashboard page
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"> Welcome {user && user.name} </i>
      </p>
      {profile !== null ? (
        // if there is not empty profile...
        <Fragment>
          <DashboardActions />
        </Fragment>
      ) : (
        //If there is empty profile...
        <Fragment>
          <p>You has not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

//we're going to be using the current profile actions
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
