import * as React from 'react';

class Categories extends React.Component<Category.CategoryProps> {

  // NOTE: generates our category listing for the left side
  generateCategoryListing = (data:Services.AudienceData[]):JSX.Element[] => {
    let listItems:JSX.Element[] = [];

    for(let item in data) {
      listItems.push(<li key={data[item].uuid}><button value={data[item].uuid}>{data[item].title}</button></li>);
    }
    return listItems;
  }

  

  render() {
    if(this.props.categoryListing.length) {
      return <div>
        <ul className="no-bullet">
          {this.generateCategoryListing(this.props.categoryListing)}
        </ul>
      </div>
    }
    
  }
}

export default Categories;