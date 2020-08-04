import * as React from 'react';

class RoomType extends React.Component<RoomTypeProps>{
  render() {
    return (
      <nav>
        <ul className="no-bullet">
          <li><button type="button" className="button" value="Standard" onClick={(event) => {this.props.clickHandler("Standard", event)}}>Standard</button></li>
          <li><button type="button" className="button" value="HyFlex" onClick={(event) => {this.props.clickHandler("HyFlex", event)}}>HyFlex</button></li>
          <li><button type="button" className="button" value="Teams HyFlex" onClick={(event) => {this.props.clickHandler("Teams HyFlex", event)}}>Teams HyFlex</button></li>
          <li><button type="button" className="button" value="Temporary HyFlex" onClick={(event) => {this.props.clickHandler("Temporary HyFlex", event)}}>Temporary HyFlex</button></li>
        </ul>
      </nav>
    );
  }
}

export default RoomType;