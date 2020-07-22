///<reference path='./typings/app.d.ts'/>
import * as React from 'react';
import RoomType from './components/roomtype';
import FilterBox from './components/filterbox';
import Results from './components/results';
import CampusSelect from "./components/campusselect";
import * as Util from './util/util';
import './App.css';

class App extends React.Component<Services.AppProps, Services.AppState> {
  constructor(props:Services.AppProps) {
    super(props);

    this.state = {
      data: [], // NOTE: gold copy of initial data, should never change
      campusResults: [], // NOTE: changes based on filtering
      currentCampus: false,
      filterboxPlaceholder: "Enter a search term...",
      filterboxText: ""
    };
  }
  
  componentDidMount = () => { 
    Util.loadData<ClassroomData[]>("/classroom-information.json")
    .then(response => {
      this.setState({
        data: response,
        campusResults: response
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

  campusSelectClickHandler = (value: string) => {
    let resultSet: ClassroomData[] = [];

    console.log(`user clicked ${value}`);
    // NOTE: filter the current set of results based on what the user clicked for campus
    resultSet = Util.filterByCampus(value, this.state.data);
    console.log(resultSet);
    // NOTE: update our results in state
    this.setState({
      campusResults: resultSet,
      currentCampus: true // NOTE: set this true because now we've selected a campus. So if we next select a room type, the searchable set is limited to that campus
    });

    return;
  }

  roomTypeClickHandler = (value: string) => {
    let resultSet: ClassroomData[] = [];
    
    // NOTE: are we filtering on an "all" view, or have we already selected a campus?
    if(this.state.currentCampus === false) {
      // NOTE: "all" view
      resultSet = Util.filterByRoomType(value, this.state.data);
    } else {
      // NOTE: we've narrowed down to a campus previously
      resultSet = Util.filterByRoomType(value, this.state.campusResults);
    }
    
    console.log(`user clicked ${value}`);

    // NOTE: update our results in state
    this.setState({
      campusResults: resultSet
    });
    return;
  }

  render() {
    if(this.state.data !== []) {
      return ( 
        <div className="grid-x grid-margin-x">
          <div className="cell medium-12">
            <div className="grid-x grid-margin-x">
              <aside className="cell medium-3">
                <h3>Categories</h3>
                <nav>
                  <h4>Campus</h4>
                  <CampusSelect clickHandler={this.campusSelectClickHandler} />
                  <h4>Room Type</h4>
                  <RoomType clickHandler={this.roomTypeClickHandler} />
                </nav>
              </aside>
              <div className="cell medium-9">
                <FilterBox resetButtonHandler={this.resetButtonHandler} filterBoxPlaceholder={this.state.filterboxPlaceholder} filterBoxChangeHandler={this.filterBoxChangeHandler} filterBoxText={this.state.filterboxText} submitHandler={this.formSubmitHandler} />
                <div className="grid-x grid-margin-x">
                  <div className="cell medium-12">
                    <h3>Results</h3>
                    <Results resultsData={this.state.campusResults} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <p>Loading...</p>;
    }
  }
}

export default App;
