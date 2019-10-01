import * as React from 'react';

class FilterBox extends React.Component<FilterBoxProps.FilterBox> {
  render() {
    return (
      <form className="grid-x grid-margin-x" onSubmit={this.props.submitHandler}>
        <div className="cell medium-9">
          <input id="filterbox-input" type="text" placeholder={this.props.filterBoxPlaceholder} />
          <label><strong>Keyword Filter</strong></label>
        </div>
        <div className="cell medium-3">
          <input className="button" type="submit" value="Submit" />
        </div>
        
      </form>
    ); 
  }

}

export default FilterBox;