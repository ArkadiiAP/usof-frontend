import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import Comments from "../comments/Comments";
import {createNewLikeByPostId} from "../../../services";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {showErrMsg, showSuccessMsg} from "../../../services";


function PostPage(){
  const dispatch = useDispatch()
  const post_id = useParams().post_id
  const [post, setPost] = useState()
  const [authors, setAuthors] = useState()
  const initialState = {
    content: '',
    error: '',
    success: '',
    isHidden: true
  }
  const [commentData, setCommentData] = useState(initialState)
  const {content, error, success, isHidden} = commentData
  const data = useSelector((state) => {
    let {
      authReducer: {isLogged, isAdmin, user},
      tokenReducer: {token},
      postsReducer: {msg}
    } = state
    return {
      isAdmin: isAdmin,
      isLogged: isLogged,
      user: user,
      token: token,
      msg: msg
    }
  }, shallowEqual)
  const {isLogged, isAdmin, token, msg, user} = data
  useEffect(() => {
    axios.get(`/api/posts/${post_id}/categories`)
      .then(res => {
        setPost(res.data[0])
        setCommentData({...commentData, error: '', success: res.data.msg})
      })
      .catch(err => {
        err.response.data.msg && setCommentData({...commentData, error: err.response.data.msg, success: ''})
      })
    post ? axios.get(`/api/users/${post.author}`, {
      headers: {Authorization: token}
    })
      .then(res => {
        setAuthors(res.data)
      }) : setAuthors('')
  },[post_id, msg, post?.author])
  const handleChange = e => {
    const {name, value} = e.target
    setCommentData({...commentData, [name]:value, err: '', success: ''})
  }

  const handleAddComment = e => {
    setCommentData({...commentData, isHidden: false})
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post(`/api/posts/${post.id}/comments`, {content: content} , {
        headers: {Authorization: token}
      })
      setCommentData({...commentData, err: '', success: res.data.msg, isHidden: true})
    } catch (err) {
      err.response.data.msg && setCommentData({...commentData, err: err.responce.data.msg, success: '', isHidden: true})
    }
  }

  const handleCancel = e => {
    setCommentData({...commentData, isHidden: true})
  }

  const handleLike = async e => {
    e.preventDefault()
    try {
      dispatch(createNewLikeByPostId({post_id: post.id, token: token, likeType: 'like'}))
      setCommentData({...commentData, error: '', success: msg})
    } catch (err) {
      err.response.data.msg && setCommentData({...commentData, error: err.response.data.msg, success: ''})
    }
  }
  const handleDislike = async e => {
    e.preventDefault()
    try {
      dispatch(createNewLikeByPostId({post_id: post.id, token: token, likeType: 'dislike'}))
      setCommentData({...commentData, error: '', success: msg})
    } catch (err) {
      err.response.data.msg && setCommentData({...commentData, error: err.response.data.msg, success: ''})
    }
  }
  const handleDeletePost = async e => {
    e.preventDefault()
    try {
      await axios.delete(`/api/posts/${post_id}`, {
        headers: {Authorization: token}
      })
      window.location.href = `/posts`
    } catch (err) {
      err.response.data.msg && setCommentData({...commentData, error: err.response.data.msg})
    }
  }

  return(
    <>
      {error && showErrMsg(error)}
      {success === 'Comment created' ? showSuccessMsg(success) : ''}
        <div>
        <div className={'post'}>
          <div className={'post_rating'}>
            <button onClick={handleLike}><i className="fas fa-caret-up"></i></button>
            <span>{post?.rating}</span>
            <button onClick={handleDislike}><i className="fas fa-caret-down"></i></button>
          </div>
          <div className={'post_info'}>
            <div onClick={() => window.location.href = `/posts/${post.id}`} className={'post_body'}>
              <h3 className={'post_title'}>{post?.title}</h3>
              <p>{post?.content}</p>
            </div>
            <div className={'post_category_author'}>
              <div className={'categories'}>
                {post?.categories.map((elem, index) => {
                  return(
                    <span key={index} className={'category'} onClick={() => window.location.href = `/postsByCategory/${elem.id}`}>{elem.title}</span>
                  )
                })}
              </div>
              <div className={'updated'}>
                <span>Updated: {new Date(post?.updatedAt).toDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</span>
              </div>
              {authors ?
                <div className={'author'}>
                  <p>Author: <span>{authors?.login}&nbsp;</span></p>
                  <p className={authors?.rating >= 0 ? 'good' : 'evil'}>&nbsp;Rating: <i className="fas fa-star"></i><span>{authors.rating}</span></p>
                </div>
                : ''
              }
            </div>
          </div>
        </div>
          <div className={'delete_button'}>
            {/*<button onClick={() => window.location.href = `/posts/${post_id}/edit`} hidden={isAdmin ? false : (user?.id === post?.author ? false : true)}>Edit</button>*/}
            <button className={'cancel'} hidden={isAdmin ? false : true} onClick={handleDeletePost}>Delete post</button>
          </div>
          <Comments post_id={post_id} success={success} isHidden={isHidden}/>
          <div hidden={isHidden ? true : false}>
            <label htmlFor={'create_comment'}></label>
            <input name={'content'} id={'create_comment'} value={content} onChange={handleChange}/>
            <div>
              <button className={'cancel'} onClick={handleCancel}>Cancel</button>
              <button className={'add'} onClick={handleSubmit}>Submit</button>
            </div>
          </div>
          <button className={'add'} onClick={handleAddComment} hidden={!isHidden ? true : false}>Add comment</button>
        </div>
    </>
  )
};

export default PostPage