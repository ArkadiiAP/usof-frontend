import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const getAllCategoriesWithPagination = createAsyncThunk(
  "categoriesReducer/getAllCategoriesWithPagination",
  async (page) => {
    const res = await axios.get(`/api/categories?page=${page}`, null)
    return res.data

  }
)

const getAllCategories = createAsyncThunk(
  'categoriesReducer/getAllCategories',
  async (token) => {
    const res = await axios.get(`/api/categories/all`, {
      headers: {Authorization: token}
    })
    return res.data
  }
)

export {getAllCategoriesWithPagination, getAllCategories}