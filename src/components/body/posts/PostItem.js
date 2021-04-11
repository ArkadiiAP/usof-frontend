import React, {useEffect, useState} from "react";
import axios from "axios";
import {shallowEqual, useSelector} from "react-redux";
function PostItem({post}){
  const [categories, setCategories] = useState()
  const [authors, setAuthors] = useState()
  const data = useSelector((state) => {
    let {
      tokenReducer: {token}
    } = state
    return {
      token: token
    }
  }, shallowEqual)
  const {token} = data
  useEffect(() => {
    axios.get(`/api/posts/${post.id}/categories`)
      .then(res => {
        setCategories(res.data[0].categories)
      })
    token ? axios.get(`/api/users/${post.author}`, {
      headers: {Authorization: token}
    })
      .then(res => {
        setAuthors(res.data)
      }): setAuthors('')
  },[post.id, post.author, token])

    return (
      <div key={post.id} className={'post'}>
        <div className={'post_rating'}>
          <span>{post.rating}</span>
        </div>
        <div className={'post_info'}>
          <div onClick={() => window.location.href = `/posts/${post.id}`} className={'post_body'}>
            <h3 className={'post_title'}>{post.title}</h3>
            <p>{post.content}</p>
          </div>
          <div className={'post_category_author'}>
            <div className={'categories'}>
            {categories ? categories.map((elem, index) => {
              return(
                <span key={index} className={'category'} onClick={() => window.location.href = `/postsByCategory/${elem.id}`}>{elem.title}</span>
              )
            }) : ''}
            </div>
            <div className={'updated'}>
              <span>Updated: {new Date(post.updatedAt).toDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</span>
            </div>
              {authors ?
                  <div className={'author'}>
                    <p>Author: <span>{authors.login}&nbsp;</span></p>
                    <p className={authors.rating >= 0 ? 'good' : 'evil'}>&nbsp;Rating: <i className="fas fa-star"></i><span>{authors.rating}</span></p>
                  </div>
               : ''
              }
          </div>
        </div>
      </div>
    )
}

export default PostItem