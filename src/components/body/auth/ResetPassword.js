import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {showSuccessMsg, showErrMsg, isMatch, resetPassword} from "../../../services";
import {useDispatch} from "react-redux";

const initialState = {
  password: '',
  confirm_password: '',
  err: '',
  success: ''
}
function ResetPassword() {
  const dispatch = useDispatch()
  const {reset_token} = useParams()
  const [data, setData] = useState(initialState)
  const {password, confirm_password, err, success} = data
  const handleChangeInput = e => {
    const {name, value} = e.target
    setData({...data, [name]:value, err: '', success: ''})
  }
  const handleResetPassword = async e => {
    e.preventDefault()
    if(!isMatch(password, confirm_password)){
      return setData({...data, err: 'Password does not confirm', success: ''})
    }
    try{
      dispatch(resetPassword({token: reset_token, password: password}))
      setData({...data, err: '', success: 'Password has been reset'})
    } catch (err) {
      err.response.data.msg && setData({...data, err: err.response.data.msg, success: ''})
    }
  }
  return(
    <div>
      <h2>Reset Password</h2>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
      <form onSubmit={handleResetPassword}>
        <label htmlFor={'password'}>Enter new password</label>
        <input id={'password'} minLength={6} required={true} name={'password'} value={password} type={'password'} onChange={handleChangeInput}/>
        <label htmlFor={'confirm_password'}>Confirm new password</label>
        <input id={'confirm_password'} required={true} name={'confirm_password'} value={confirm_password} type={'password'} onChange={handleChangeInput}/>
        <button type={"submit"}>Reset Password</button>
      </form>
    </div>
  )
}

export default ResetPassword