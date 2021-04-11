import {createSlice} from "@reduxjs/toolkit";
import {getAllPosts} from "../../services";
import {getCategoriesByPostId} from "../../services";
import {createNewLikeByPostId, getAllPostsByCategoryId} from "../../services/posts-servises";
const postsReducer = createSlice({
  name: "postsReducer",
  initialState: {
    error: null,
    loading: 'idle',
    allPosts: [],
    count: 0,
    page: 1,
    category: [],
    postsByCategory: [],
    msg: ''
  },
  reducers: {
    setPostsPage: (state, action) => {
      state.page = action.payload
    }
  },
  extraReducers: {
    [getAllPosts.fulfilled]: (state, action) => {
      state.allPosts = action.payload?.rows
      state.count = action.payload?.count
    },
    [getAllPosts.rejected]: (state, action) => {
      state.error = action.payload?.msg
    },
    [getCategoriesByPostId.fulfilled]: (state, action) => {

    },
    [getAllPostsByCategoryId.fulfilled]: (state, action) => {
      state.postsByCategory = action?.payload?.rows
      state.count = action?.payload?.count
      state.msg = action?.payload?.msg
    },
    [createNewLikeByPostId.fulfilled]: (state, action) => {
      state.msg = action?.payload?.msg
      console.log(action)
    }
  }
})

export const {setPostsPage} = postsReducer.actions
export default postsReducer.reducer