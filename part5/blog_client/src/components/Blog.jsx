import { useState } from 'react'

export const BlogDetail = ({ blog, onLiked, onDelete }) => {
  const [ detailVisible, setDetailVisible ] = useState(false)
  const displayName = blog.user ? blog.user.name : undefined
  return (
    <div>
      <p>
        {blog.title} {blog.author}
        <button onClick={() => setDetailVisible(true)}>view</button>
      </p>
      <div style={{
        display: detailVisible ? 'block': 'none',
        marginLeft: '20px',
        marginRight: '20px',
        border: '1px solid #ccc'
      }}>
        <p>
          {blog.title} {blog.author}&nbsp;
          <button onClick={() => setDetailVisible(false)}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p>
          likes: {blog.likes}&nbsp;
          <button onClick={() => onLiked(blog)}>like</button>
        </p>
        { displayName && <p>{displayName}</p> }
        <p><button onClick={() => onDelete(blog)}>delete</button></p>
      </div>
    </div>
  )
}

export const BlogList = ({ blogs, onLiked, onDelete }) => (
  <div>
    {blogs.map(blog =>
      <BlogDetail
        key={blog.id}
        blog={blog}
        onLiked={onLiked}
        onDelete={onDelete}
      />
    )}
  </div>
)
