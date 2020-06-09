import React from 'react';
import './RisksSort.css';

class RisksSort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentActive: 'name',
    };
  }

  sort(event) {
    const { id } = event.target;
    document.getElementById(this.state.currentActive).classList = '';
    event.target.className = 'App-active_item';
    this.setState((state) => ({ currentActive: id }));
    this.props.sortRisks(id);
  }

  render() {
    return (
      <div className="RisksSort">
        <span>Sort By:</span>
                &nbsp;
        <span id="likelyImpactTime" onClick={(event) => this.sort(event)} className={this.state.time}>Impact Time</span>
        <span className="vl" />
        <span id="likelyProbability" onClick={(event) => this.sort(event)} className={this.state.probability}>Probability</span>
        <span className="vl" />
        <span id="name" onClick={(event) => this.sort(event)} className={this.state.name}>Name</span>
      </div>
    );
  }
}

export default RisksSort;
