import {createSlice} from "@reduxjs/toolkit";
import {createNeLikeByCommentId} from "../../services/comments-servises";

const commentsReducer = createSlice({
    name: 'commentsReducer',
    initialState: {
      msg: ''
    },
  reducers: {},
  extraReducers: {
      [createNeLikeByCommentId.fulfilled]: (state, action) => {
        state.msg = action?.payload?.msg
      }
  }
  }
)

export default commentsReducer.reducer