import React, {useEffect} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getAllUsers} from "../../../services";
import UsersPagination from "./UsersPagination";
function Users(){
  const dispatch = useDispatch()
  const data = useSelector((state) => {
    let {
      authReducer: {token, isLogged, isAdmin},
      usersReducer: {page, allUsers, error}
    } = state
    return {
      token: token,
      page: page,
      allUsers: allUsers,
      error: error,
      isAdmin: isAdmin,
      isLogged: isLogged
    }
  }, shallowEqual)
  const {token, page, allUsers, error, isAdmin, isLogged} = data
  useEffect(() => {
    dispatch(getAllUsers(page))
  }, [page, dispatch])
  return(
    <div className={'profile_wrapper'}>
      {/*<div>*/}
      {/*  <button hidden={!isAdmin}>Create New User</button>*/}
      {/*</div>*/}
      {allUsers.map((elem, index) => {
        return(
          <div key={index} className={'profile'}>
            <div onClick={() => window.location.href = `/users/${elem.id}`}>
              <img className={'profile_img'} src={elem.profilePicture} alt={''}/><br/>
              <span>{elem.login}</span><br/>
              <span>Rating: {elem.rating}</span>
            </div>
            <div>
              <button className={'add'} hidden={!isAdmin} onClick={() => window.location.href = `/users/${elem.id}/edit`}>Edit user</button>
              <button className={'cancel'} hidden={!isAdmin} onClick={''}>Delete user</button>
            </div>
          </div>
        )
      }
      )}
      <UsersPagination/>
    </div>
  )
}

export default Users