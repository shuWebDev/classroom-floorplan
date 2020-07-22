import * as React from 'react';

class CampusSelect extends React.Component<CampusSelectProps> {

  render() {
    return (
      <ul className="no-bullet">
        <li><button type="button" className="button" onClick={() => {this.props.clickHandler("3")}}>IHS</button></li>
        <li><button type="button" className="button" onClick={() => {this.props.clickHandler("1")}}>South Orange</button></li>
        <li><button type="button" className="button" onClick={() => {this.props.clickHandler("2")}}>Law School</button></li>
      </ul>
    );
  }
}

export default CampusSelect;