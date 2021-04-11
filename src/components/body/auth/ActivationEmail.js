import React, {useEffect, useState} from "react";
import {showErrMsg, showSuccessMsg} from '../../../services'
import axios from "axios";
import {useParams} from 'react-router-dom'

export default function ActivationEmail() {
  const {activation_token} = useParams()
  const [err, setErr] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if(activation_token){
      const activationEmail = async () => {
        try {
          const res = await axios.post('/api/auth/activation', {activation_token})
          setSuccess(res.data.msg)
        } catch (err) {
          err.response.data.msg && setErr(err.response.data.msg)
        }
      }
      activationEmail()
    }
  }, [activation_token])
  return(
    <div>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
    </div>
  )
}