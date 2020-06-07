import React from 'react'
import './Input.css'

class Input extends React.Component {
    render() {
        return (
            <div id={this.props.id} className='Input'>
                <input className='Input-field' onChange={(event) => this.props.onInputChange(event.target.value, event.target.parentElement.id)} value={this.props.value}></input>
                <label>{this.props.label}</label>
            </div>
        )
    }
}

export default Input