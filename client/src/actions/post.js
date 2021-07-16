import axios from 'axios';
import {setAlert} from './alert';
import {
    ADD_POST,
    DELETE_POST,
    GET_POSTS,
    GET_POST,
    POST_ERROR,
    UPDATE_LIKES,
    ADD_COMMENT,
    REMOVE_COMMENT
} from './types';


//GET POSTS
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');
        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}
//GET POST
export const getPost = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${id}`);
        dispatch({
            type: GET_POST,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}

//ADD LIKE
export const addLike = (postId) => async dispatch => {
    try {
        
        const res = await axios.put(`/api/posts/like/${postId}`);
        dispatch({
            type: UPDATE_LIKES,
            // we only want to send the post id and array of likes
            payload: { postId, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}

//REMOVE LIKE
export const removeLike = (postId) => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${postId}`);
        dispatch({
            type: UPDATE_LIKES,
            // we only want to send the post id and array of likes
            payload: { postId, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}

//REMOVE Post
export const deletePost = (id) => async dispatch => {
    try {
        await axios.delete(`/api/posts/${id}`);
        dispatch({
            type: DELETE_POST,
            // we only want to send the post id and array of likes
            payload: id
        });

        // alert
        dispatch(setAlert('Post removed', 'success'));

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}
//Add Post
export const addPost = (formData) => async dispatch => {
    const config ={
        headers: {
            'Content-Type':'application/json'
        }
    };
    try {
        const res = await axios.post('/api/posts/', formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });

        // alert
        dispatch(setAlert('Post created', 'success'));
        
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}

//Add Comment
export const addComment = (postId, formData) => async dispatch => {
    const config ={
        headers: {
            'Content-Type':'application/json'
        }
    };
    try {
        const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });

        // alert
        dispatch(setAlert('Comment Added', 'success'));
        
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}
//Delete Comment
export const deleteComment = (postId, commentId) => async dispatch => {
    console.log(`api/posts/comment/${postId}/${commentId}`)
    try {
        await axios.delete(`/api/posts/comment/${postId}/${commentId}/`);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });

        // alert
        dispatch(setAlert('Comment Removed', 'success'));
        
    } catch (err) {
        
        dispatch({
            type: POST_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}