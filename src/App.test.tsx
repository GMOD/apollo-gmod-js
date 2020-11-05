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

test('web services available', async () => {
  render(<App/>)
  const response = await fetch('http://localhost:8080/swagger/api', {})
  const result = JSON.parse(JSON.stringify(await response.json()))

  expect(result.swagger).toEqual('2.0')
  const linkElement = await screen.getByText(/Annotation Services/i)
  expect(linkElement).toBeInTheDocument()
})
