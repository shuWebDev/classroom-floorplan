import * as React from 'react';

class Results extends React.Component<ResultsProps> {
  
  generateResultsView = (data: ClassroomData[]) => {
    let output: JSX.Element[] = [];
    
    for(let item of data) {
      output.push(
      <div className="cell callout" key={item['room-number'].replace(/ /g, '')} data-equalizer-watch>
        <ul className="no-bullet">
          <li><a href={item['@href']} title={`${item['room-number']} detail page`}>{item['room-number']}</a></li>
          <li><strong>Campus: </strong>{item.campus}</li>
          <li><strong>Building: </strong>{item['building-name']}</li>
          {/*<li><strong>Room Number: </strong>{item['room-number']}</li>*/}
          <li><strong>Room Type: </strong>{item['room-type']}</li>
        </ul>
      </div>
      );
    }

    return output;
  }
  
  render() {
    // NOTE: if we have results to view
    if(this.props.currentFilteredData.length) {
      return (
        <div className="grid-x grid-margin-x">
          <div className="cell medium-12">
            <div className="grid-x grid-margin-x small-up-2 medium-up-3" data-equalizer data-equalizer-by-row="true">
            {this.generateResultsView(this.props.currentFilteredData)}
            </div>
          </div>
        </div>
      );
    } else {
      // NOTE: the result set is 0, display "no matches" message
      return <p>Sorry, no records match your request. Please try another filter.</p>;
    }
  }
}

export default Results;