import React, {useEffect} from "react";
import {getAllCategoriesWithPagination, showErrMsg} from "../../../services";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getAllCategories} from "../../../services/categories-servises";
import CategoriesPagination from "./CategoriesPagination";
import Category from "./Category";

function Categories(){
  const dispatch = useDispatch()
  const data = useSelector((state) => {
    let {
      authReducer: {token},
      categoriesReducer: {page, allCategories, error}
    } = state
    return {
      token: token,
      page: page,
      allCategories: allCategories,
      error: error
    }
  }, shallowEqual)
  useEffect(() => {
    dispatch(getAllCategoriesWithPagination(data.page))
  }, [data.page, dispatch])
  const handeleCreate = e =>{
    window.location.href = '/categories/create'
  }
  return(
    <>
      {data.error && showErrMsg(data.error)}
      <div className={'add_category_item'}>
        <button className={'add'} onClick={handeleCreate}>Add new category</button>
      </div>
      {data?.allCategories.map((elem, index) => {
        return(
          <Category key={index} data={elem}/>
        )
      })}
      <CategoriesPagination />
    </>
  )
}

export default Categories
