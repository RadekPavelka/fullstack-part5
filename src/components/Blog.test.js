//Blog list tests, step1
//Make a test which checks that the component displaying a blog renders the blog's title and author, but does not render its url or number of likes by default.

//Add CSS-classes to the component to help the testing as necessary.
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'


test('renders content', () => {
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
})