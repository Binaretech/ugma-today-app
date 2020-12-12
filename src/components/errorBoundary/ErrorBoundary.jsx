import React from 'react';
import Ups from '../ups';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError || !this.props.children) {
      return <Ups />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
