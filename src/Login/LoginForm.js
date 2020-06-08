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
    this.changeLogin = this.changeLogin.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
  }

  changeLogin(event) {
    this.setState({
      login: event.target.value,
    });
  }

  changePassword(event) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    const password = event.target.value;
    let warning = '';
    if (!re.test(password)) {
      warning = 'A-Z, a-z, 0-9 >= 6';
    }
    this.setState({
      password,
      warning,
    });
  }

  async login() {
    const users = await this.userService.getUser(this.state.login);
    users.map((user) => {
      if (user.name === this.state.login) {
        this.setState({
          user,
        });
        if (user.password === this.state.password) {
          this.props.onLogged(user);
        }
      }
      return null;
    });
  }

  signup() {
    if (!this.state.warning && this.state.login !== '' && this.state.password !== '') {
      this.userService.createUser(this.state.login, this.state.password);
    }
  }

  render() {
    let warning;
    if (this.state.warning) {
      warning = <p className="warning">{this.state.warning}</p>;
    }
    return (
      <div className="center">
        <InputField label="Login" type="text" onChange={this.changeLogin} />
        <InputField label="Password" type="password" onChange={this.changePassword} />
        {warning}
        <div>
          <SubmitButton text="Log In" action={this.login} />
          <SubmitButton text="Sign Up" action={this.signup} />
        </div>
      </div>
    );
  }
}

export default LoginForm;
