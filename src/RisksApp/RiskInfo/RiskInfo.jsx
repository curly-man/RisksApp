import React from 'react'
import InputInfo from './InputInfo/InputInfo'
import Button from '../Button/Button'
import './RiskInfo.css'

class RiskInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.risk.id,
            userId: this.props.risk.userId,
            name: this.props.risk.name,
            description: this.props.risk.description,
            probability: {
                min: this.props.risk.minProbability,
                likely: this.props.risk.likelyProbability,
                max: this.props.risk.maxProbability,
            },
            impactTime: {
                min: this.props.risk.minImpactTime,
                likely: this.props.risk.likelyImpactTime,
                max: this.props.risk.maxImpactTime,
            }
        }
        this.onNameChange = this.onNameChange.bind(this)
        this.onDescriptionChange = this.onDescriptionChange.bind(this)
        this.onProbabilityChange = this.onProbabilityChange.bind(this)
        this.onImpactTimeChange = this.onImpactTimeChange.bind(this)
        this.onChangeRisk = this.onChangeRisk.bind(this)
        this.onResetClick = this.onResetClick.bind(this)
    }

    onNameChange(name) {
        this.setState((state) => {
            return { name: name }
        })
    }

    onDescriptionChange(description) {
        this.setState((state) => {
            return { description: description }
        })
    }

    onProbabilityChange(data) {
        this.setState((state) => {
            return { probability: data }
        })
    }

    onImpactTimeChange(data) {
        this.setState((state) => {
            return { impactTime: data }
        })
    }

    onChangeRisk() {
        const risk = {
            id: this.state.id,
            userId: this.state.userId,
            name: this.state.name,
            description: this.state.description,
            minProbability: this.state.probability.min,
            likelyProbability: this.state.probability.likely,
            maxProbability: this.state.probability.max,
            minImpactTime: this.state.impactTime.min,
            likelyImpactTime: this.state.impactTime.likely,
            maxImpactTime: this.state.impactTime.max,
        }
        this.props.onChangeRisk(risk)
    }

    onResetClick() {
        this.setState((state) => {
            return {
                name: this.props.risk.name,
                description: this.props.risk.description,
                probability: {
                    min: this.props.risk.minProbability,
                    likely: this.props.risk.likelyProbability,
                    max: this.props.risk.maxProbability,
                },
                impactTime: {
                    min: this.props.risk.minImpactTime,
                    likely: this.props.risk.likelyImpactTime,
                    max: this.props.risk.maxImpactTime,
                }
            }
        })
    }

    render() {
        let nameItem
        let deleteButton
        if (this.props.manageRisk !== true) {
            nameItem =
                <div >
                    <p className='RiskInfo-header'>{this.state.name}</p>
                </div>
        }
        else {
            nameItem =
                <div className='RiskInfo-item'>
                    <a>Name</a>
                    <input className='RiskInfo-input' onChange={(event) => this.onNameChange(event.target.value)} value={this.state.name}></input>
                </div>
            deleteButton = <Button name={'Remove'} onButtonClick={() => this.props.removeRisk(this.state.id)}></Button>
        }
        return (
            <div id={this.props.risk.id} className='RiskInfo'>
                {nameItem}
                <div className='RiskInfo-item'>
                    <a>Description:</a>
                    <textarea className='RiskInfo-description' onChange={(event) => this.onDescriptionChange(event.target.value)} value={this.state.description}></textarea>
                </div>
                <div className='RiskInfo-item'>
                    <span className='RiskInfo-column-30'></span>
                    <span className='RiskInfo-column-20'>Min</span>
                    <span className='RiskInfo-column-20'>Likely</span>
                    <span className='RiskInfo-column-20'>Max</span>
                </div>
                <div className='RiskInfo-item'>
                    <InputInfo data={this.state.probability} field={'Probability'} onInfoChange={this.onProbabilityChange} label={'%'}></InputInfo>
                </div>
                <br></br>
                <div className='RiskInfo-item'>
                    <InputInfo data={this.state.impactTime} field={'Impact Time'} onInfoChange={this.onImpactTimeChange} label={'h'}></InputInfo>
                </div>
                <div className='RiskInfo-bottom'>
                    <Button name={'Apply'} onButtonClick={this.onChangeRisk}></Button>
                    {deleteButton}
                    <Button name={'Reset'} onButtonClick={this.onResetClick}></Button>
                </div>
            </div >
        )
    }
}

export default RiskInfo