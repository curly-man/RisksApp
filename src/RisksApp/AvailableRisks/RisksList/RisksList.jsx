import React from 'react';
import RiskItem from './RiskItem/RiskItem';
import './RisksList.css';

class RisksList extends React.Component {
  render() {
    const riskItems = this.props.risks.map((riskData) => <RiskItem key={riskData.id} risk={riskData} onRiskClick={(event) => this.props.onRiskClick(event)} />);

    return (
      <div className="RisksList">
        {riskItems}
      </div>
    );
  }
}

export default RisksList;
