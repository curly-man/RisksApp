import React from 'react';
import LoginForm from './Login/LoginForm';
import UserStore from './Stores/UserStore';
import RisksApp from './RisksApp/RisksApp';
import './App.css';

const user = {
  name:'Anton',
  id: 1
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedUser: user };
    // this.state = { loggedUser: null };
  }

  loggingUser = (user) => {
    this.setState({
      loggedUser: new UserStore(user),
    });
  }

  logoutUser = () => {
    this.setState(() => ({ loggedUser: null }));
  }

  render() {
    const {loggedUser} = this.state
    return !this.state.loggedUser
      ? <LoginForm onLogged={this.loggingUser} />
      : <RisksApp user={loggedUser} logout={this.logoutUser} />
  }
}

export default App;
