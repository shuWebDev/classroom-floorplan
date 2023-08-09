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
      currentCampus: "",
      currentRoomType: "",
      currentFilteredData: [], // NOTE: results of most recent filtering go here. Should initially be same as "data"
      filterboxPlaceholder: "Enter a search term...",
      filterboxText: "",
      resultsHeadingText: "All Rooms, All buildings, All Campuses",
      sortByCampus: false,
      sortByRoomType: false
    }; 
  };  
   
  componentDidMount = () => { 
    
    
    //Util.http("https://www.shu.edu/_resources/dmc/php/classroominformation.php?datasource=classroominformation&returntype=json&ort=room-number%20asc")
    Util.http(this.props.dataSource)
    .then((response: RawAPIData | any) => {
      if(typeof response.message !== "undefined") {
        this.setState({
          data: [],
          currentFilteredData: [],
          //elementID: 0
        });
      } else {
        
        //let initialDataOrderedByCampus = Util.orderByCampus(response);
        let initialData = response;
        this.setState({
          /* NOTE: set up the "gold copy" from remote - all data and comes sorted by campus then room number */
          data: initialData,
          currentFilteredData: initialData
        });
       
      }
    }); 
  }

  componentDidUpdate = () => {
    
  }

  filterBoxChangeHandler = (event: React.FormEvent) => {
    this.setState({
      filterboxText: (event.target as HTMLInputElement).value
    });

    return;
  }
  
  formSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    let results = Util.filterByText(this.state.filterboxText, this.state.data);

    this.setState({
      currentFilteredData: results
    });
    return;
  }

  resetButtonHandler = () => {
    // NOTE: Reset all data to initial state

    this.setState({
      currentFilteredData: this.state.data,
      currentCampus: "",
      currentRoomType: "",
      filterboxText: "",
      resultsHeadingText: "All Rooms, All Buildings, All Campuses"
    }, () => {
      document.querySelectorAll(".category-selected").forEach((item) => {
        item.classList.remove("category-selected");
      })
    });
 
    return;
  }

  campusSelectClickHandler = (value: string, e:React.MouseEvent) => {
    let resultSet: ClassroomData[] = [];

    // NOTE: selecting another campus always starts back at all room types for that campus. 
    resultSet = Util.filterByCampus(value, this.state.data);
    
    // NOTE: update our results in state
    this.setState({
      currentFilteredData: resultSet,
      currentCampus: value,
      resultsHeadingText: `${value} campus` 
    });
    e.currentTarget.classList.add("category-selected");
    
    return;
  }

  roomTypeClickHandler = (value: string, e:React.MouseEvent) => {
    let resultSet: ClassroomData[] = [];
    
    //console.log(this.state.data);
    if(this.state.data.length) {
      resultSet = Util.filterByRoomType(value, this.state.data);
      this.setState({
        currentRoomType: value,
        currentFilteredData: resultSet,
        resultsHeadingText: (this.state.currentCampus !== "")? `${this.state.currentCampus} campus, ${value} room type`: `${value} room type`
      });
      //e.currentTarget.classList.add("category-selected");
      //console.log(e);
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
                    <br />
                    <h5>Room Type</h5>
                    <RoomType clickHandler={this.roomTypeClickHandler} />
                  </nav>
                </div>
                <div className="cell medium-9">
                  <FilterBox resetButtonHandler={this.resetButtonHandler} filterBoxPlaceholder={this.state.filterboxPlaceholder} filterBoxChangeHandler={this.filterBoxChangeHandler} filterBoxText={this.state.filterboxText} submitHandler={this.formSubmitHandler} />
                  <div className="grid-x grid-margin-x">
                    <div className="cell medium-12">
                      <h3 id="results-header">{this.state.resultsHeadingText}</h3>
                      <Results  currentFilteredData ={this.state.currentFilteredData} />
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
