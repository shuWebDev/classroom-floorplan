import * as React from 'react';

class Results extends React.Component<ResultsProps> {
  
  generateResultsView = (data: ClassroomData[]) => {
    let output: JSX.Element[] = data.map((item) => {
      return (
        <div className="cell callout" key={item.uuid} data-equalizer-watch>
        <ul className="no-bullet">
          <li><a href={item.url.relative} title={`${item.displayName} detail page`}>{item.displayName}</a></li>
          <li><strong>Campus: </strong>{item.campus}</li>
          <li><strong>Building: </strong>{item.buildingName}</li>
          <li><strong>Room Number: </strong>{item.roomNumber}</li>
          <li><strong>Room Type: </strong>{item.roomType}</li>
        </ul>
      </div>
      );
    });

    return output;
  }
  
  render() {
    if(this.props.filteredTotal.length) {
      // NOTE: else, we just want the campus-wide results, no room type was selected
      return (
        <div className="grid-x grid-margin-x">
          <div className="cell medium-12">
            <div className="grid-x grid-margin-x small-up-2 medium-up-3" data-equalizer data-equalizer-by-row="true">
            {this.generateResultsView(this.props.filteredTotal)}
            </div>
          </div>
        </div>
      );
    } else {
      return <p>Sorry, no records match your request. Please try another combination.</p>;
    }
  }
}

export default Results;