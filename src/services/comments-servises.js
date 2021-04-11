import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const createNeLikeByCommentId = createAsyncThunk(
  "commentsReducer/createNeLikeByCommentId",
  async ({comment_id, token, likeType}) => {
    const res = await axios.post(`/api/comments/${comment_id}/like`, {
      likeType: likeType
    }, {
      headers: {Authorization: token}
    })
    return res.data
  }
)

export {createNeLikeByCommentId}