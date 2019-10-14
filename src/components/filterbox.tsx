import * as React from 'react';

const FilterBox:React.FunctionComponent<FilterBoxProps.FilterBox> = (props) => {
  
    return (
      <form className="grid-x grid-margin-x" onSubmit={props.submitHandler}>
        <div className="cell medium-10">
          <input id="filterbox-input" type="text" placeholder={props.filterBoxPlaceholder} onChange={props.filterBoxChangeHandler} />
        </div>
        <div className="cell medium-2">
          <input className="button" type="submit" value="Submit" />
        </div>
        
      </form>
    ); 
}

export default FilterBox;