import * as React from 'react';

const FilterBox:React.FunctionComponent<FilterBoxProps.FilterBox> = (props) => {
  
    return (
      <form className="grid-x grid-padding-x" onSubmit={props.submitHandler}>
        <div className="cell medium-8">
          <input id="filterbox-input" type="text" placeholder={props.filterBoxPlaceholder} onChange={props.filterBoxChangeHandler} />
        </div>
        <div className="cell medium-4">
          <div className="button-group">
            <input className="button" type="submit" value="Submit" />
            <button onClick={props.resetButtonHandler}  className="button" type="button">All Room Types/Campuses</button>
          </div>
        </div>
        
      </form>
    ); 
}

export default FilterBox;