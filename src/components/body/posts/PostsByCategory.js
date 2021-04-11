import React, {useEffect} from "react";
import PostPagination from "./PostPagination";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getAllPostsByCategoryId} from "../../../services/posts-servises";
import {useParams} from "react-router-dom";
import PostItem from "./PostItem";
function PostsByCategory(){
  const dispatch = useDispatch()
  const category_id = useParams().category_id
  const data = useSelector((state) => {
    let {
      authReducer: {isLogged, isAdmin},
      tokenReducer: {token},
      postsReducer: {page, postsByCategory}
    } = state
    return {
      token: token,
      isLogged: isLogged,
      isAdmin: isAdmin,
      page: page,
      postsByCategory: postsByCategory
    }
  }, shallowEqual)
  useEffect(() => {
    dispatch(getAllPostsByCategoryId({page: data.page, category_id: category_id , token: data.token}))
  }, [data.page, category_id, data.token, dispatch])
  return(
    <>
      {data.postsByCategory.map((elem, index) => {
        return(
          <PostItem post={elem} key={index}/>
        )
      })}
      <PostPagination/>
    </>
  )
}

export default PostsByCategory