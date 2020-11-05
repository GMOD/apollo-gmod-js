/**
 *  @jest-environment jsdom
 */
import React from 'react'
import {render, screen} from '@testing-library/react'
import App from './App'

test('renders learn react link', async () => {
  render(<App/>)
  const linkElement = screen.getByText(/Web Services/i)
  expect(linkElement).toBeInTheDocument()
})

