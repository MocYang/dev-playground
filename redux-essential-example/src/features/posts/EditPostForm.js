/**
 * @Author: yangqixin
 * @TIME: 2021/7/19 21:58
 * @FILE: EditPostForm.js
 * @Email: 958292256@qq.com
 */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { updatePost } from "./postsSlice"

export const EditPostForm = ({match}) => {
  const {id} = match.params
  const post = useSelector(state => {
    return state.posts.posts.find(p => p.id === id)
  })

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const dispatch = useDispatch()
  const history = useHistory()

  const onTitleChange = e => setTitle(e.target.value)
  const onContentChange = e => setContent(e.target.value)

  const onSavePost = () => {
    if(title && content) {
      dispatch(updatePost({id, title, content}))
      history.push(`/posts/${id}`)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form action="#">
        <label htmlFor="postTitle">Post Title</label>
        <input
          type="text"
          id={'postTitle'}
          name={'postTitle'}
          value={title}
          onChange={onTitleChange}
        />

        <label htmlFor="postContent">Content: </label>
        <textarea
          name="postContent"
          id="postContent"
          value={content}
          onChange={onContentChange}
        />
        <button type={'button'} onClick={onSavePost}>save post</button>
      </form>
    </section>
  )
}
