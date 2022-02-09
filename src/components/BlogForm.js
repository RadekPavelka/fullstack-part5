import React, {useState} from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleChangeOfAuthor = (event) => {
    setNewBlog({ ...newBlog, author: event.target.value })
  }
  const handleChangeOfTitle = (event) => {
    setNewBlog({ ...newBlog, title: event.target.value })
  }
  const handleChangeOfUrl = (event) => {
    setNewBlog({ ...newBlog, url: event.target.value })
  }

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: 0
    })

    setNewBlog({ author: '', title: '', url: '' }) 

/* 
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
    } */

  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>title
          <input type="text" value={newBlog.title} name="Title"
            onChange={handleChangeOfTitle}
          />
        </div>
        <div>author
          <input type="text" value={newBlog.author} name="Author"
            onChange={handleChangeOfAuthor} />
        </div>
        <div>url
          <input type="text" value={newBlog.url} name="URL"
            onChange={handleChangeOfUrl} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm