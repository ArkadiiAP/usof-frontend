import React, {useEffect, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getMyAccount, getUserById, isMatch, showErrMsg} from "../../../services";
import {useParams} from "react-router-dom";
import axios from "axios";

function EditProfile(){
  const initialState = {
    fullName: '',
    password: '',
    confirm_password: '',
    role: '',
    err: '',
    success: '',
    upAvatar: false,
    upProfile: false
  }
  const dispatch = useDispatch()
  const data = useSelector((state) => {
    let {
      authReducer: {isAdmin},
      tokenReducer: {token},
      usersReducer: {profile}
    } = state
    return {
      isAdmin: isAdmin,
      token: token,
      profile: profile
    }
  }, shallowEqual)
  let {isAdmin, token, profile} = data
  const [upload, setUpload] = useState(initialState)
  const {fullName, password, confirm_password, role, err, success, upAvatar, upProfile} = upload
  const user_id = useParams().user_id
  useEffect(() => {
    setUpload({...upload, err: '', success: '', upAvatar: false, upProfile: false})
    dispatch(getUserById({user_id: user_id, token: token}))
    dispatch(getMyAccount(token))
  }, [dispatch, user_id, token, upAvatar, upProfile])
  const changeAvatar = async e => {
    e.preventDefault()
    try {
      const file = e.target.files[0]
      if(file.size > 1024 * 1024)
        return setUpload({...upload, err: "Size to large."})
      if(!file)
        return setUpload({...upload, err: 'No file', success: ''})
      if(file.type !== 'image/jpeg' && file.type !== 'image/png')
        return setUpload({...upload, err: 'File format is incorrect'})
      let formData = new FormData()
      formData.append('avatar', file)
      const res = await axios.post('/api/users/avatar', formData, {
        headers: {'content-type': 'multipart/form-data', Authorization: token}
      })
      return setUpload({...upload, err: '', success: res.data.msg, upAvatar: true})
    } catch (err) {
      err?.response?.data?.msg &&
      setUpload({...upload, err: err.response.data.msg, success: '', upAvatar: false})
    }
  }
  const handleChange = e => {
    const {name, value} = e.target
    console.log(name, value)
    setUpload({...upload, [name]: value, err: '', success: ''})
  }
  const handleChecked = e => {
    const {name, checked} = e.target
    setUpload({...upload, [name]: checked ? 'admin' : 'user', err: '', success: ''})
  }
  const updateProfile = () => {
    if(password.length > 0 && password.length < 6)
      return setUpload({...upload, err: "Password must be at least 6 characters"})
    if(!isMatch(password, confirm_password))
      return setUpload({...upload, err: "Password did not match", success: ''})
    try {
      axios.patch(`/api/users/${user_id}`, {
        fullName: fullName ? fullName : profile.fullName,
        password: password ? password : '',
        role: role ? role : ''
      },{
        headers: {Authorization: token}
      })
      setUpload({...upload, err: '', success: 'Profile updated', upProfile: true})
    } catch (err) {
      setUpload({...upload, err: err.response.data.msg, success: '', upProfile: false})
    }
  }

  return(
    <div>
      <div>
        {err && showErrMsg(err)}
        <img className={'profile_img'} src={profile.profilePicture} alt={''}/>
        <span>
          <p>Change avatar</p>
          <input type={'file'} name={'avatar'} onChange={changeAvatar}/>
        </span>
      </div>
      <div>
        <label htmlFor={'role'}>Admin </label>
        <input type={'checkbox'} id={'role'} name={'role'} onChange={handleChecked} defaultChecked={profile.role === 'admin'} disabled={!isAdmin}/>
      </div>
      <div>
        <label htmlFor={'login'}>Login</label>
        <input type={'text'} id={'login'} name={'login'} defaultValue={profile.login} disabled={true}/>
      </div>
      <div>
        <label htmlFor={'email'}>Email</label>
        <input type={'email'} id={'email'} name={'email'} defaultValue={profile.email} disabled={true}/>
      </div>
      <div>
        <label htmlFor={'fullName'}>Full Name</label>
        <input type={'text'} id={'fullName'} name={'fullName'} onChange={handleChange} defaultValue={profile.fullName}/>
      </div>
      <div>
        <label htmlFor={'password'}>New Password</label>
        <input type={'password'} id={'password'} name={'password'} onChange={handleChange} value={password} placeholder={'New password'}/>
      </div>
      <div>
        <label htmlFor={'confirm_password'}>Confirm New Password</label>
        <input type={'password'} id={'confirm_password'} name={'confirm_password'} onChange={handleChange} value={confirm_password} placeholder={'Confirm new password'}/>
      </div>
      <button className={'add'} onClick={updateProfile}>Update profile</button>
    </div>
  )
}

export default EditProfile