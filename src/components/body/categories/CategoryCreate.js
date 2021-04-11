import React, {useState} from "react";
import {showErrMsg} from "../../../services";
import axios from "axios";
import {shallowEqual, useSelector} from "react-redux";
function CategoryCreate(){
  const initialState = {
    title: '',
    content: '',
    error: ''
  }
  const [category, setCategory] = useState(initialState)
  const {title, content, error} = category
  const data = useSelector(state => {
    let{
      tokenReducer: {token}
    } = state
    return{
      token: token
    }
  }, shallowEqual)
  const {token} = data
  const handleChangeInput = e => {
    const {name, value} = e.target
    setCategory({...category, [name]:value, error: ''})
  }
  const handleCreateCategory = async () => {
    if(title.length === 0 || content.length === 0) {
      return setCategory({...category, error: "Please fill in all fields."})
    }
    console.log(token)
    try {
      await axios.post('/api/categories', {
        title: title,
        description: content
      },{
        headers: {Authorization: token}
      })
      setCategory({...category, error: ''})
    } catch (err){
      err.response.data.msg && setCategory({...category, error: err.response.data.msg})
    }
  }
  return(
    <div className={'create_wrapper'}>
      {error && showErrMsg(error)}
      <label htmlFor={'title'}>Title</label><br/>
      <input className={'title'} name={'title'} id={'title'} onChange={handleChangeInput} value={title}/>
      <label htmlFor={'content'}>Content</label><br/>
      <textarea className={'content'} name={'content'} id={'content'} onChange={handleChangeInput} value={content}/>
      <button className={'add'} onClick={handleCreateCategory}>Create new category</button>
    </div>
  )
}
export default CategoryCreate