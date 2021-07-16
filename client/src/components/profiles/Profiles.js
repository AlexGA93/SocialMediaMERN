import React,{Fragment, useEffect} from 'react';
//useEffect() is a hook that let you use state and other React features without writing a class.
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Spinner from "../layout/spinner";
import {getProfiles} from "../../actions/profile";
import ProfileItem from "./ProfileItem";

const Profiles = ({getProfiles, profile:{profiles,loading}}) => {
    
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(()=>{
        getProfiles();
    }, [getProfiles]); //We've to add [getProfile] as dependency
    return(

        <Fragment>
            {loading ? <Spinner/> : 
            <Fragment>
                <h1 className="large text-primary">Developers</h1>
                <p className="lead">
                    <i className="fab fa-connectdevelop"></i> Browse and Connect with Developers
                </p>
                <div className="profiles">
                    {profiles.length > 0 ? (
                        profiles.map(profile => (
                            <ProfileItem key={profile._id} profile={profile} />
                        ))
                    ) : (
                    <h4> No profiles found...</h4>
                    )
                    }
                </div>
                </Fragment>
            }
        </Fragment>
    );
};

Profiles.propTypes = {
    getProfiles:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, {getProfiles})(Profiles);
