import * as React from 'react';

class RoomType extends React.Component<RoomTypeProps>{
  render() {
    return (
      <nav>
        <ul className="vertical menu">
          <li><button type="button" value="HyFlex" onClick={(event) => {this.props.clickHandler("HyFlex", event)}}>HyFlex</button></li>
          <li><button type="button" value="Teams HyFlex" onClick={(event) => {this.props.clickHandler("Teams HyFlex", event)}}>Teams HyFlex</button></li>
          <li><button type="button" value="Temporary" onClick={(event) => {this.props.clickHandler("Temporary", event)}}>Temporary HyFlex</button></li>
        </ul>
      </nav>
    );
  }
}

export default RoomType;