import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Login from '../pages/Login'

describe('Login page', () => {
  it('renders heading', () => {
    render(<Login />)
    expect(screen.getByText('Classbridge')).toBeInTheDocument()
  })
})
