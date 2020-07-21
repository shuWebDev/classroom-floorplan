import * as React from 'react';

class Results extends React.Component<ResultsProps> {
  generateResultsView = (data: ClassroomData[]) => {
    let output: JSX.Element[] = [];
    
    for(let item of data) {
      output.push(<p key={item.uuid}>{item.displayName}</p>);
    }

    return output;
  }
  
  render() {
    return (
      <div className="grid-x grid-margin-x">
        <div className="cell medium-12">
          <section>
          {this.generateResultsView(this.props.resultsData)}
          </section>
        </div>
      </div>
    );
  }
}

export default Results;