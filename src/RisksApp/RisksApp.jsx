import React from 'react'
import RisksNavbar from './RisksNavbar/RisksNavbar'
import AvailableRisks from './AvailableRisks/AvailableRisks'
import './RisksApp.css'

class RisksApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: props.user,
            manageRisks: false
        }
        this.onStatusChange = this.onStatusChange.bind(this)
    }

    onStatusChange(){
        this.setState((state) => {
            return { manageRisks: !state.manageRisks}
        })
    }

    render() {
        return (
            <div className='app'>
                <div className='row'>
                    <RisksNavbar userName={this.props.user.name} currentStatus={this.state.manageRisks} onStatusChange={this.onStatusChange} logout={this.props.logout}></RisksNavbar>
                </div>
                <div className="row">
                    <AvailableRisks user={this.state.user} risk={null} manageRisk={this.state.manageRisks}></AvailableRisks>
                </div>
            </div>
        )
    }
}

export default RisksApp