import React from 'react';
import './InputForm.css';

class SubmitButton extends React.Component {
  constructor(props) {
    super(props);
    this.text = props.text;
  }

  render() {
    return (
      <input type="submit" value={this.text} onClick={(event) => this.props.action(event)} />
    );
  }
}

export default SubmitButton;
