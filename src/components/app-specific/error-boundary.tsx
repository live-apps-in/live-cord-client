import React, { ErrorInfo } from "react";
import { ErrorUI } from "./error-ui";

export class ErrorBoundary extends React.Component<
  { children?: React.ReactNode },
  any
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, errorInfo: ErrorInfo): void {
    // console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) return <ErrorUI />;
    return this.props.children;
  }
}
