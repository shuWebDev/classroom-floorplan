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

  componentDidMount = () => {
    // NOTE: load our data using our generic typed fetch wrapper for each item and updating state once with all the data
    Promise.all([
      Util.loadData<Services.ServiceData[]>("/tasks-services.json")
      .then(response => {
        return response;
      }),

      Util.loadData<Services.TagData[]>("/tags.json")
      .then(response => {
        return response;
      }),

      Util.loadData<Services.CategoryData[]>("/category.json")
      .then(response => {
        return response;
      })
    ]).then(([serviceData, tagData, categoryData]) => {
      let audienceData:Services.AudienceData[] = Util.extractAudiences(categoryData,serviceData);

      this.setState({
        services: serviceData,
        serviceResultSet: serviceData,
        tags: tagData,
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
      resultSet = Util.filterByText(this.state.filterboxText, this.state.serviceResultSet);
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

  render() {
    if(this.state.services.length && this.state.audiences.length && this.state.tags.length) {
      return (
        <div style={{"maxWidth": "60rem", "margin": "auto auto"}}>
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
                  <FilterBox filterBoxChangeHandler={this.filterBoxChangeHandler} filterBoxText={this.state.filterboxText} filterBoxPlaceholder={this.state.filterboxPlaceholder} submitHandler={this.formSubmitHandler} />
                  <ServiceList serviceResultSet={this.state.serviceResultSet} />
                </div>
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
