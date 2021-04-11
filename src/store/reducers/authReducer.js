import {createSlice} from "@reduxjs/toolkit";
import {getMyAccount, resetPassword} from "../../services";

const initialState = {
  user: {},
  isLogged: false,
  isAdmin: false,
  error: ''
}

const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    login: (state) => {
      state.isLogged = true
    },
    logout: (state) => {
      state.isLogged = false
    }
  },
  extraReducers: {
    [getMyAccount.fulfilled]: (state, action) => {
      state.user = action.payload
      state.user.role === 'admin' ? state.isAdmin = true : state.isAdmin = false
    },
    [resetPassword.fulfilled]: (state, action) => {
      console.log(action.payload)
    }
  }

})

export const { login, logout } = authReducer.actions
export default authReducer.reducer

