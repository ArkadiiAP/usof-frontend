import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
const getAllPosts = createAsyncThunk(
  "postsReducer/getAllPosts",
  async (page) => {
    const res = await axios.get(`/api/posts?page=${page}`, null)
    return res.data
  }
)
const getCategoriesByPostId = createAsyncThunk(
  "postsReducer/getCategoriesByPostId",
  async (post_id) => {
    const res = await axios.get(`/api/posts/${post_id}/categories`, null)
    return res.data
  }
)
const getAllPostsByCategoryId = createAsyncThunk(
  "postsReducer/getAllPostsByCategoryId",
  async ({page, category_id, token}) => {
    const res = await axios.get(`/api/categories/${category_id}/posts?page=${page}`, {
        headers: {Authorization: token}
    })
    console.log(res.data)
    return res.data
  }
)
const createNewLikeByPostId = createAsyncThunk(
  "postsReducer/createNewLikeByPostId",
  async ({post_id, token, likeType}) => {
    try{
      const res = await axios.post(`/api/posts/${post_id}/like`,
        {
          likeType: likeType
        }, {
          headers: {Authorization: token}
        })
      console.log(res)
      return res.data
    } catch (err) {
      return err.response.data.msg
    }

  }
)

export {getAllPosts, getCategoriesByPostId, getAllPostsByCategoryId, createNewLikeByPostId}