import React from 'react';
import './Input.css';

function Input(props) {
  return (
    <div id={props.id} className="Input">
      <input className="Input-field" onChange={(event) => props.onInputChange(event.target.value, event.target.parentElement.id)} value={props.value} />
      <label>{props.label}</label>
    </div>
  );
}

export default Input;
