import React, {useState} from 'react'
import {Link} from "react-router-dom";
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from "../../../services";
import {login} from "../../../store/reducers";
import {useDispatch} from "react-redux";

const initialState = {
  email: '',
  password: '',
  err: '',
  success: ''
}

export default function Login(){
  let dispatch = useDispatch()
  const [user, setUser] = useState(initialState)
  const {email, password, err, success} = user

  const handleChangeInput = e => {
    const {name, value} = e.target
    setUser({...user, [name]:value, err: '', success: ''})
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('api/auth/login', {email, password})
      setUser({...user, err: '', success: res.data.msg})
      localStorage.setItem('logInOnStartUp', true)
      dispatch(login())
      window.location.href = '/'
    } catch (err) {
        err.response.data.msg &&
          setUser({...user, err: err.response.data.msg, success: ''})
    }
  }

  return (
    <div>
      <h2>Login</h2>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor={'login-email'}>Email</label>
          <input type={'email'} required={true} name={'email'} id={'login-email'}
                 value={email} onChange={handleChangeInput}/>
        </div>
        <div>
          <label htmlFor={'login-password'}>Password</label>
          <input type={'password'} required={true} name={'password'} id={'login-password'}
                 value={password} onChange={handleChangeInput}/>
        </div>
        <div>
          <button type={"submit"}>Login</button>
          <Link to={'/forgotPassword'}>Forgot your password</Link>
        </div>
      </form>

      <p>New Customer? <Link to={'/register'}>Register</Link></p>
    </div>
  )
}
