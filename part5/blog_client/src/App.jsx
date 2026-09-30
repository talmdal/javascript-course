import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification.jsx'
import { TextField } from './components/TextField.jsx'
import { getStorageUser } from './services/storageUser.js'

const App = () => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ blogs, setBlogs ] = useState([])
  const [ user, setUser ] = useState(null)
  const [ notification, setNotification ] = useState(null)
  const [ msgType, setMsgType ] = useState('success')

  const [ blogTitle, setBlogTitle ] = useState('')
  const [ blogAuthor, setBlogAuthor ] = useState('')
  const [ blogUrl, setBlogUrl ] = useState('')

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

  const loginForm = () => (
    <>
      <h2>log into application</h2>
      <Notification msgType={msgType} message={notification} />
      <form onSubmit={handleLogin}>
        <TextField
          label='username:'
          type='text'
          value={username}
          onChange={ (value) => setUsername(value) }
        />
        <TextField
          label='password:'
          type='password'
          value={password}
          onChange={ (value) => setPassword(value) }
        />
        <button type="submit">login</button>
      </form>
      </>
  )

  const blogList = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const handleNewBlog = (event) => {
    event.preventDefault()
    blogService.create({
      title: blogTitle, author: blogAuthor, url: blogUrl
    })
      .then(blog => {
        setBlogs(currentBlogs => currentBlogs.concat(blog))
        setMsgType('success')
        setNotification(`A new blog. ${blog.title} by ${blog.author}`)
        setBlogTitle('')
        setBlogAuthor('')
        setBlogUrl('')
      })
      .catch(error => {
        setMsgType('error')
        setNotification(error.response.data.error)
      })
  }

  const newBlogForm = () => {
    return (
        <div>
          <h2>create new</h2>
          <form>
            <TextField
              label='title:'
              type='text'
              value={blogTitle}
              onChange={ (value) => setBlogTitle(value) }
            />
            <TextField
              label='author:'
              type='text'
              value={blogAuthor}
              onChange={ (value) => setBlogAuthor(value) }
            />
            <TextField
              label='url:'
              type='text'
              value={blogUrl}
              onChange={ (value) => setBlogUrl(value) }
            />
            <div>
              <button type="submit" onClick={handleNewBlog}>create</button>
            </div>
          </form>
        </div>
      )
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

      { !user && loginForm() }
       { user && (
        <div>
          <h2>blogs</h2>
          <Notification msgType={msgType} message={notification} />
          <p>
            { user.name } is logged in&nbsp;
            <button type='button' onClick={handleLogout}>logout</button>
          </p>
          { newBlogForm() }
          <br />
          { blogList() }
        </div>
        )
      }
    </div>
  )
}

export default App