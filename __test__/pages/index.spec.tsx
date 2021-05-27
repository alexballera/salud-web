import React from 'react'
import { render } from '@testing-library/react'
import HomePage from '../../src/pages'

describe('HomePage', () => {
  test('should render HomePage without throwing an error', async () => {
    render(<HomePage />)
  })
})
