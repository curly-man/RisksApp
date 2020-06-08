import React from 'react';
import './RiskItem.css';

class RisksItem extends React.Component {
  // constructor(props) {
  //     super(props)
  // }


  render() {
    return (
      <div id={this.props.risk.id} className="RiskItem" onClick={(event) => this.props.onRiskClick(event)}>
        <span>{this.props.risk.name}</span>
        <span className="vl" />
        <span>{`${this.props.risk.likelyImpactTime}hrs `}</span>
        <span className="vl" />
        <span>{`${this.props.risk.likelyProbability}% `}</span>
      </div>
    );
  }
}

export default RisksItem;
