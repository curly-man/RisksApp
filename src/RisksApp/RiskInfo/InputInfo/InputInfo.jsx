import React from 'react'
import Input from '../Input/Input'
import './InputInfo.css'

class InputInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data,
            warning: null
        }
        this.onInputChange = this.onInputChange.bind(this)
    }

    onInputChange(value, elementID) {
        const data = this.props.data
        if (Number.isNaN(Number(value))){
            return
        }
        const id = Number(elementID.split('_')[1])
        if (id === 1) {
            if (Number(value) > data.max){
                this.setState(() => {
                    return {warning: "min should be less than max"}
                })
                return
            }
            data.min = Number(value)
        }
        if (id === 2) {
            data.likely = Number(value)
        }
        if (id === 3) {
            if (Number(value) < data.min){
                this.setState(() => {
                    return {warning: "max should be more than min"}
                })
                return
            }
            data.max = Number(value)
        }
        this.setState({
            data: data
        })
        this.setState(() => {
            return {warning: null}
        })
        this.props.onInfoChange(data)
    }

    render() {
        let warning
        if (this.state.warning !== null){
            warning = <a>{this.state.warning}</a>
        }
        return (
            <div className=''>
                <span className='InputInfo-field'>{this.props.field}</span>
                <div className='InputInfo-inputs'>
                    <Input id={this.props.field + '_1'} label={this.props.label} onInputChange={this.onInputChange} value={this.props.data.min}></Input>
                    <Input id={this.props.field + '_2'} label={this.props.label} onInputChange={this.onInputChange} value={this.props.data.likely}></Input>
                    <Input id={this.props.field + '_3'} label={this.props.label} onInputChange={this.onInputChange} value={this.props.data.max}></Input>
                </div>
                <div className='InputInfo-warning'>
                    {warning}
                </div>
            </div>
        )
    }
}

export default InputInfo