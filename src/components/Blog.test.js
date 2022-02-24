//Blog list tests, step1
//Make a test which checks that the component displaying a blog renders the blog's title and author, but does not render its url or number of likes by default.

//Add CSS-classes to the component to help the testing as necessary.
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'


/* test('renders url and likes when on view button click', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Ian Tester',
    url: 'componenttest.com',
    likes: 10
  }

  //const mockHandler = jest.fn()

  const { container }= render(<Blog blog={blog} />)

  const button = screen.getByText('view')
  userEvent.click(button)
  const div = container.querySelector('.blogGeneral')
  //render(<Blog blog={blog}/>)
  //screen.debug(div)
  //const {element} = screen.getByText('Component testing is done with react-testing-library')
  expect(div).toBeDefined()
}) */

/* test('renders only title and author by default', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Ian Tester',
    url: 'componenttest.com',
    likes: 10
  }
  //blog, currentUser, likeBlog, deleteBlog
  render(<Blog blog={blog} />)

  const title = screen.getByText('Component testing is done with react-testing-library')
  expect(title).toBeDefined()

  const author = screen.getByText('Ian Tester')
  expect(author).toBeDefined()

  const url = screen.getByText('componenttest.com')
  expect(url).toBeNull()

  const likes = screen.getByText('likes')
  expect(likes).toBeNull()
}) */

describe('<Blog />', () => {
  let container, likeBlog

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Ian Tester',
    url: 'componenttest.com',
    likes: 10,
    user: { username: 'admin' }
  }


  beforeEach(() => {
    likeBlog = jest.fn()
    container = render(<Blog blog={blog} currentUser={'admin'} likeBlog={likeBlog} />).container
  })


  test('at start the blog details are not displayed', () => {
    const div = container.querySelector('.blogGeneral')
    expect(div).toBeDefined()
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    const url = screen.queryByText(blog.url)
    expect(url).toBeNull()
    const likes = screen.queryByText(blog.likes)
    expect(likes).toBeNull()
  })

  test('after clicking the button, blog details are displayed', () => {
    const button = screen.getByText('view')
    userEvent.click(button)

    const div = container.querySelector('.blogDetails')
    expect(div).toBeDefined()
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(div).toHaveTextContent(blog.url)
    expect(div).toHaveTextContent(blog.likes)
  })
  test('if like button is clicked twice, the related event handler is called twice', () => {
    const viewButton = screen.getByText('view')
    userEvent.click(viewButton)

    const likeButton = screen.getByText('like')

    userEvent.click(likeButton)
    userEvent.click(likeButton)

    expect(likeBlog.mock.calls).toHaveLength(2)
  })
})


