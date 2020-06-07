import React from 'react'
import InputField from './InputField'
import SubmitButton from './SubmitButton'
import UserService from './UserService'
import './LoginForm.css';

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.userService = new UserService()
        this.state = {
            login: '',
            password: '',
            warning: ''
        }
        this.changeLogin = this.changeLogin.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.login = this.login.bind(this)
        this.signup = this.signup.bind(this)
    }

    changeLogin(event) {
        this.setState({
            login: event.target.value
        })
    }

    changePassword(event) {
        let password = event.target.value
        let warning = ''
        if (password.length <= 6) {
            warning = "length less than 6 characters\n"
        }
        if (password.search(/\d/) === -1) {
            warning = "use numbers\n"
        }
        if (password.toLowerCase() === password) {
            warning = "use A-Z characters\n"
        }
        if (password.toUpperCase() === password) {
            warning = "use a-z characters\n"
        }
        console.log(warning)
        this.setState({
            password: password,
            warning: warning
        })
    }

    login() {
        this.userService.getUser(this.state.login)
            .then((users) => {
                for (let i = 0; i < users.length; i++) {
                    if (users[i].name === this.state.login) {
                        let user = users[i]
                        this.setState({
                            user: user
                        })
                        if (user.password === this.state.password) {
                            this.props.onLogged(user)
                            console.log('logged')
                        }
                        else {
                            console.log('PASSW DONOT MATCH')
                        }
                        break
                    }
                }
            })
    }

    signup() {
        console.log(this.state.warning)
        if (this.state.warning === ""){
            this.userService.createUser(this.state.login, this.state.password)
        }
    }

    render() {
        let warning
        if (this.state.warning !== '') {
            warning = <p className='warning'>{this.state.warning}</p>
        }
        return (
            <div className='center'>
                <InputField label='Login' onChange={this.changeLogin}></InputField>
                <InputField label='Password' onChange={this.changePassword}></InputField>
                {warning}
                <div>
                    <SubmitButton text='Log In' action={this.login}></SubmitButton>
                    <SubmitButton text='Sign Up' action={this.signup}></SubmitButton>
                </div>
            </div>
        )
    }
}

export default LoginForm