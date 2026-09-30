import { useState, useEffect, useRef } from 'react'
import { BlogList } from './components/Blog'
import { LoginForm } from './components/LoginForm.jsx'
import Notification from './components/Notification.jsx'
import { Togglable } from './components/Toggle.jsx'
import { NewBlogForm } from './components/NewBlogForm.jsx'
import blogService from './services/blogs'
import loginService from './services/login'
import { getStorageUser } from './services/storageUser.js'

const App = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ blogs, setBlogs ] = useState([])
  const [ user, setUser ] = useState(null)
  const [ notification, setNotification ] = useState(null)
  const [ msgType, setMsgType ] = useState('success')

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(username, password)

      setUsername('')
      setPassword('')
      window.localStorage.setItem('blogList', JSON.stringify(user))
      setUser(user)
    } catch (exception) {
      console.log(exception)
      setMsgType('error')
      setNotification(exception.response.data.error)
    }
  }

  const handleLogout = () =>{
    window.localStorage.clear()
    setUser(null)
  }

  const handleNewBlog = (newBlog, onSuccess) => {
    blogService.create(newBlog)
      .then(blog => {
        setBlogs(currentBlogs => currentBlogs.concat(blog))
        setMsgType('success')
        setNotification(`A new blog. ${blog.title} by ${blog.author}`)
        onSuccess('')
        blogFormRef.current.toggleVisibility()
      })
      .catch(error => {
        setMsgType('error')
        setNotification(error.response.data.error)
      })
  }

  const incrementLiked = (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    delete updatedBlog.user
    console.log('increment like for:', JSON.stringify(updatedBlog))
    blogService.update(updatedBlog)
      .then(blog => {
        setBlogs(
          currentBlogs => currentBlogs.map(
            b => b.id === updatedBlog.id ? updatedBlog : b
          )
        )
        setMsgType('success')
        setNotification(`Updated the blog. ${blog.title} by ${blog.author}`)
      })
  }

  const removeBlog = (blog) => {
    console.log('Delete Blog:', JSON.stringify(blog))
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      blogService.destroy(blog.id)
      .then(() => {
        setBlogs(
          currentBlogs => currentBlogs.filter(
            b => b.id !== blog.id
          )
        )
        setMsgType('success')
        setNotification(`Deleted the blog. ${blog.title} by ${blog.author}`)
      })
    }
  }


  useEffect(() => {
    setUser(getStorageUser())
  }, [])

  useEffect(() => {
    blogService.getAll().then(initialNotes => {
      setBlogs(initialNotes)
    })
  }, [user])

  return (
    <div>
      <h2>blogs</h2>
      <Notification msgType={msgType} message={notification} />
      { !user && (
        <Togglable buttonLabel='log in'>
          <LoginForm
            onSubmit={handleLogin}
            username={username}
            password={password}
            onUsernameChange={ (value) => setUsername(value) }
            onPasswordChange={ (value) => setPassword(value) }
          />
        </Togglable>
      )}
      { user && (
        <div>
          <p>
            { user.name } is logged in&nbsp;
            <button type='button' onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel='create new blog' ref={blogFormRef} >
            <NewBlogForm
              onSubmit={handleNewBlog}
            />
          </Togglable>
          <br />
          <BlogList
            blogs={blogs}
            onLiked={incrementLiked}
            onDelete={removeBlog}
          />
          {/* { blogList() } */}
        </div>
        )
      }
    </div>
  )
}

export default App