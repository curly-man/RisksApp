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
    const { data, onInfoChange } = this.props;
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
    onInfoChange(data);
  }

  render() {
    const { field, label, data } = this.props
    const { min, likely, max } = data
    const { warning } = this.state;
    const items = [min, likely, max].map((item, index) => {
      return (
        <Input
          key={`${field}_${index + 1}`}
          id={`${field}_${index + 1}`}
          label={label}
          onInputChange={this.onInputChange}
          value={item}
        />
      )
    })

    return (
      <div className="RiskInfo-item">
        <span className="InputInfo-field">{this.props.field}</span>
        <div className="InputInfo-inputs">
          {items}
        </div>
        <div className="InputInfo-warning">
          {warning &&
            <a>{warning}</a>
          }
        </div>
      </div>
    );
  }
}

export default InputInfo;
