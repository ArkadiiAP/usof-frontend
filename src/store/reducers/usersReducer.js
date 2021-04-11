import {createSlice} from "@reduxjs/toolkit";
import {changeAvatar, getAllUsers} from "../../services";
import {getUserById} from "../../services";

const usersReducer = createSlice({
  name: "usersReducer",
  initialState: {
    count: 0,
    page: 1,
    allUsers: [],
    error: '',
    profile: {}
  },
  reducers:{
    setUsersPage: (state, action) => {
      state.page = action.payload
    }
  },
  extraReducers:{
    [getAllUsers.fulfilled]: (state, action) => {
      state.count = action.payload?.count
      state.allUsers = action.payload?.rows
      state.error = ''
    },
    [getUserById.fulfilled]: (state, action) => {
      state.profile = action?.payload
    },
    [changeAvatar.fulfilled]: (state, action) => {

    }
  }
})

export const {setUsersPage} = usersReducer.actions
export default usersReducer.reducer