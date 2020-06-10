import React from 'react';
import './RiskItem.css';

function RisksItem(props) {
  const { risk, onRiskClick } = props;
  return (
    <div id={risk.id} className="RiskItem" onClick={(event) => onRiskClick(event)}>
      <span>{risk.name}</span>
      <span className="vl" />
      <span>{`${risk.likelyImpactTime}hrs `}</span>
      <span className="vl" />
      <span>{`${risk.likelyProbability}% `}</span>
    </div>
  );
}

export default RisksItem;
