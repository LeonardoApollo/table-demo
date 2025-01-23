import React, { ReactNode, Suspense } from 'react';

import cls from './ErrorBoundary.module.scss';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  reloadPage() {
    location.reload();
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <Suspense fallback="">
          <div className={cls.ErrorPage}>
            <p>Произошла непредвиденная ошибка</p>
            <button onClick={this.reloadPage}>Обновить страницу</button>
          </div>
        </Suspense>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
