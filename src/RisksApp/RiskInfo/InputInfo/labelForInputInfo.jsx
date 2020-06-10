import React from 'react';

function LabelForInputInfo(props) {
  return (
    <div className="RiskInfo-item">
      <span className="RiskInfo-column-30" />
      <span className="RiskInfo-column-20">Min</span>
      <span className="RiskInfo-column-20">Likely</span>
      <span className="RiskInfo-column-20">Max</span>
    </div>
  );
}

export default LabelForInputInfo;
