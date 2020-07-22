import * as React from 'react';

class Results extends React.Component<ResultsProps> {
  
  generateResultsView = (data: ClassroomData[]) => {
    let output: JSX.Element[] = [];
    
    for(let item of data) {
      output.push(
      <div className="card" key={item.uuid}>
        <ul className="no-bullet">
          <li><a href={`https://site8.auth.dev.shu.commonspotcloud.com/technology/classroom-information.cfm?customel_datapageid_${this.props.elementID}=${item.pageID}`} title={`${item.displayName} detail page`}>{item.displayName}</a></li>
          <li><strong>Campus: </strong>{item.campus}</li>
          <li><strong>Building: </strong>{item.building}</li>
          <li><strong>Room Number: </strong>{item.roomNumber}</li>
          <li><strong>Room Type: </strong>{item.roomType}</li>
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