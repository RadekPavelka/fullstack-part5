import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()


    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: 0
    }

    console.log('blogObject', blogObject)


    try {
      await blogService
        .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setNewBlog({ author: '', title: '', url: '' })
          setMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })

    } catch (exception) {
      setMessage('Missing title or url')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

  }

  const handleChangeOfAuthor = (event) => {
    console.log(event.target.value)
    setNewBlog({ ...newBlog, author: event.target.value })
  }
  const handleChangeOfTitle = (event) => {
    console.log(event.target.value)
    setNewBlog({ ...newBlog, title: event.target.value })
  }
  const handleChangeOfUrl = (event) => {
    console.log(event.target.value)
    //onChange={({ target }) => setNewBlog({...newBlog,url: target.value})} />
    setNewBlog({ ...newBlog, url: event.target.value })
  }


  //onChange={({ target }) => setNewBlog({...newBlog,url: target.value})} />

  const blogForm = () => (
    <Togglable buttonLabel="create new blog">
      <BlogForm
        onSubmit={addBlog}
        newBlog={newBlog}
        handleAuthorChange={handleChangeOfAuthor}
        handleTitleChange={handleChangeOfTitle}
        handleUrlChange={handleChangeOfUrl} 
      />
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <p>{message}</p>
        <form onSubmit={handleLogin}>
          <div>username
            <input type="text" value={username} name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>password
            <input type="password" value={password} name="Password"
              onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{message}</p>
      <form onSubmit={handleLogout}>
        {user.username} logged in
        <button type="submit">logout</button>
      </form>
      {blogForm()}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

    </div>
  )
}

export default App