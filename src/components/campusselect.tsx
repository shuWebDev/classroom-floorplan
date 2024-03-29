import * as React from 'react';

class CampusSelect extends React.Component<CampusSelectProps> {

  render() {
    return (
      <ul className="no-bullet">
        <li><button style={{"cursor": "pointer"}} type="button" onClick={(event) => {this.props.clickHandler("South Orange", event)}}>South Orange</button></li>
        <li><button style={{"cursor": "pointer"}} type="button" onClick={(event) => {this.props.clickHandler("Nutley", event)}}>IHS</button></li>
        <li><button style={{"cursor": "pointer"}} type="button" onClick={(event) => {this.props.clickHandler("Newark", event)}}>Law School</button></li>
      </ul>
    );
  }
}

export default CampusSelect;