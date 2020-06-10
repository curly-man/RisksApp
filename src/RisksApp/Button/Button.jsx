import React from 'react';
import './Button.css';

function Button(props) {
  const { name, onButtonClick } = props;
  return (
    <button
      className={`Button-${name}`}
      onClick={onButtonClick}
    >
      {name}
    </button>
  );
}

export default Button;
