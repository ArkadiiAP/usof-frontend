import React, {useEffect} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getAllPosts} from "../../../services";
import PostItem from "./PostItem";
import PostPagination from "./PostPagination";
function Posts(){
  const dispatch = useDispatch()
  const data = useSelector((state) => {
    let {
      authReducer: {token, isLogged, isAdmin},
      postsReducer: {page, allPosts, msg},
    } = state
    return {
      token: token,
      page: page,
      allPosts: allPosts,
      isLogged: isLogged,
      isAdmin: isAdmin,
      msg: msg
    }
  }, shallowEqual)
  const {token, page, allPosts, isLogged, isAdmin, msg} = data
  const handleAddPost = () => {
    window.location.href = '/posts/create'
  }
  useEffect(() => {
    dispatch(getAllPosts(page))
  }, [page, dispatch])
  return(
    <div>
      {isLogged ? <button className={'add'} onClick={handleAddPost}>Add new post</button> : ''}
      {allPosts.map((elem, index) => {
        return (
          <PostItem key={index} post={elem}/>
        )
      })}
      <PostPagination />
    </div>
  )
}

export default Posts