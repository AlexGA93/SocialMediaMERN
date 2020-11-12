// Bring actual profile data
import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Spinner from '../layout/spinner';
import { getProfileById } from '../../actions/profile';

const Profile = ({
    getProfileById, 
    profile:{profile, loading}, 
    auth, 
    match
}) => {
    // Using React's hook useEffect() 
    useEffect(()=>{
        getProfileById(match.params.id);//Profile's id will be get from the URL
    },[getProfileById, match.params.id]);

    return (
        <Fragment>
            {profile === null || loading ? (
            <Spinner /> 
            ) : (
                <Fragment>
                    <Link to='/profiles' className="btn btn-light">
                        Back To Profiles
                    </Link>
                    {auth.isAuthenticated && 
                    auth.loading === false && 
                    auth.user._id === profile.user._id &&
                    (
                        <Link to ='/edit-profile' className ="btn btn-dark">
                        Edit Profile
                        </Link>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById:PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});// we need auth state 'cause we want to see if user is logged in. If user is logged in and profile matches we want a button to edit profile

export default connect(mapStateToProps, {getProfileById})(Profile);
