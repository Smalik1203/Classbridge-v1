import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import Login from '../pages/Login';

describe('Login page', () => {
  it('renders application title', () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <Login />
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    );
    expect(screen.getByText(/Classbridge/i)).toBeInTheDocument();
  });
});
