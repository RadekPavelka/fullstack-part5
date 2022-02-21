import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const { content } = render(<BlogForm createBlog={createBlog} />)


  const title = content.querySelector('#title-input')
  const author = content.querySelector('#author-input')
  const url = content.querySelector('#url-input')

 
  const sendButton = screen.getByText('create')

  //userEvent.type(input, 'testing a form...' )
  userEvent.click(sendButton)

  //expect(createBlog.mock.calls).toHaveLength(1)
  //expect(createBlog.mock.calls[0][0].content).toBe('testing a form...' )
})