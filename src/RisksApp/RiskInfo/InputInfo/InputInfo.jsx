import React from 'react';
import Input from '../Input/Input';
import './InputInfo.css';

class InputInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      warning: null,
    };
  }

  onInputChange = (value, elementID) => {
    const { data } = this.props;
    const newValue = Number(value);
    if (Number.isNaN(newValue)) {
      return;
    }
    const id = Number(elementID.split('_')[1]);
    if (id === 1) {
      if (newValue > data.max) {
        this.setState(() => ({ warning: 'min should be less than max' }));
        return;
      }
      data.min = newValue;
    }
    if (id === 2) {
      data.likely = newValue;
    }
    if (id === 3) {
      if (newValue < data.min) {
        this.setState(() => ({ warning: 'max should be more than min' }));
        return;
      }
      data.max = newValue;
    }
    this.setState({
      data,
      warning: null,
    });
    this.props.onInfoChange(data);
  }

  render() {
    return (
      <div className="RiskInfo-item">
        <span className="InputInfo-field">{this.props.field}</span>
        <div className="InputInfo-inputs">
          <Input id={`${this.props.field}_1`} label={this.props.label} onInputChange={this.onInputChange} value={this.props.data.min} />
          <Input id={`${this.props.field}_2`} label={this.props.label} onInputChange={this.onInputChange} value={this.props.data.likely} />
          <Input id={`${this.props.field}_3`} label={this.props.label} onInputChange={this.onInputChange} value={this.props.data.max} />
        </div>
        <div className="InputInfo-warning">
          {this.state.warning &&
            <a>{this.state.warning}</a>
          }
        </div>
      </div>
    );
  }
}

export default InputInfo;
