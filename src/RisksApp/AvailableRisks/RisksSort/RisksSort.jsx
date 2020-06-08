import React from 'react';
import './RisksSort.css';

class RisksSort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentActive: 'name',
    };
    this.sort = this.sort.bind(this);
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
        <span id="likelyImpactTime" onClick={this.sort} className={this.state.time}>Impact Time</span>
        <span className="vl" />
        <span id="likelyProbability" onClick={this.sort} className={this.state.probability}>Probability</span>
        <span className="vl" />
        <span id="name" onClick={this.sort} className={this.state.name}>Name</span>
      </div>
    );
  }
}

export default RisksSort;
