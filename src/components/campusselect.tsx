import * as React from 'react';

class CampusSelect extends React.Component<CampusSelectProps> {

  render() {
    return (
      <ul className="vertical menu">
        <li><button type="button" onClick={(event) => {this.props.clickHandler("South Orange", event)}}>South Orange</button></li>
        <li><button type="button" onClick={(event) => {this.props.clickHandler("Nutley", event)}}>IHS</button></li>
        <li><button type="button" onClick={(event) => {this.props.clickHandler("Newark", event)}}>Law School</button></li>
      </ul>
    );
  }
}

export default CampusSelect;