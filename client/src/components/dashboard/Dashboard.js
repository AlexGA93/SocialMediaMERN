import React ,{useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {getCurrentProfile} from "../../actions/profile";

const Dashboard = ({getCurrentProfile, auth, profile}) => {

  //using a hook as useEffect we can call current profile as soon as this loads
  useEffect( () => {
    getCurrentProfile();
  }, []);

  return <div>Dashboard</div>;
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile:PropTypes.object.isRequired,
};

const mapStateToProps = state =>({
  auth: state.auth,
  profile: state.profile
});

//we're going to be using the current profile actions
export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);
