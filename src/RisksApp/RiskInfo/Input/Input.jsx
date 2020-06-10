import React from 'react';
import './Input.css';

function Input(props) {
  const {
    onInputChange, id, label, value,
  } = props;
  return (
    <div id={id} className="Input">
      <input
        className="Input-field"
        onChange={(event) => onInputChange(event.target.value, event.target.parentElement.id)}
        value={value}
      />
      <label>{label}</label>
    </div>
  );
}

export default Input;
