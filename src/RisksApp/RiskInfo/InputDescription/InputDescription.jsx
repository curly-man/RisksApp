import React from 'react';

function InputDescription(props) {
  return (
    <div className="RiskInfo-item">
      <a>Description:</a>
      <textarea className="RiskInfo-description" onChange={(event) => props.onDescriptionChange(event.target.value)} value={props.description} />
    </div>
  );
}

export default InputDescription;
