import React, { useState } from 'react'

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

  }

  return (
    <div className="formDiv">
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>title
          <input type="text" id="title-input" value={newBlog.title} name="Title"
            onChange={handleChangeOfTitle} placeholder="write the title of the blog"
          />
        </div>
        <div>author
          <input type="text" id="author-input" value={newBlog.author} name="Author"
            onChange={handleChangeOfAuthor} placeholder="write the author"/>
        </div>
        <div>url
          <input type="text" id="url-input" value={newBlog.url} name="URL"
            onChange={handleChangeOfUrl} placeholder="write blog's url" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm