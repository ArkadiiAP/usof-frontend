import React, {useEffect} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getAllCategories} from "../../../services";
function PostEdit(){
  const dispatch = useDispatch()
  const data = useSelector(state => {
    let {
      tokenReducer: {token},
      categoriesReducer: {categories}
    } = state
    return {
      token: token,
      categories: categories
    }
  }, shallowEqual)
  const {token, categories} = data
  useEffect(() => {
    dispatch(getAllCategories(token))
  }, [token, dispatch])
  return(
    <div>
      Edit Post
    </div>
  )
}

export default PostEdit