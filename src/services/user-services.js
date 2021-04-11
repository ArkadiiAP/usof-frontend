import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const getMyAccount = createAsyncThunk(
  "authReducer/getMyAccount",
  async (token) => {
    const res = await axios.get('/api/users/myAccount', {
      headers: {Authorization: token}
    })
    return res.data
  }
)

const resetPassword = createAsyncThunk(
  "authReducer/resetPassword",
  async ({token, password}) => {
    const res = await axios.post(`/api/auth/resetPassword/${token}`, {password})
    return res.data
  }
)

export {getMyAccount, resetPassword}



