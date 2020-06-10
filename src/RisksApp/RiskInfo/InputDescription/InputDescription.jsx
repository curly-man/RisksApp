import React from 'react';

function InputDescription(props) {
  const { onDescriptionChange, description } = props;
  return (
    <div className="RiskInfo-item">
      <a>Description:</a>
      <textarea
        className="RiskInfo-description"
        onChange={(event) => onDescriptionChange(event.target.value)}
        value={description}
      />
    </div>
  );
}

export default InputDescription;
