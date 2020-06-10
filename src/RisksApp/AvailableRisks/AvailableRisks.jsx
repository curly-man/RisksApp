import React from 'react';
import RisksSort from './RisksSort/RisksSort';
import RisksList from './RisksList/RisksList';
import RiskInfo from '../RiskInfo/RiskInfo';
import RisksService from '../RisksService/RisksService';
import './AvailableRisks.css';

class AvailableRisks extends React.Component {
  constructor(props) {
    super(props);
    this.risksService = new RisksService(this.props.user);
    this.state = {
      risks: [],
      risk: null,
    };
  }

  async getRisks() {
    const risks = await this.risksService.getRisks();
    this.setState({
      risks,
      risk: null,
    });
  }

  getRiskID(element) {
    if (element.tagName !== 'DIV') {
      element = element.parentElement;
    }
    return element.id;
  }

  sortRisks = (sortType) => {
    const { risks } = this.state;
    risks.sort((a, b) => {
      if (a[sortType] > b[sortType]) {
        return 1;
      }
      if (a[sortType] < b[sortType]) {
        return -1;
      }
      return 0;
    });
    this.setState(() => ({ risks }));
  }

  showRisk = (event) => {
    const id = this.getRiskID(event.target);
    const risk = this.state.risks.find((risk) => risk.id === id);
    this.setState(() => ({ risk: risk }));
  }

  changeRisk = async (newRisk) => {
    let risk;
    const { risks } = this.state;
    if (newRisk.id === '-1') {
      risk = await this.risksService.addRisk(newRisk);
      risks.push(risk);
    } else {
      risk = await this.risksService.updateRisk(newRisk);
      const oldRisk = risks.find((item) => item.id === risk.id);
      risks[risks.indexOf(oldRisk)] = risk;
    }
    this.setState(() => ({
      risks,
      risk: null,
    }));
  }

  addRisk = () => {
    this.setState((state) => ({
      risk: {
        id: '-1',
        name: '',
        description: '',
        userId: this.props.user.id,
        minProbability: 0,
        likelyProbability: 0,
        maxProbability: 0,
        minImpactTime: 0,
        likelyImpactTime: 0,
        maxImpactTime: 0,
      },
    }));
  }

  removeRisk = async (riskID) => {
    const result = await this.risksService.removeRisk(riskID)
    const risk = this.state.risks.find((risk) => risk.id === result.id)
    delete this.state.risks[this.state.risks.indexOf(risk)];
    this.setState((state) => ({
      risks: state.risks,
      risk: null,
    }));
  }

  componentDidMount() {
    this.getRisks();
  }

  render() {
    const sortParams = [
      { id: "likelyImpactTime", value: "Impact Time" },
      { id: "likelyProbability", value: "Probability"},
      { id: "name", value: "Name"}
    ]
    return (
      <div id={`Manage-Risks-${this.props.manageRisk}`}>
        <div className="AvailableRisks">
          <h5 className="AvailableRisks-item">Available Risks:</h5>
          <RisksSort params={sortParams} sortRisks={this.sortRisks} />
          <RisksList risks={this.state.risks} onRiskClick={this.showRisk} />
          {this.props.manageRisk &&
            <button className="AvailableRisks-addButton" onClick={this.addRisk}>Add Risk</button>
          }
        </div>
        {this.state.risk &&
          <RiskInfo key={this.state.risk.id} risk={this.state.risk} onChangeRisk={this.changeRisk} removeRisk={this.removeRisk} manageRisk={this.props.manageRisk} />
        }
        <div style={{ clear: 'both' }} />
      </div>
    );
  }
}

export default AvailableRisks;
