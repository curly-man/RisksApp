import React from 'react';
import './RisksNavbar.css';

class RisksNavbar extends React.Component {
  constructor(props) {
    super(props);
  }

  statusChange = () => {
    const { onStatusChange } = this.props;
    onStatusChange();
  }

  render() {
    const { currentStatus, userName, logout } = this.props;
    return (
      <div className="navbar">
        <h3 className="header">Risk Management App</h3>
        <div className="menu">
          <span
            className={`App-active_${currentStatus}`}
            onClick={this.statusChange}
          >
            Manage Risks
          </span>
          <span className="vl" />
          <span
            onClick={logout}
          >
            Log Out
          </span>
          <span className="vl" />
          <span>{userName}</span>
          <span className="circle" />
        </div>
      </div>
    );
  }
}

export default RisksNavbar;
