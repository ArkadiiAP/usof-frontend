import React, {useEffect, useState} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getAllCategories} from "../../../services";
import Select from "react-select";
import axios from "axios";
import {showErrMsg} from "../../../services";

function PostCreate(){
  const dispatch = useDispatch()
  const initialState = {
    title: '',
    content: '',
    selCategories: [],
    error: ''
  }
  const [selectCategories, setSelectCategories] = useState(initialState)
  const{title, content, selCategories, error} = selectCategories
  const data = useSelector((state) => {
    let {
      tokenReducer: {token},
      categoriesReducer: {categories}
    } = state
    return {
      token: token,
      categories: categories
    }
  }, shallowEqual)
  const {token, categories} = data
  let options = []
  useEffect(() => {
    dispatch(getAllCategories(token))
  }, [token, dispatch])
  const handleChangeSelect = (e) => {
    let arrId = e.map(elem => {
      return elem.value
    })
    console.log(arrId)
    console.log(selectCategories)
    setSelectCategories({...selectCategories, selCategories: arrId, error: ''})
  }
  const handleChangeInput = e => {
    const {name, value} = e.target
    setSelectCategories({...selectCategories, [name]: value, error: ''})
  }
  const handleCreatePost = async () => {
    if (title.length === 0 || content.length === 0) {
      return setSelectCategories({...selectCategories, error: 'Title and content required'})
    }
    try {
      await axios.post(`/api/posts`, {
        title: title,
        content: content,
        categories: selCategories
      },{
        headers: {Authorization: token}
      })
      window.location.href = '/posts'
    } catch (err){
      console.log(err)
    }
  }
  return(
    <div className={'create_wrapper'}>
      {error && showErrMsg(error)}
      <label htmlFor={'title'}>Title</label><br/>
      <input className={'title'} name={'title'} id={'title'} onChange={handleChangeInput} value={title}/>
      <label htmlFor={'content'}>Content</label><br/>
      <textarea className={'content'} name={'content'} id={'content'} onChange={handleChangeInput} value={content}/>
      {categories ? categories.map(elem => {
        options.push({value: elem.id, label: elem.title})
      }) : console.log(categories)}
      <label>Categories</label>
      <Select options={options} isMulti onChange={handleChangeSelect}></Select>
      <button className={'add'} onClick={handleCreatePost}>Create new post</button>
    </div>
  )
}

export default PostCreate