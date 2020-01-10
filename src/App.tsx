///<reference path='./typings/app.d.ts'/>
import * as React from 'react';
import * as Util from './util/util';
import Categories from './components/categories';
import FilterBox from './components/filterbox';
import ServiceList from './components/servicelist';
import './App.css';

class App extends React.Component<Services.AppProps, Services.AppState> {
  constructor(props:Services.AppProps) {
    super(props);

    this.state = {
      filterboxText: "",
      filterboxPlaceholder: "ex: a name, title, amount...",
      services: [],
      tags: [],
      categories: [],
      audiences: [],
      currentCategory: "00000000-0000-0000-0000000000000000",
      serviceResultSet: []
    };
  }

  componentDidUpdate = () => {
    //$(document).foundation();
  }

  componentDidMount = () => {
    // NOTE: load our data using our generic typed fetch wrapper for each item and updating state once with all the data
    Promise.all([
      Util.loadData<Services.ServiceData[]>("/_cs_apps/data/tasks-services.json")
      .then(response => {
        return response;
      }),

      Util.loadData<Services.TagData[]>("/_cs_apps/data/tags.json")
      .then(response => {
        return response;
      }),

      Util.loadData<Services.CategoryData[]>("/_cs_apps/data/category.json")
      .then(response => {
        return response;
      })
    ]).then(([serviceData, tagData, categoryData]) => {
      let audienceData:Services.AudienceData[] = Util.extractAudiences(categoryData,serviceData);

      /*for(let i=0; i<serviceData.length; i++) {
        if(typeof serviceData[i].imageSmall.urlAbsolute !== "undefined") {
          console.log(`${i}: ${serviceData[i].imageSmall.urlAbsolute}`);
        } else {
          console.log(`${i}: no imageSmall defined`);
        }
      }*/

      // NOTE: so we only need to do this once at the beginning, trim down the tag data to just the fields we need, disregard the rest
      let ctd:Services.CondensedTagData[] = Util.cleanUpTags(tagData);

      this.setState({
        services: serviceData,
        serviceResultSet: serviceData,
        tags: ctd,
        categories: categoryData,
        audiences: audienceData
      });
    })
    .catch((e) => { console.error(e);} );
  }

  filterBoxChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      filterboxText: (event.target as HTMLInputElement).value
    });

    return;
  }

  formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    let resultSet:Services.ServiceData[] = [];

    if(this.state.filterboxText !== "") {
      // NOTE: if the filter textbox isn't blank, filter whatever is in the current result set by what matches the text, if we've previously clicked a category, we will be filtering *those* results, rather than all records. If we haven't previously applied a category, the result set would be all records.
      
      // NOTE: filter based on the text entered
      resultSet = Util.queryFilter(this.state.filterboxText, this.state.serviceResultSet, this.state.tags);

    } else {
      // NOTE: if filter text is blank, reset back to default
      resultSet = this.state.services;
    }

    this.setState({
      serviceResultSet: resultSet
    });

    return;
  }

  categoryClickHandler = (value: string) => {

    let resultSet:Services.ServiceData[] = [];

    // NOTE: resultSet is only changing if the category isn't "all"
    if(value !== "00000000-0000-0000-0000000000000000") {
      resultSet = Util.filterByCategory(value, this.state.services);
    } else {
      resultSet = this.state.services;
    }

    this.setState({
      serviceResultSet: resultSet
    });

    return;
  }

  resetButtonHandler = () => {
    let s = this.state.services;
    this.setState({
      serviceResultSet: s,
      filterboxText: "",
      filterboxPlaceholder: "ex: a name, title, amount..."
    });
    document.querySelectorAll<HTMLInputElement>("#filterbox-input")[0].value = "";
  }

  render() {
    if(this.state.services.length && this.state.audiences.length && this.state.tags.length) {
      return ( 
        <div className="grid-x grid-margin-x">
          <div className="cell medium-12">
            <h2>Toolkit</h2>
            <div className="grid-x grid-margin-x">
              <aside className="cell medium-3">
                <h3>Categories</h3>
                <nav>
                  <Categories categoryListing={this.state.audiences} categoryClickHandler={this.categoryClickHandler} />
                </nav>
              </aside>
              <div className="cell medium-9">
                <FilterBox filterBoxChangeHandler={this.filterBoxChangeHandler} filterBoxText={this.state.filterboxText} filterBoxPlaceholder={this.state.filterboxPlaceholder} submitHandler={this.formSubmitHandler} resetButtonHandler={this.resetButtonHandler} />
                <ServiceList serviceResultSet={this.state.serviceResultSet} />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
          <main>
          <div className="grid-x grid-margin-x">
            <div className="cell medium-12">
              <div className="panel">
                <h3><i className="fas fa-sync fa-spin"></i>&nbsp;Loading content...</h3>
              </div>
            </div>
          </div>
        </main>
      );
    }
    
  }
}

export default App;
