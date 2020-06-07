import React from 'react';
import LoginForm from './Login/LoginForm'
import UserStore from './Stores/UserStore'
import RisksApp from './RisksApp/RisksApp'
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loggedUser: null }
    this.loggingUser = this.loggingUser.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
  }

  loggingUser(user) {
    this.setState({
      loggedUser: new UserStore(user)
    })
    console.log(this.state)
  }

  logoutUser() {
    this.setState(() => {
      return { loggedUser: null }
    })
  }

  render() {
    if (this.state.loggedUser === null) {
      return (
        <div className='app'>
          <LoginForm onLogged={this.loggingUser}></LoginForm>
        </div>
      );
    }
    else {
      return (
        <div className='app'>
          <RisksApp user={this.state.loggedUser} logout={this.logoutUser}></RisksApp>
        </div>
      )
    }
  }
}

export default App;
