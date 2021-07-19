/**
 * @Author: yangqixin
 * @TIME: 7/19/21 7:54 PM
 * @FILE: PostsList.js
 * @Email: 958292256@qq.com
 */
import { useSelector, useDispatch } from 'react-redux'
import {Link} from "react-router-dom"
import { selectPosts } from './postsSlice'

const PostsList = () => {
  const posts = useSelector(selectPosts)
  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {
        posts.map(post => (
          <article key={post.id} className="post-excerpt">
            <h3>{post.title}</h3>
            <p className="post-content">
              {post.content.slice(0, 100)}
            </p>
            <Link to={`/posts/${post.id}`} className={'button muted-button'}>
              View Post
            </Link>
          </article>
        ))
      }
    </section>
  )
}


export default PostsList
