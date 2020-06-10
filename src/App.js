import React from 'react';
import LoginForm from './Login/LoginForm';
import UserStore from './Stores/UserStore';
import RisksApp from './RisksApp/RisksApp';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedUser: null };
  }

  loggingUser(user) {
    this.setState({
      loggedUser: new UserStore(user),
    });
  }

  logoutUser = () => {
    this.setState(() => ({ loggedUser: null }));
  }

  render() {
    return !this.state.loggedUser
      ? <LoginForm onLogged={(user) => this.loggingUser(user)} />
      : <RisksApp user={this.state.loggedUser} logout={this.logoutUser} />;
    // if (!this.state.loggedUser) {
    //   return (
    //     <LoginForm onLogged={(user) => this.loggingUser(user)} />
    //   );
    // }
    // return (
    //   <RisksApp user={this.state.loggedUser} logout={() => this.logoutUser()} />
    // );
  }
}

export default App;
