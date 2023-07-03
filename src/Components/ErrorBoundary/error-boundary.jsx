import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // if an error happened, set the state to true
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(this.props.compName + " " + error + " stack: " + errorInfo.componentStack)
    window.parent.BabelUI.LogError(this.props.compName + " " + error + " stack: " + errorInfo.componentStack);
  }

  render() {
    // if error happened, return a fallback component
    if (this.state.hasError) {
      return <>Something went wrong please report the error</>
    }

    return this.props.children;
  }
}