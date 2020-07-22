import * as React from 'react';

class RoomType extends React.Component<RoomTypeProps>{
  render() {
    return (
      <nav>
        <ul className="no-bullet">
          <li><button type="button" className="button" value="Standard" onClick={() => {this.props.clickHandler("Standard")}}>Standard</button></li>
          <li><button type="button" className="button" value="HyFlex" onClick={() => {this.props.clickHandler("HyFlex")}}>HyFlex</button></li>
          <li><button type="button" className="button" value="Teams HyFlex" onClick={() => {this.props.clickHandler("Teams HyFlex")}}>Teams HyFlex</button></li>
          <li><button type="button" className="button" value="Temporary HyFlex" onClick={() => {this.props.clickHandler("Temporary HyFlex")}}>Temporary HyFlex</button></li>
        </ul>
      </nav>
    );
  }
}

export default RoomType;