///<reference path='./typings/app.d.ts'/>
import * as React from 'react';
import RoomType from './components/roomtype';
import FilterBox from './components/filterbox';
import Results from './components/results';
import CampusSelect from "./components/campusselect";
import BuildingList from "./components/buildinglist";
import * as Util from './util/util';
import './App.css';


class App extends React.Component<Services.AppProps, Services.AppState> {
  constructor(props:Services.AppProps) {
    super(props);

    this.state = {
      data: [], // NOTE: gold copy of initial data, should never change
      campusResults: [], // NOTE: changes based on filtering
      currentCampus: "",
      currentRoomType: "",
      roomResults: [], 
      filterboxPlaceholder: "Enter a search term...",
      filterboxText: "",
      elementID: 0,
      resultsHeadingText: "All Rooms",
      buildingNames: [],
      buildingResults: [],
      currentBuilding: "Select a Building",
      filteredTotal: []
    }; 
  };  
   
  componentDidMount = () => { 
    Util.http("https://www.shu.edu/rest/data/classroomInformation/allView")
    .then((response: RawAPIData | any) => {
      //console.log(response);
      if(typeof response.message !== "undefined") {
        this.setState({
          data: [],
          campusResults: [],
          elementID: 0
        });
      } else {
        this.setState({
          data: Util.orderByCampus(response.data),
          campusResults: Util.orderByCampus(response.data),
          elementID: response.elementID,
          buildingNames: Util.extractUniqueBuildings(response.data)
        });
      }
    }); 
  }

  

  filterBoxChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    
    let _state = this.state;

    this.setState({
      ..._state,
      filterboxText: (event.target as HTMLInputElement).value
    });

    return;
  }
  
  formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let results = Util.filterByText(this.state.filterboxText, this.state.data);

    // NOTE: copy state so we don't mutate it
    let _state = this.state;

    // NOTE: reset entire state at once so it's a new object
    this.setState({
      ..._state,
      campusResults: results
    });

    return;
  }

  resetButtonHandler = () => {
    // NOTE: Reset all data to initial state

    let _state = this.state;

    this.setState({
      ..._state,
      campusResults: this.state.data,
      roomResults: [],
      currentCampus: "",
      currentRoomType: "",
      filterboxText: "",
      resultsHeadingText: "All Rooms"
    }, () => {
      document.querySelectorAll(".category-selected").forEach((item) => {
        item.classList.remove("category-selected");
      })
    });
 
    return;
  }

  campusSelectClickHandler = (value: string, e:React.MouseEvent<HTMLElement>) => {
    let resultSet: ClassroomData[] = [];

    //console.log(e.currentTarget.classList);
    // NOTE: filter the current set of results based on what the user clicked for campus
    resultSet = Util.filterByCampus(value, this.state.data);
    //console.log(resultSet);
    // NOTE: update our results in state

    let _state = this.state;

    this.setState({
      ..._state,
      campusResults: resultSet,
      currentCampus: value,
      resultsHeadingText: `${value} campus` 
    });
    e.currentTarget.classList.add("category-selected");
    
    return;
  }

  roomTypeClickHandler = (value: string, e:React.MouseEvent<HTMLElement>) => {
    let resultSet: ClassroomData[] = [];
    
    //console.log(`Room Type: ${value}`);
    
    if(this.state.campusResults.length) {
      resultSet = Util.filterByRoomType(value, this.state.campusResults);
      this.setState({
        currentRoomType: value,
        roomResults: resultSet,
        resultsHeadingText: (this.state.currentCampus !== "")? `${this.state.currentCampus} campus, ${value} room type`: `${value} room type`
      });
      e.currentTarget.classList.add("category-selected");
    }

    return;
  } 

  buildingChangeHandler = (e: React.FormEvent<HTMLSelectElement>) => {
    
    let resultSet: ClassroomData[] = [];

    resultSet = Util.filterByBuildingName(this.state.data, e.currentTarget.value);
    
    let _state = this.state;
    
    this.setState({
      ..._state,
      buildingResults: resultSet,
      currentBuilding: e.currentTarget.value
    });

    return;
  }

  render() {
    if(this.state.data.length) {
      return ( 
        <div className="grid-container">
          <div className="grid-x grid-padding-x">
            <div className="cell medium-12">
              <div className="grid-x grid-padding-x">
                <div className="cell medium-3">
                  <h3>Categories</h3>
                  <nav>  
                    <h5>Building</h5>
                    <BuildingList buildingNames={this.state.buildingNames} buildingChangeHandler={this.buildingChangeHandler} currentSelection={this.state.currentBuilding} />
                    <h5>Campus</h5>
                    <CampusSelect clickHandler={this.campusSelectClickHandler} />
                    <h5>Room Type</h5>
                    <RoomType clickHandler={this.roomTypeClickHandler} />
                    
                  </nav>
                </div>
                <div className="cell medium-9">
                  <FilterBox resetButtonHandler={this.resetButtonHandler} filterBoxPlaceholder={this.state.filterboxPlaceholder} filterBoxChangeHandler={this.filterBoxChangeHandler} filterBoxText={this.state.filterboxText} submitHandler={this.formSubmitHandler} />
                  <div className="grid-x grid-margin-x">
                    <div className="cell medium-12">
                      <h3 id="results-header">{this.state.resultsHeadingText}</h3>
                      <Results elementID={this.state.elementID} campusResults ={this.state.campusResults} roomResults={this.state.roomResults} />
                    </div>
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
