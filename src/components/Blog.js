import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, deleteBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  //const [isRemovable, setIsRemovable] = useState(false)



  const toggleVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }

  const incrementLikes = () => {
    blogService
      .update(blog.id, { ...blog, likes: ++blog.likes })
      .then(returnedBlog => {
        setLikes(returnedBlog.likes)
      })
      .catch(error => {
        console.log('Something went wrong, error: ', error)
      })

  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      deleteBlog(blog.id)
    }
  }

  /*   const checkRemovability = () => {
      console.log('checking for removibility')
      if (!(blog.user)) {
        console.log('returning false from isRemovable')
        //setIsRemovable(false)
        return false

      }
      //setIsRemovable(true)
      return true //currentUser === blog.user.username
    }

  /*   const showWhenRemovable = { display: isRemovable ? '' : 'none' }
   */
  /*   const toggleRemovabity = () => {
    setIsRemovable(!isRemovable)
  } */



  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (detailsVisible) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={toggleVisibility} type="button">hide</button> <br />
        {blog.url}<br />
        likes:  {likes} <button onClick={incrementLikes} type="button">like</button><br />
        user:  {blog.user ? blog.user.username : 'unknown'} <br />
        <button onClick={removeBlog}>remove</button>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility} type="button">view</button>
    </div>
  )
}

export default Blog