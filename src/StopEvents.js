import React, { PureComponent } from 'react';

const stop = (event) => {
  event.stopPropagation();
};

export default class StopEvents extends PureComponent {
  render() {
    return (
      <span onPointerDown={stop}>
        {this.props.children}
      </span>
    );
  }
}
