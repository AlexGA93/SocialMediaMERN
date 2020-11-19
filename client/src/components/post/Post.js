import React,{Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import{connect} from 'react-redux';
import Spinner from '../layout/spinner';
import PostItem from '../posts/PostItem';
import {getPost} from '../../actions/post';
import CommentForm from '../post/CommentForm';

const Post = ({getPost, post:{post, loading }, match}) => {
    // hook
    useEffect(() => {
        getPost(match.params.id);
    },[getPost]);
    // We 're gonna reuse post item component used in PostItem.js using showActions
    return loading || post === null ? <Spinner /> : <Fragment>
        <Link to='/posts' className = 'btn'>
            Back To Posts
        </Link>
        <PostItem post={post} ShowActions ={false} />
        
        {/* Comment form */}
        <CommentForm postId={post._id} />

    </Fragment>
}

Post.propTypes = {
    getPost:PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps =state=>(
    {
        post: state.post
    }
);
export default connect(mapStateToProps, {getPost})(Post);
