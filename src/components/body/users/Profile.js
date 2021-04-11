import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getUserById} from "../../../services";
function Profile(){
  const dispatch = useDispatch()
  const user_id = useParams().user_id
  const data = useSelector((state) => {
    let {
      authReducer: {isLogged, isAdmin, user},
      usersReducer: {profile},
      tokenReducer: {token}
    } = state
    return {
      isLogged: isLogged,
      isAdmin: isAdmin,
      profile: profile,
      token: token,
      user: user
    }
  }, shallowEqual)
  let {isLogged, isAdmin, profile, token, user} = data
  useEffect(() => {
    dispatch(getUserById({user_id: user_id, token: token}))
  }, [dispatch, user_id, token])
  return(
    <>
      <div>
        <span className={'profile_login'}>{profile.login}</span>
        <img className={'profile_img'} src={profile.profilePicture} alt={''} />
        <span>{profile.role}</span>
      </div>
      <div>
        <span>{new Date(profile.createdAt).toDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</span>
        <span className={profile.rating >= 0 ? 'good' : 'evil'}><i className="fas fa-star"></i>{ profile.rating}</span>
        <p>{profile.fullName}</p>
        {user.id === profile.id || isAdmin ?
          <button className={'add'} onClick={() => window.location.href = `/users/${user.id}/edit`}>Edit Profile</button>
          : ''}
      </div>
    </>
  )
}

export default Profile