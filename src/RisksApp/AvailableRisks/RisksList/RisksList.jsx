import React from 'react';
import RiskItem from './RiskItem/RiskItem';
import './RisksList.css';

class RisksList extends React.Component {
  render() {
    // console.log(this.props.risks)
    const riskItems = this.props.risks.map((riskData) => {
      return <RiskItem key={riskData.id} risk={riskData} onRiskClick={(event) => this.props.onRiskClick(event)} />
    }
    );

    return (
      <div className="RisksList">
        {riskItems}
      </div>
    );
  }
}

export default RisksList;
