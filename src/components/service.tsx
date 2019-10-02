import * as React from 'react';

class Service extends React.Component<ServiceItem.ServiceItemProps> {
  render() {
    return (
      <div className="cell service-cell" id={this.props.serviceItemData.uuid}>
        <div className="card callout secondary" data-equalizer-watch>
          <a href={this.props.serviceItemData.url}>
            <img src={this.props.serviceItemData.imageSmall.urlAbsolute} alt={this.props.serviceItemData.title}/>
            <strong>{this.props.serviceItemData.title}</strong>
          </a>
        </div>
      </div>
    )
  }
}

export default Service;