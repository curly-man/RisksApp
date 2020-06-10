import React from 'react';

function InputName(props) {
  const { manageRisk, name, changeName } = props;
  if (!manageRisk) {
    return <p className="RiskInfo-header">{name}</p>;
  }
  return (
    <div className="RiskInfo-item">
      <a>Name:</a>
      <input
        id="NameInput"
        className="RiskInfo-input"
        onChange={(event) => changeName(event.target.value)}
        value={name}
      />
    </div>
  );
}

export default InputName;
