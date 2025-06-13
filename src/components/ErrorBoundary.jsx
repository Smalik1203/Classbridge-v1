import React from 'react'

export class ErrorBoundary extends React.Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Unexpected error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-destructive text-destructive-foreground rounded-md">
          <p>Something went wrong. Please try again later.</p>
        </div>
      )
    }
    return this.props.children
  }
}
