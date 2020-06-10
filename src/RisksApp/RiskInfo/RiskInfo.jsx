import React from 'react';
import InputInfo from './InputInfo/InputInfo';
import Button from '../Button/Button';
import InputDescription from './InputDescription/InputDescription';
import LabelForInputInfo from './InputInfo/labelForInputInfo';
import InputName from './InputName/InputName'
import './RiskInfo.css';

class RiskInfo extends React.Component {
  constructor(props) {
    super(props);
    const { risk } = this.props
    this.state = {
      id: risk.id,
      userId: risk.userId,
      name: risk.name,
      description: risk.description,
      probability: {
        min: risk.minProbability,
        likely: risk.likelyProbability,
        max: risk.maxProbability,
      },
      impactTime: {
        min: risk.minImpactTime,
        likely: risk.likelyImpactTime,
        max: risk.maxImpactTime,
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
    const { onChangeRisk } = this.props
    const { id, userId, name, description, probability, impactTime } = this.state
    if (!name) {
      document.getElementById('NameInput').classList += " Warn"
      return
    }
    const risk = {
      id: id,
      userId: userId,
      name: name,
      description: description,
      minProbability: probability.min,
      likelyProbability: probability.likely,
      maxProbability: probability.max,
      minImpactTime: impactTime.min,
      likelyImpactTime: impactTime.likely,
      maxImpactTime: impactTime.max,
    };
    onChangeRisk(risk);
  }

  onRemoveRisk = () => {
    const { id } = this.state
    const { removeRisk } = this.props
    removeRisk(id)
  }

  onResetClick = () => {
    const { risk } = this.props
    this.setState(() => ({
      name: risk.name,
      description: risk.description,
      probability: {
        min: risk.minProbability,
        likely: risk.likelyProbability,
        max: risk.maxProbability,
      },
      impactTime: {
        min: risk.minImpactTime,
        likely: risk.likelyImpactTime,
        max: risk.maxImpactTime,
      },
    }));
  }

  render() {
    const { riskId, manageRisk } = this.props
    const { name, description } = this.state
    return (
      <div id={riskId} className="RiskInfo">
        <InputName
          name={name}
          manageRisk={manageRisk}
          changeName={this.onNameChange}
        />
        <InputDescription
          onDescriptionChange={this.onDescriptionChange}
          description={this.state.description}
        />
        <LabelForInputInfo />
        <InputInfo
          data={this.state.probability}
          field="Probability"
          onInfoChange={this.onProbabilityChange}
          label="%"
        />
        <InputInfo
          data={this.state.impactTime}
          field="Impact Time"
          onInfoChange={this.onImpactTimeChange}
          label="h"
        />
        <div className="RiskInfo-bottom">
          <Button
            name="Apply"
            onButtonClick={this.onChangeRisk}
          />
          {this.props.manageRisk &&
            <Button
              name="Remove"
              onButtonClick={this.onRemoveRisk}
            />
          }
          <Button
            name="Reset"
            onButtonClick={this.onResetClick}
          />
        </div>
      </div>
    );
  }
}

export default RiskInfo;
