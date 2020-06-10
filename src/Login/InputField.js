import React from 'react';
import './InputForm.css';

class InputField extends React.Component {
  render() {
    return (
      <label>
        <b>{this.props.label}</b>
        <input type={this.props.type} onChange={(event) => this.props.onChange(event)} />
      </label>
    );
  }
}

export default InputField;
