/**
 * @Author: yangqixin
 * @TIME: 7/19/21 9:02 PM
 * @FILE: SinglePostPage.js
 * @Email: 958292256@qq.com
 */

import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export const SinglePostPage = ({match}) => {

  const {id} = match.params
  const post = useSelector(state => {
    return state.posts.posts.find(p => Number(p.id) === Number(id))
  })

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className={'post'}>
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>

        <Link to={`/posts/edit/${post.id}`}>Edit Post</Link>
      </article>
    </section>
  )
}
