import * as React from 'react';

class RoomType extends React.Component<RoomTypeProps>{
  render() {
    return (
      <nav>
        <ul className="no-bullet">
          <li><button style={{"cursor": "pointer"}} type="button" value="Standard" onClick={(event) => {this.props.clickHandler("Standard", event.currentTarget.value)}}>Standard</button></li>
          <li><button style={{"cursor": "pointer"}} type="button" value="Teams" onClick={(event) => {this.props.clickHandler("Teams", event.currentTarget.value)}}>Teams</button></li>
        </ul>
      </nav>
    );
  }
}

export default RoomType;