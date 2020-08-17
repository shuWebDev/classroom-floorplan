///<reference path='../typings/app.d.ts'/>
import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';

class BuildingList extends React.Component<BuildingListProps>{
  renderBuildingOptions = (data: string[]) => {
    let options: JSX.Element[] = data.map((item) => {
      return (<option value={item} key={uuidv4()}>{item}</option>)
    });
    
    return options;
  }
  
  render() {
    return (
      <select onChange={this.props.buildingChangeHandler} value={this.props.currentSelection}>
        <option value={"Select a Building"} disabled key="00000000-0000-0000-0000-000000000000">Select a Building</option>
        {this.renderBuildingOptions(this.props.buildingNames)}
      </select>
    );
  }
}

export default BuildingList;