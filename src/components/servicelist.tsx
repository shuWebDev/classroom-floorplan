import * as React from 'react';
import Service from './service';

class ServiceList extends React.Component<ServiceItem.ServiceListProps> {
  
  createViewFromReults = (data:Services.ServiceData[]):JSX.Element[] => {
    let outputList:JSX.Element[] = [];

    for(let item in data) {
      outputList.push(<Service key={data[item].uuid} serviceItemData={data[item]} />);
    }

    return outputList;
  }
  
  render() {
    return (
      <div className="grid-x grid-margin-x">
        <div className="medium-12 cell">
          <div className="grid-x gird-padding-x small-up-2 medium-up-3">
            {this.createViewFromReults(this.props.serviceResultSet)}
          </div>
        </div>
      </div>
    )
  }
}

export default ServiceList;