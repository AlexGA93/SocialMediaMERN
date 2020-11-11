import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getCurrentProfile } from "../../actions/profile";

import DashboardActions from './DashboardActions';

//Chargin page
import Spinner from "../layout/spinner";

//Experience
import Experience from "./Experience";
//Education
import Education from "./Education";
//delete Account
import {deleteAccount} from '../../actions/profile';


const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  //using a hook as useEffect we can call current profile as soon as this loads
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

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
          <Experience experience={profile.experience} />
          <Education education={profile.education}  />

          <div className="my-2">
            {/* Once we delete our account it should just redirect us back to the login page */}
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className ="fas fa-user-minus"></i>Delete My Account
            </button>
          </div>
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
  deleteAccount:PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

//we're going to be using the current profile actions
export default connect(mapStateToProps, { getCurrentProfile,deleteAccount })(Dashboard);
