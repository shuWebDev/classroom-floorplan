///<reference path='./typings/app.d.ts'/>
import * as React from 'react';
import Categories from './components/categories';
import FilterBox from './components/filterbox';
import Results from './components/results';
import * as Util from './util/util';
import './App.css';

class App extends React.Component<Services.AppProps, Services.AppState> {
  constructor(props:Services.AppProps) {
    super(props);

    this.state = {
      data: {},
      results: [],
      filterboxPlaceholder: "Enter a search term...",
      filterboxText: ""
    };
  }

  componentDidMount = () => { 
    Util.loadData<ClassroomData[]>("/classroom-information.json")
    .then(response => {
      this.setState({
        data: response,
        results: response
      });
    });
  }

  filterBoxChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      filterboxText: (event.target as HTMLInputElement).value
    });

    return;
  }
  
  formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    return;
  }

  resetButtonHandler = () => {
    
    //document.querySelectorAll<HTMLInputElement>("#filterbox-input")[0].value = "";

    return;
  }

  render() {
    return ( 
      <div className="grid-x grid-margin-x">
        <div className="cell medium-12">
          <div className="grid-x grid-margin-x">
            <aside className="cell medium-3">
              <h3>Categories</h3>
              <nav>
                <Categories />
              </nav>
            </aside>
            <div className="cell medium-9">
              <FilterBox resetButtonHandler={this.resetButtonHandler} filterBoxPlaceholder={this.state.filterboxPlaceholder} filterBoxChangeHandler={this.filterBoxChangeHandler} filterBoxText={this.state.filterboxText} submitHandler={this.formSubmitHandler} />
              <div className="grid-x grid-margin-x">
                <div className="cell medium-12">
                  <h2>Results</h2>
                  <Results resultsData={this.state.results} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
