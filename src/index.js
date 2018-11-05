// higher-order component that passes the dimensions of the window as props to
// the wrapped component
import React, { Component } from 'react';

export default (ComposedComponent) => {

  class windowSize extends Component {

    constructor() {
      super();
      if (typeof window !== 'undefined') {
        this.state = {
          width: document.body.clientWidth,
          height: document.body.clientHeight,
        };
      }
    }

    handleResize() {
      // set initial state
      if (typeof window !== 'undefined') {
        this.setState({
          width: document.body.clientWidth,
          height: document.body.clientHeight,
        });
      }
    }

    componentDidMount() {
      // bind window resize listeners
      this._handleResize = this.handleResize.bind(this);
      typeof window !== 'undefined' && window.addEventListener('resize', this._handleResize);
      setTimeout(this._handleResize, 1000);
    }

    componentWillUnmount() {
      // clean up listeners
      typeof window !== 'undefined' && window.removeEventListener('resize', this._handleResize);
    }

    getWrappedInstance() {
      return this.wrappedInstance;
    }

    render() {
      // pass window dimensions as props to wrapped component
      return (
        <ComposedComponent
          {...this.props}
          ref={c => { this.wrappedInstance = c; }}
          windowWidth={this.state && this.state.width}
          windowHeight={this.state && this.state.height}
        />
      );
    }

  }

  const composedComponentName = ComposedComponent.displayName
    || ComposedComponent.name
    || 'Component';

  windowSize.displayName = `windowSize(${composedComponentName})`;
  return windowSize;

};
