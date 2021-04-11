import React, {useEffect, useState} from "react";
import axios from "axios";
import Comment from "./Comment";
import {shallowEqual, useSelector} from "react-redux";
function Comments({post_id, success, isHidden}){
  const [comments, setComments] = useState()
  const [newComments, setNewComments] = useState()
  const [error, setError] = useState()
  const data = useSelector((state) => {
    let {
      tokenReducer: {token},
      authReducer: {isAdmin}
    } = state
    return {
      token: token,
      isAdmin: isAdmin
    }
    }, shallowEqual)
  const {token, isAdmin} = data
  useEffect(() => {
    axios.get(`/api/posts/${post_id}/comments`)
      .then(res => {
        setComments(res.data)
        setError('')
      })
      .catch(err => {
        setError(err.message)
      })
  }, [post_id, error, success, newComments, isHidden])
  const handleDeleteComment = async e => {
    e.preventDefault()
    try {
      await axios.delete(`/api/comments/${e.target.name}`, {
        headers: {Authorization: token}
      })
      const filterArr = comments.Comments.filter(elem => elem.id !== e.target.name)
      setNewComments(filterArr)
    } catch (err) {
      console.log(err)
    }
  }
  return(
    <>
      {error ? <div></div> :
        comments ? comments?.Comments.map((elem, index) => {
          return(
            <div key={index}>
              <Comment comment={elem}/>
              <div className={'delete_button'}>
                <button className={'cancel'} name={elem.id} onClick={handleDeleteComment} hidden={!isAdmin ? true : false}>Delete comment</button>
              </div>
            </div>
          )
        }) : ''
      }
    </>
  )
}

export default Comments