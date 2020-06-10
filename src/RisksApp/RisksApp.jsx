import React from 'react';
import RisksNavbar from './RisksNavbar/RisksNavbar';
import AvailableRisks from './AvailableRisks/AvailableRisks';
import './RisksApp.css';

class RisksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      manageRisks: false,
    };
  }

  onStatusChange = () => {
    this.setState((state) => ({ manageRisks: !state.manageRisks }));
  }

  render() {
    const { logout } = this.props;
    const { user, manageRisks } = this.state;
    return (
      <div className="app">
        <div className="row">
          <RisksNavbar
            userName={user.name}
            currentStatus={this.state.manageRisks}
            onStatusChange={this.onStatusChange}
            logout={logout}
          />
        </div>
        <div className="row">
          <AvailableRisks user={user} risk={null} manageRisk={manageRisks} />
        </div>
      </div>
    );
  }
}

export default RisksApp;
