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
      currentCampus: "",
      currentRoomType: "",
      roomResults: [], 
      filterboxPlaceholder: "Enter a search term...",
      filterboxText: "",
      elementID: 0,
      resultsHeadingText: "All Rooms"
    }; 
  };  
   
  componentDidMount = () => { 
    

    //Util.http("https://www.shu.edu/rest/data/classroomInformation/all")
    Util.http("https://site8.auth.dev.shu.commonspotcloud.com/rest/data/classroomInformation/all")
    .then((response: RawAPIData | any) => {
      if(typeof response.message !== "undefined") {
        this.setState({
          data: [],
          campusResults: [],
          elementID: 0
        });
      } else {
        this.setState({
          data: Util.orderByCampus(response.data), //response.data.sort(Util.compare),
          campusResults: Util.orderByCampus(response.data),
          elementID: response.elementID
        });
      }
    }); 
  }

  componentDidUpdate = () => {
    if(this.state.filterboxText !== "") {
      if(this.state.campusResults.length) {
        if(this.state.roomResults.length) {
          Util.filterByText(this.state.filterboxText, this.state.roomResults);
        } else {
          Util.filterByText(this.state.filterboxText, this.state.campusResults);
        }
      }
    }
  }

  filterBoxChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      filterboxText: (event.target as HTMLInputElement).value
    });

    return;
  }
  
  formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let results = Util.filterByText(this.state.filterboxText, this.state.data);

    this.setState({
      campusResults: results
    });
    return;
  }

  resetButtonHandler = () => {
    // NOTE: Reset all data to initial state

    this.setState({
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
    // NOTE: In case we are changing back to campus filtering, reset to original
    // data first, THEN filter on that. Can only filter by campus from the original
    // data, not from a dataset that's already been filtered by campus, then room 
    // type and then switch campus from there.
    resultSet = this.state.data;
    console.log(resultSet);
    // NOTE: NOW that the records have all been reset, filter out just the campus
    // we need
    resultSet = Util.filterByCampus(value, this.state.data);
    //console.log(resultSet);
    // NOTE: update our results in state
    this.setState({
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
