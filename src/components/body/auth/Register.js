import React, {useState} from 'react'
import {Link} from "react-router-dom";
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from "../../../services/notification/Notification";
import {isMatch, isEmail} from '../../../services/validation/Validation'

const initialState = {
  login: '',
  email: '',
  password: '',
  confirmPassword: '',
  fullName: '',
  err: '',
  success: ''
}

export default function Register(){
  const [user, setUser] = useState(initialState)
  const {login, email, password, confirmPassword, fullName, err, success} = user

  const handleChangeInput = e => {
    const {name, value} = e.target
    setUser({...user, [name]:value, err: '', success: ''})
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if(!isEmail(email))
      return setUser({...user, err: "Wrong email", success: ''})
    if(!isMatch(password, confirmPassword))
      return setUser({...user, err: "Password did not match.", success: ''})

    try {
      const res = await axios.post('/api/auth/register', {
        login, email, password, fullName
      })
      setUser({...user, err: '', success: res.data.msg})
    } catch (err) {
      err.response.data.msg &&
      setUser({...user, err: err.response.data.msg, success: ''})
    }
  }

  return (
    <div>
      <h2>Register</h2>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor={'login'}>Login</label>
          <input type={'text'} required={true} name={'login'} id={'login'}
                 value={login} onChange={handleChangeInput}/>
        </div>
        <div>
          <label htmlFor={'email'}>Email</label>
          <input type={'email'} required={true} name={'email'} id={'email'}
                 value={email} onChange={handleChangeInput}/>
        </div>
        <div>
          <label htmlFor={'password'}>Password</label>
          <input type={'password'} minLength={6} required={true} name={'password'} id={'password'}
                 value={password} onChange={handleChangeInput}/>
        </div>
        <div>
          <label htmlFor={'confirmPassword'}>Confirm password</label>
          <input type={'password'} required={true} name={'confirmPassword'} id={'confirmPassword'}
                 value={confirmPassword} onChange={handleChangeInput}/>
        </div>
        <div>
          <label htmlFor={'fullName'}>Full name</label>
          <input type={'text'} name={'fullName'} id={'fullName'}
                 value={fullName} onChange={handleChangeInput}/>
        </div>
        <div>
          <button type={"submit"}>Register</button>
        </div>
      </form>

      <p>Already have an account? <Link to={'/login'}>Login</Link></p>
    </div>
  )
}
