import React from 'react'
import RisksSort from './RisksSort/RisksSort'
import RisksList from './RisksList/RisksList'
import RiskInfo from '../RiskInfo/RiskInfo'
import RisksService from '../RisksService/RisksService'
import './AvailableRisks.css'

class AvailableRisks extends React.Component {
    constructor(props) {
        super(props)
        this.risksService = new RisksService(this.props.user)
        this.state = {
            risks: [],
            risk: null
        }
        this.showRisk = this.showRisk.bind(this)
        this.changeRisk = this.changeRisk.bind(this)
        this.addRisk = this.addRisk.bind(this)
        this.removeRisk = this.removeRisk.bind(this)
        this.sortRisks = this.sortRisks.bind(this)
    }

    sortRisks(sortType) {
        let risks = this.state.risks
        if (sortType === '3') {
            risks.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
            });
        }
        if (sortType === '2') {
            risks.sort(function (a, b) {
                if (a.likelyProbability > b.likelyProbability) {
                    return 1;
                }
                if (a.likelyProbability < b.likelyProbability) {
                    return -1;
                }
                return 0;
            });
        }
        if (sortType === '1') {
            risks.sort(function (a, b) {
                if (a.likelyImpactTime > b.likelyImpactTime) {
                    return 1;
                }
                if (a.likelyImpactTime < b.likelyImpactTime) {
                    return -1;
                }
                return 0;
            });
        }
        this.setState(() => {
            return { risks: risks }
        })
    }

    getRisks() {
        this.risksService.getRisks()
            .then((risks) => {
                this.setState({
                    risks: risks,
                    risk: null
                })
            })
    }

    getRiskID(element) {
        if (element.tagName !== 'DIV') {
            element = element.parentElement
        }
        return element.id
    }

    showRisk(event) {
        let id = this.getRiskID(event.target)
        let choseRisk
        this.state.risks.map((risk) => {
            if (risk.id === id) {
                choseRisk = risk
            }
            return null
        })
        this.setState(() => {
            return { risk: choseRisk }
        })
    }

    changeRisk(newRisk) {
        if (newRisk.id === "-1") {
            this.risksService.addRisk(newRisk)
                .then((result) => {
                    const risks = this.state.risks
                    risks[result.id] = result
                    this.setState((state) => {
                        return {
                            risks: risks,
                            risk: null
                        }
                    })
                })
        }
        else {
            this.risksService.updateRisk(newRisk)
                .then((result) => {
                    this.state.risks.map((risk, index) => {
                        if (risk.id === result.id) {
                            const risks = this.state.risks
                            risks[index] = result
                            this.setState(() => {
                                return {
                                    risks: risks,
                                    risk: null
                                }
                            })
                        }
                    })
                })
        }
    }

    addRisk() {
        this.setState((state) => {
            return {
                risk: {
                    id: '-1',
                    name: '',
                    description: '',
                    userId: this.props.user.id,
                    minProbability: 0,
                    likelyProbability: 0,
                    maxProbability: 0,
                    minImpactTime: 0,
                    likelyImpactTime: 0,
                    maxImpactTime: 0,
                }
            }
        })
    }

    removeRisk(riskID) {
        console.log(riskID)
        this.risksService.removeRisk(riskID)
            .then((result) => {
                let idx
                this.state.risks.map((risk, index) => {
                    if (risk.id === riskID) {
                        delete this.state.risks[index]
                    }
                })
                this.setState((state) => {
                    return {
                        risks: state.risks,
                        risk: null
                    }
                })
            })
    }

    componentDidMount() {
        this.getRisks()
    }

    render() {
        let riskInfo = null
        let addButton = null
        if (this.state.risk !== null) {
            riskInfo = <RiskInfo key={this.state.risk.id} risk={this.state.risk} onChangeRisk={this.changeRisk} removeRisk={this.removeRisk} manageRisk={this.props.manageRisk}></RiskInfo>
        }
        else {
            riskInfo = <div></div>
        }
        if (this.props.manageRisk === true) {
            addButton = <button className='AvailableRisks-addButton' onClick={() => this.addRisk()}>Add Risk</button>
        }
        return (
            <div id={'Manage-Risks-' + this.props.manageRisk}>
                <div className='AvailableRisks'>
                    <h5 className='AvailableRisks-item'>Available Risks:</h5>
                    <RisksSort sortRisks={this.sortRisks}></RisksSort>
                    <RisksList risks={this.state.risks} onRiskClick={this.showRisk}></RisksList>
                    {addButton}
                </div>
                {riskInfo}
                <div style={{ clear: 'both' }}></div>
            </div>
        )
    }
}

export default AvailableRisks