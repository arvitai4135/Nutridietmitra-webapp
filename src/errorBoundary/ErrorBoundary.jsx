// src/components/ErrorBoundary.jsx
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-500 p-4">
          <h2>Something went wrong.</h2>
          <p>{this.state.error.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;