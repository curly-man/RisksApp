import React from 'react';
import RiskItem from './RiskItem/RiskItem';
import './RisksList.css';

class RisksList extends React.Component {
  // constructor(props) {
  //     super(props)
  // }

  render() {
    const riskItems = this.props.risks.map((riskData) => <RiskItem key={riskData.id} risk={riskData} onRiskClick={this.props.onRiskClick} />);

    return (
      <div className="RisksList">
        {riskItems}
      </div>
    );
  }
}

export default RisksList;
