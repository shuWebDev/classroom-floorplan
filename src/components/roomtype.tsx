import * as React from 'react';

class RoomType extends React.Component<RoomTypeProps>{
  render() {
    return (
      <nav>
        <ul className="vertical menu">
          <li><button type="button" value="Standard" onClick={(event) => {this.props.clickHandler("Standard", event)}}>Standard</button></li>
          <li><button type="button" value="Teams" onClick={(event) => {this.props.clickHandler("Teams", event)}}>Teams</button></li>
        </ul>
      </nav>
    );
  }
}

export default RoomType;