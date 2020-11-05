/**
 *  @jest-environment node
 */
import React from 'react'
import axios from 'axios'

beforeAll(async () =>{
  const response = await axios.get('http://localhost:8080/swagger/api')
  const { data } = response
},30000)

test('web services available', async () => {
  jest.setTimeout(2000)
  const response = await axios.get('http://localhost:8080/swagger/api')
  const { data } = response
  expect(data.swagger).toEqual('2.0')
  const paths = Object.keys(data.paths)
  expect(paths.length).toBeGreaterThan(10)
  expect(paths).toContain('/annotationEditor/getAttributes')
})
