import React from 'react';

class ErrorBoundary extends React.Component {
    constructor() {
        super();
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    render() {
        if (this.state.hasError) {
            return <div>Something went wrong</div>
        }
        return this.props.children;
    }
};

export default ErrorBoundary;