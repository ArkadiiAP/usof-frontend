import {createSlice} from "@reduxjs/toolkit";

const tokenReducer = createSlice({
  name: "tokenReducer",
  initialState: {
    token: ''
  },
  reducers: {
    get_token: (state, action) => {
      state.token = action.payload
    }
  }
})

export const { get_token } = tokenReducer.actions
export default tokenReducer.reducer

