import React from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import UserService from './UserService';
import './LoginForm.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.userService = new UserService();
    this.state = {
      login: '',
      password: '',
      warning: '',
    };
  }

  changeLogin = (event) => {
    this.setState({
      login: event.target.value,
    });
  }

  checkPassword(password){
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    let warning = '';
    if (!re.test(password)) {
      warning = 'A-Z, a-z, 0-9 >= 6';
      this.setState({
        warning,
      })
      return false
    }
    return true
  }

  changePassword = (event) => {
    const password = event.target.value;
    this.setState({
      password,
      warning: '',
    });
  }

  login = async () => {
    const users = await this.userService.getUser(this.state.login);
    const user = users.find((user) => user.name === this.state.login)
    if (user){
      if (user.password === this.state.password){
        this.props.onLogged(user);
        return
      }
    }
    this.setState({
      warning: 'Incorrect login or password'
    })
  }

  signup = async () => {
    if (!this.state.warning && this.state.login !== '' && this.state.password !== '') {
      if (this.checkPassword(this.state.password)){
        const user = await this.userService.createUser(this.state.login, this.state.password);
        this.props.onLogged(user);
      }
    }
  }

  render() {
    return (
      <div className="center">
        <InputField label="Login" type="text" onChange={this.changeLogin} />
        <InputField label="Password" type="password" onChange={this.changePassword} />
        {this.state.warning && <p className="warning">{this.state.warning}</p>}
        <div>
          <SubmitButton text="Log In" action={this.login} />
          <SubmitButton text="Sign Up" action={this.signup} />
        </div>
      </div>
    );
  }
}

export default LoginForm;
