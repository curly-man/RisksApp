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
    // this.showRisk = this.showRisk.bind(this);
    // this.changeRisk = this.changeRisk.bind(this);
    // this.addRisk = this.addRisk.bind(this);
    // this.removeRisk = this.removeRisk.bind(this);
    // this.sortRisks = this.sortRisks.bind(this);
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

  sortRisks(sortType) {
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

  showRisk(event) {
    const id = this.getRiskID(event.target);
    let choseRisk;
    this.state.risks.map((risk) => {
      if (risk.id === id) {
        choseRisk = risk;
      }
      return null;
    });
    this.setState(() => ({ risk: choseRisk }));
  }

  async changeRisk(newRisk) {
    let risk;
    const { risks } = this.state;
    if (newRisk.id === '-1') {
      risk = await this.risksService.addRisk(newRisk);
      risks.push(risk);
    } else {
      risk = await this.risksService.updateRisk(newRisk);
      const oldRisk = risks.find((item, index) => item.id === risk.id);
      risks[risks.indexOf(oldRisk)] = risk;
    }
    this.setState(() => ({
      risks,
      risk: null,
    }));
  }

  addRisk() {
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

  removeRisk(riskID) {
    console.log(riskID);
    this.risksService.removeRisk(riskID)
      .then((result) => {
        let idx;
        this.state.risks.map((risk, index) => {
          if (risk.id === riskID) {
            delete this.state.risks[index];
          }
        });
        this.setState((state) => ({
          risks: state.risks,
          risk: null,
        }));
      });
  }

  componentDidMount() {
    this.getRisks();
  }

  render() {
    let riskInfo = null;
    let addButton = null;
    if (this.state.risk !== null) {
      riskInfo = <RiskInfo key={this.state.risk.id} risk={this.state.risk} onChangeRisk={(newRisk) => this.changeRisk(newRisk)} removeRisk={(riskID) => this.removeRisk(riskID)} manageRisk={this.props.manageRisk} />;
    } else {
      riskInfo = <div />;
    }
    if (this.props.manageRisk === true) {
      addButton = <button className="AvailableRisks-addButton" onClick={() => this.addRisk()}>Add Risk</button>;
    }
    return (
      <div id={`Manage-Risks-${this.props.manageRisk}`}>
        <div className="AvailableRisks">
          <h5 className="AvailableRisks-item">Available Risks:</h5>
          <RisksSort sortRisks={(id) => this.sortRisks(id)} />
          <RisksList risks={this.state.risks} onRiskClick={(event) => this.showRisk(event)} />
          {addButton}
        </div>
        {riskInfo}
        <div style={{ clear: 'both' }} />
      </div>
    );
  }
}

export default AvailableRisks;
