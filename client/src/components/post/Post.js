import React,{Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import{connect} from 'react-redux';
import Spinner from '../layout/spinner';
import PostItem from '../posts/PostItem';
import {getPost} from '../../actions/post';

const Post = ({getPost, post:{post, loading }, match}) => {
    // hook
    useEffect(() => {
        getPost(match.params.id);
    },[getPost]);
    // We 're gonna reuse post item component used in PostItem.js using showActions
    return loading || post === null ? <Spinner /> : <Fragment>

        <PostItem post={post} ShowActions ={false} />
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
