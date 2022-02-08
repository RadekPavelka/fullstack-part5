import React from 'react'

const BlogForm = ({onSubmit, newBlog, handleAuthorChange, handleTitleChange, handleUrlChange}) => {

return (
    <div>
      <h2>create new</h2>
      <form onSubmit={onSubmit}>
        <div>title
          <input type="text" value={newBlog.title} name="Title"
          onChange={handleTitleChange}
          />
        </div>
        <div>author
          <input type="text" value={newBlog.author} name="Author"
          onChange={handleAuthorChange} />
        </div>
        <div>url
          <input type="text" value={newBlog.url} name="URL"
          onChange={handleUrlChange} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  ) 
}

export default BlogForm