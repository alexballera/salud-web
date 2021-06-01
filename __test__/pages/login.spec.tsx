import React from 'react'
import { unmountComponentAtNode } from 'react-dom'
import { act, render, screen } from '@testing-library/react'
import LoginPage from '../../src/pages/login'
import axios from 'axios'

let container = null
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

beforeAll(() => {
  jest.mock('axios')
  // jest.mock('next/router')

  jest.mock('next/router', () => require('next-router-mock'))
})
afterAll(() => {
  jest.unmock('axios')
})

describe('HomePage', () => {
  it('should render HomePage without throwing an error', async () => {
    act(() => {
      render(<LoginPage />, container)
    })
  })

  it('should call the api to login', async () => {
    // Mocks
    axios.post = jest.fn()

    act(() => {
      render(<LoginPage />, container)
    })

    // Simulate login
    const loginButton = await screen.findByTestId('login-button')
    loginButton.click()

    expect(axios.post).toBeCalledWith('/login')
  })
})
