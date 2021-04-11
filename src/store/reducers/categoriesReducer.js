import {createSlice} from "@reduxjs/toolkit";
import {getAllCategories, getAllCategoriesWithPagination} from "../../services";

const categoriesReducer = createSlice({
  name: "categoriesReducer",
  initialState: {
    count: 0,
    page: 1,
    allCategories: [],
    error: '',
    categories: []
  },
  reducers: {
    setCategoriesPage: (state, action) => {
      state.page = action.payload
    }
  },
  extraReducers:{
    [getAllCategoriesWithPagination.fulfilled]: (state, action) => {
      console.log(action.payload)
      state.count = action.payload?.count
      state.allCategories = action.payload?.rows
      state.error = ''
    },
    [getAllCategoriesWithPagination.rejected]: (state, action) => {
      state.error = action.payload?.msg
    },
    [getAllCategories.fulfilled]: (state, action) => {
      state.categories = action.payload
    }
  }
})

export const {setCategoriesPage} = categoriesReducer.actions
export default categoriesReducer.reducer