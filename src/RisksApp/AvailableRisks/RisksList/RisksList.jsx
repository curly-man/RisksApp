import React from 'react';
import RiskItem from './RiskItem/RiskItem';
import './RisksList.css';

function RisksList(props) {
  const { risks, onRiskClick } = props;
  const riskItems = risks.map((riskData) => (
    <RiskItem
      key={riskData.id}
      risk={riskData}
      onRiskClick={onRiskClick}
    />
  ));

  return (
    <div className="RisksList">
      {riskItems}
    </div>
  );
}

export default RisksList;
