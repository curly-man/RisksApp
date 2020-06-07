import React from 'react'
import './InputForm.css';

class InputField extends React.Component {
    render() {
        return (
            <div>
                <label>
                    <b>{this.props.label}</b>
                    <input type='text' onChange={(event) => this.props.onChange(event)}></input>
                </label>
            </div>
        )
    }
}

export default InputField