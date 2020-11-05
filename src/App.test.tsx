/**
 *  @jest-environment jsdom
 */
import React from 'react'
import {render, screen} from '@testing-library/react'
import App from './App'
import axios from 'axios'

const timer = (ms: any) => new Promise(res => setTimeout(res, ms))


test('renders learn react link', async () => {
  render(<App/>)
  const linkElement = screen.getByText(/Web Services/i)
  expect(linkElement).toBeInTheDocument()
})

test('web services available', async () => {
  const wrapper = render(<App/>)
  const response = await axios.get('http://localhost:8080/swagger/api', {})
  const { data } = response
  expect(data.swagger).toEqual('2.0')
  const test1 = await screen.getByText(/Apollo 3 Web Services/i)
  expect(test1).toBeInTheDocument()
  await timer(2000)
  const linkElement = await screen.getByText(/Annotation Services/i)
  wrapper.asFragment()
  expect(linkElement).toBeInTheDocument()
})
