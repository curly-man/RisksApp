import React from 'react';
import './RisksSort.css';

class RisksSort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentActive: 'name',
    };
  }

  sort = (event) => {
    const { id } = event.target;
    document.getElementById(this.state.currentActive).classList = '';
    event.target.className = 'App-active_item';
    this.setState((state) => ({ currentActive: id }));
    this.props.sortRisks(id);
  }

  render() {
    const data = this.props.params.map((param) => {
      return (
        <div key={param.id} className="SortItem">
          <span id={param.id} onClick={this.sort}>{param.value}</span>
        </div>
      )
    })
    return (
      <div className="RisksSort">
        <span>Sort By:</span>
                &nbsp;
        {data}
      </div>
    );
  }
}

export default RisksSort;
