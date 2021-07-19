/**
 * @Author: yangqixin
 * @TIME: 7/19/21 7:34 PM
 * @FILE: postsSlice.js
 * @Email: 958292256@qq.com
 */

import { createSlice, nanoid } from "@reduxjs/toolkit"


const initialState = {
  posts: [
    {
      id: 1,
      title: 'title1',
      content: 'post 1 content'
    },
    {
      id: 2,
      title: 'title2',
      content: 'post 2 content'
    }
  ]
}


const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addNewPost: {
      reducer: (state, action) => {
        state.posts.push(action.payload)
      },
      /**
       * prepare callback.dispatch 一个 action 时，传给 action creator 函数的参数
       * 会首先传给 prepare 回调函数。在这个回调里，可以执行任何同步计算，然后返回一个对象，
       * 包含 payload 属性，和其他 meta 属性。这个对象，会直接传给 reducer 的 action 参数。
       */
      prepare: (title, content) => {
        return {
          payload: {
            id: nanoid,
            title,
            content
          }
        }
      }
    },

    updatePost: (state, action) => {
      const {id, title, content} = action.payload

      const existingPost = state.posts.find(p => p.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    }
  }
})


export const {addNewPost, updatePost} = postsSlice.actions

export const selectPosts = (state) => state.posts.posts

export default postsSlice.reducer
