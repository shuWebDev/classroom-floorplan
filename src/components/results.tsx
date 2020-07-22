import * as React from 'react';

class Results extends React.Component<ResultsProps> {
  
  resolveCampus = (campusID: string) => {
    //console.log(`campusID: ${campusID}`);
    let result = "";
    switch(campusID) {
      case "3": result = "IHS"; break; 
      case "2": result = "Law School"; break; 
      default: result = "South Orange"; break;
    }

    return result;
  }

  resolveRoomType = (roomTypeID: string) => {
    switch(roomTypeID) {
      case "4": return "Temporary HyFlex";
      case "3": return "Teams HyFlex";
      case "2": return "HyFlex";
      default: return "Standard";
    }
  }

  generateResultsView = (data: ClassroomData[]) => {
    let output: JSX.Element[] = [];
    
    for(let item of data) {
      output.push(
      <div className="card" key={item.uuid}>
        <ul className="no-bullet">
          <li><a href="https://www.shu.edu" title={`${item.displayName} detail page`}>{item.displayName}</a></li>
          <li><strong>Campus: </strong>{this.resolveCampus(item.campus)}</li>
          <li><strong>Building: </strong>{item.building}</li>
          <li><strong>Room Number: </strong>{item.roomNumber}</li>
          <li><strong>Room Type: </strong>{this.resolveRoomType(item.roomType)}</li>
        </ul>
      </div>
      
      );
    }

    return output;
  }
  
  render() {
    return (
      <div className="grid-x grid-margin-x">
        <div className="cell medium-12">
          <div className="grid-x grid-margin-x small-up-2 medium-up-3" data-equalizer>
          {this.generateResultsView(this.props.resultsData)}
          </div>
        </div>
      </div>
    );
  }
}

export default Results;