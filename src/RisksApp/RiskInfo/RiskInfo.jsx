import React from 'react';
import InputInfo from './InputInfo/InputInfo';
import Button from '../Button/Button';
import InputDescription from './InputDescription/InputDescription';
import LabelForInputInfo from './InputInfo/labelForInputInfo';
import './RiskInfo.css';

class RiskInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.risk.id,
      userId: this.props.risk.userId,
      name: this.props.risk.name,
      description: this.props.risk.description,
      probability: {
        min: this.props.risk.minProbability,
        likely: this.props.risk.likelyProbability,
        max: this.props.risk.maxProbability,
      },
      impactTime: {
        min: this.props.risk.minImpactTime,
        likely: this.props.risk.likelyImpactTime,
        max: this.props.risk.maxImpactTime,
      },
    };
  }

  onNameChange = (name) => {
    this.setState(() => ({ name }));
  }

  onDescriptionChange = (description) => {
    this.setState(() => ({ description }));
  }

  onProbabilityChange = (data) => {
    this.setState(() => ({ probability: data }));
  }

  onImpactTimeChange = (data) => {
    this.setState(() => ({ impactTime: data }));
  }

  onChangeRisk = () => {
    if (!this.state.name){
      document.getElementById('NameInput').classList += " Warn"
      return
    }
    const risk = {
      id: this.state.id,
      userId: this.state.userId,
      name: this.state.name,
      description: this.state.description,
      minProbability: this.state.probability.min,
      likelyProbability: this.state.probability.likely,
      maxProbability: this.state.probability.max,
      minImpactTime: this.state.impactTime.min,
      likelyImpactTime: this.state.impactTime.likely,
      maxImpactTime: this.state.impactTime.max,
    };
    this.props.onChangeRisk(risk);
  }

  onResetClick = () => {
    this.setState(() => ({
      name: this.props.risk.name,
      description: this.props.risk.description,
      probability: {
        min: this.props.risk.minProbability,
        likely: this.props.risk.likelyProbability,
        max: this.props.risk.maxProbability,
      },
      impactTime: {
        min: this.props.risk.minImpactTime,
        likely: this.props.risk.likelyImpactTime,
        max: this.props.risk.maxImpactTime,
      },
    }));
  }

  render() {
    return (
      <div id={this.props.risk.id} className="RiskInfo">
        {this.props.manageRisk ?
          <div className="RiskInfo-item">
            <a>Name</a>
            <input id='NameInput' className="RiskInfo-input" onChange={(event) => this.onNameChange(event.target.value)} value={this.state.name} />
          </div>
          :
          <p className="RiskInfo-header">{this.state.name}</p>
        }
        <InputDescription onDescriptionChange={this.onDescriptionChange} description={this.state.description} />
        <LabelForInputInfo />
        <InputInfo data={this.state.probability} field="Probability" onInfoChange={this.onProbabilityChange} label="%" />
        <InputInfo data={this.state.impactTime} field="Impact Time" onInfoChange={this.onImpactTimeChange} label="h" />
        <div className="RiskInfo-bottom">
          <Button name="Apply" onButtonClick={this.onChangeRisk} />
          {this.props.manageRisk &&
            <Button name="Remove" onButtonClick={() => this.props.removeRisk(this.state.id)} />
          }
          <Button name="Reset" onButtonClick={this.onResetClick} />
        </div>
      </div>
    );
  }
}

export default RiskInfo;
