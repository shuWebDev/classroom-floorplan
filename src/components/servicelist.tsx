import * as React from 'react';
import Service from './service';

class ServiceList extends React.Component<ServiceItem.ServiceListProps> {
  
  createViewFromResults = (data:Services.ServiceData[]):JSX.Element[] => {
    let outputList:JSX.Element[] = [];

    for(let item=0; item<data.length; item++) {
      outputList.push(<Service key={data[item].uuid} serviceItemData={data[item]} />);
    }

    return outputList;
  }
  
  render() {
    return (
      <div className="grid-x grid-margin-x">
        <div className="medium-12 cell">
          <strong>{this.props.serviceResultSet.length} matches</strong>
          <div className="grid-x gird-padding-x small-up-2 medium-up-3" data-equalizer>
            {this.createViewFromResults(this.props.serviceResultSet)}
          </div>
        </div>
      </div>
    )
  }
}

export default ServiceList;