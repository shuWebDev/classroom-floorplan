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
      buildingNames: [],
      buildingResults: [],
      campusResults: [], // NOTE: changes based on filtering
      currentBuilding: "Select a Building",
      currentCampus: "",
      currentRoomType: "",
      elementID: 0,
      filterboxPlaceholder: "Enter a search term...",
      filterboxText: "",
      filteredTotal: [],
      resultsHeadingText: "All Rooms",
      roomResults: [] 
    }; 
  };  
   
  componentDidMount = () => { 
    Util.http("https://www.shu.edu/rest/data/classroomInformation/allView")
    .then((response: RawAPIData | any) => {
      //console.log(response);
      if(typeof response.message !== "undefined") {
        this.setState({
          data: [],
          filteredTotal: [],
          elementID: 0
        });
      } else {
        this.setState({
          data: Util.orderByCampus(response.data),
          filteredTotal: Util.orderByCampus(response.data),
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
    let resultSet: ClassroomData[] = [];

    // NOTE: grab the current state of the filters and the currently displayed data set (filteredTotal)
    const filterPackage: ActiveFilters = {
      currentResultSet: this.state.filteredTotal,
      currentBuilding: this.state.currentBuilding,
      currentCampus: this.state.currentCampus,
      currentRoomType: this.state.currentRoomType,
      filterBoxText: this.state.filterboxText
    };

    // NOTE: send the package to the filter broker to perform filtering
    resultSet = Util.filterBroker(filterPackage);

    // NOTE: reset entire state at once so it's a new object
    this.setState({
      ...this.state,
      campusResults: resultSet
    });

    return;
  }

  resetButtonHandler = () => {
    // NOTE: Reset all data to initial state

    this.setState({
      ...this.state,
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

    // NOTE: grab the current state of the filters and the currently displayed data set (filteredTotal)
    const filterPackage: ActiveFilters = {
      currentResultSet: this.state.filteredTotal,
      currentBuilding: this.state.currentBuilding,
      currentCampus: value, // NOTE: value here because we want this new value, not what's in state because that will change after filtering when we reset state
      currentRoomType: this.state.currentRoomType,
      filterBoxText: this.state.filterboxText
    };

    // NOTE: send the package to the filter broker to perform filtering
    resultSet = Util.filterBroker(filterPackage);
    console.log(resultSet);

    this.setState({
      ...this.state,
      filteredTotal: resultSet,
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
        ...this.state,
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

    //resultSet = Util.filterByBuildingName(this.state.data, e.currentTarget.value);
    
    this.setState({
      ...this.state,
      buildingResults: resultSet,
      currentBuilding: e.currentTarget.value
    });

    return;
  }

  packageFilters = () => {
    return {
      currentResultSet: this.state.filteredTotal,
      currentBuilding: this.state.currentBuilding,
      currentCampus: this.state.currentCampus,
      currentRoomType: this.state.currentRoomType,
      filterBoxText: this.state.filterboxText
    }  
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
                      <Results elementID={this.state.elementID} filteredTotal ={this.state.filteredTotal} />
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
