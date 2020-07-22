import * as React from 'react';

class CampusSelect extends React.Component<CampusSelectProps> {

  render() {
    return (
      <ul className="no-bullet">
        <li><button type="button" className="button" onClick={() => {this.props.clickHandler("Nutley")}}>IHS</button></li>
        <li><button type="button" className="button" onClick={() => {this.props.clickHandler("South Orange")}}>South Orange</button></li>
        <li><button type="button" className="button" onClick={() => {this.props.clickHandler("Newark")}}>Law School</button></li>
      </ul>
    );
  }
}

export default CampusSelect;