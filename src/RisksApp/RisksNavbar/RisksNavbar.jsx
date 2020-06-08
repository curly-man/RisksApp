import React from 'react';
import './RisksNavbar.css';

class RisksNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.statusChange = this.statusChange.bind(this);
  }

  statusChange() {
    this.props.onStatusChange();
  }

  render() {
    return (
      <div className="navbar">
        <h3 className="header">Risk Management App</h3>
        <div className="menu">
          <span className={`App-active_${this.props.currentStatus}`} onClick={this.statusChange}>Manage Risks</span>
          <span className="vl" />
          <span onClick={() => this.props.logout()}>Log Out</span>
          <span className="vl" />
          <span>{this.props.userName}</span>
          <span className="circle" />
        </div>
      </div>
    );
  }
}

export default RisksNavbar;
