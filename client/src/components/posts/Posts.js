import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import {getPosts} from '../../actions/post';


const Posts = ({getPosts, post:{posts, loading}}) => {

    //useEffect hook
    useEffect(()=>{
        getPosts();
    },[getPosts]);
    return loading ? <Spinner />:(
        <Fragment>
            <h1 className="large text-primary">Posts</h1>
            <p classNamee="lead">
                <i className="fas fa-user"></i>Welcome to the comunity
            </p>
            {/* Post Form */}
            <PostForm />
            {/* Post Item */}
            <div className="posts">
                {posts.map(post => (
                    <PostItem key={post._id} post={post} />
                ))}
            </div>
        </Fragment>
    );
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}
const mapStateToProps = state =>({
    post: state.post
});
export default connect(mapStateToProps, {getPosts})(Posts);
