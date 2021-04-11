import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const getAllUsers = createAsyncThunk(
  "usersReducer/getAllUsers",
  async (page) => {
    const res = await axios.get(`/api/users?page=${page}`, null)
    return res.data
  }
)
const getUserById = createAsyncThunk(
  "usersReducer/getUserById",
  async ({user_id, token}) => {
    const res = await axios.get(`/api/users/${user_id}`, {
      headers: {Authorization: token}
    })
    return res.data
  }
)
const changeAvatar = createAsyncThunk(
  "usersReducer/changeAvatar",
  async ({file, token}) => {
    const res = await axios.post('/api/users/avatar', file, {
      headers: {Authorization: token}
    })
    console.log(res)
    return res
  }
)

export {getAllUsers, getUserById, changeAvatar}