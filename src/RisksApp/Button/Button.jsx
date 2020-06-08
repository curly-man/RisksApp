import React from 'react';
import './Button.css';

class Button extends React.Component {
  render() {
    return (
      <button className={`Button-${this.props.name}`} onClick={() => this.props.onButtonClick()}>{this.props.name}</button>
    );
  }
}

export default Button;
