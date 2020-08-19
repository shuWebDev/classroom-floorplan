declare var $;

declare namespace Services {

  interface FetchResponse<T> extends Response {
    parsedBody: T
  }

  interface AppProps {}

  interface AppState {
    data: ClassroomData[],
    campusResults: ClassroomData[],
    roomResults: ClassroomData[],
    currentCampus: string,
    currentRoomType: string,
    filterboxText: string,
    filterboxPlaceholder: string,
    elementID: number,
    resultsHeadingText: string,
    buildingNames: string[],
    buildingResults: ClassroomData[]
    currentBuilding: string,
    filteredTotal: ClassroomData[] // final result of all currently applied filters
  }
}

declare namespace FilterBoxProps {
  interface FilterBox {
    filterBoxChangeHandler: function,
    filterBoxText: string,
    filterBoxPlaceholder: string,
    submitHandler: function,
    resetButtonHandler: function
  }
}

interface ClassroomData {
  displayName: string;
  imageSmall: object,
  floorPlan01: object,
  floorPlan02: object,
  imageMedium: object,
  campus: string;
  building: string;
  buildingName: string;
  description: string;
  roomTypeID: string;
  roomType: string;
  roomNumber: string;
  uuid: string;
  pageID: string;
  url: URL; 
  camera: string;
  displayPrimary: string;
  displaySecondary: string;
  microphoneType: string;
  lectureCapture: string;
  [key: string]: TValue;
}

interface URL {
  relative: string;
}

interface RawAPIData {
  message?: string,
  created: string,
  data: ClassroomData[],
  elementID: number,
  count: number,
  elementName: string
}

interface APIErrorResponse {
  message: string
}

interface ResultsState {}
interface ResultsProps {
  filteredTotal: ClassroomData[],
  elementID: number
}

interface CampusSelectProps {
  clickHandler: function;
}

interface RoomTypeProps {
  clickHandler: function;
}

interface BuildingListProps {
  buildingNames: string[];
  buildingChangeHandler: function,
  currentSelection: string
}

interface ActiveFilters {
  currentResultSet: ClassroomData[],
  currentBuilding: string,
  currentCampus: string,
  currentRoomType: string,
  filterBoxText: string
}