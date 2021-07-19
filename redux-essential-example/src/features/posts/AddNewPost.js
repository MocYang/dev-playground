/**
 * @Author: yangqixin
 * @TIME: 7/19/21 8:27 PM
 * @FILE: AddNewPost.js
 * @Email: 958292256@qq.com
 */

import { useState } from 'react'
import { useDispatch } from "react-redux"
import { nanoid } from "@reduxjs/toolkit"

import { addNewPost } from "./postsSlice"

export const AddPostForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const onTitleChange = e => setTitle(e.target.value)
  const onContentChange = e => setContent(e.target.value)
  const onSaveNewPost = () => {
    if (title && content) {
      dispatch(addNewPost(title, content))

      setTitle('')
      setContent('')
    }
  }
  return (
    <section>
      <h2>Add a New Post</h2>
      <form action="#">
        <label htmlFor={'postTitle'}>Post Title: </label>
        <input
          type="text"
          id="postTitle"
          name={'postTitle'}
          value={title}
          onChange={onTitleChange}
        />

        <label htmlFor={''}>Content:</label>
        <textarea
          name="postContent"
          id="postContent"
          value={content}
          onChange={onContentChange}
        />
        <button type={'button'} onClick={onSaveNewPost}>Save Post</button>
      </form>
    </section>
  )
}
