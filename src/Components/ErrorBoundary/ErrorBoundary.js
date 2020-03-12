import React, { Component } from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      redirect: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { error: true };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="Main error">
          Oops, error occured! Sorry about that. Please try refreshing your
          browser.{' '}
          <span role="img" aria-label="sad cat because error">
            😿
          </span>
        </div>
      );
    } else return this.props.children;
  }
}

export default ErrorBoundary;
