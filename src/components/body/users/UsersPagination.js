import React from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {setUsersPage} from "../../../store/reducers";
function UsersPagination(){
  const dispatch = useDispatch()
  let pages = useSelector((store) => {
    return store.usersReducer.count/4
  }, shallowEqual)
  let dataPages = new Array(Math.ceil(pages)).fill(null).map((elem, index) => {
    return (
      <button className={'paginat'} key={index} onClick={() => dispatch(setUsersPage(index + 1))}>{index + 1}</button>
    )
  })
  return(
    <ul className={'paginat_ul'}>{dataPages}</ul>
  )
}

export default UsersPagination