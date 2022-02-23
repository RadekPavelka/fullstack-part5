import React, { useState } from 'react'
//import blogService from '../services/blogs'

const Blog = ({ blog, currentUser, likeBlog, deleteBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }

  const incrementLikes = () => {
    likeBlog(blog)
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      deleteBlog(blog.id)
    }
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (detailsVisible) {
    return (
      <div style={blogStyle} className='blogDetails'>
        {blog.title} {blog.author} <button onClick={toggleVisibility} type="button">hide</button> <br />
        {blog.url}<br />
        likes:  {blog.likes} <button onClick={incrementLikes} type="button">like</button><br />
        user:  {blog.user ? blog.user.username : 'unknown'} <br />
        {currentUser === blog.user.username && <button onClick={removeBlog}>remove</button>}
      </div>
    )
  }

  return (
    <div style={blogStyle} className='blogGeneral' >
      {blog.title} {blog.author}
      <button onClick={toggleVisibility} type="button">view</button>
    </div>
  )
}

export default Blog