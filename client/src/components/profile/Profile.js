// Bring actual profile data
import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Spinner from '../layout/spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';
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
                    <div class="profile-grid my-1">
                        {/* Profile Top Component */}
                        <ProfileTop profile={profile}/>
                        {/* Profile About Component  */}
                        <ProfileAbout profile={profile}/>
                        {/* Profile Experience Component */}
                        <div className="profile-exp bg-white p-2">
                            <h2 className="text-primary">Experience</h2>
                            {profile.experience.length > 0 ? (
                                <Fragment>
                                {profile.experience.map((experience) => (
                                    <ProfileExperience
                                    key={experience._id}
                                    experience={experience}
                                    />
                                ))}
                                </Fragment>
                            ) : (
                                <h4>No experience credentials</h4>
                            )}
                        </div>
                        {/* Profile Education Component */}
                        <div className="profile-edu bg-white p-2">
                            <h2 className="text-primary">Education</h2>
                            {profile.education.length > 0 ? (
                                <Fragment>
                                {profile.education.map((education) => (
                                    <ProfileEducation
                                    key={education._id}
                                    education={education}
                                    />
                                ))}
                                </Fragment>
                            ) : (
                                <h4>No education credentials</h4>
                            )}
                            </div>
                        {/* Profile Github Repos Component  */}
                        {profile.githubusername && (
                            <ProfileGithub username={profile.githubusername}/>
                        )}
                        
                    </div>
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
