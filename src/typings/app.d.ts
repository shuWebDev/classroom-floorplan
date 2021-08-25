declare var $;

declare namespace Services {

  interface AppProps {
    dataSource: string;
    //absolute?: string | string[] | null | undefined;
  }

  interface AppState {
    currentCampus: string,
    currentFilteredData: ClassroomData[]
    currentRoomType: string,
    data: ClassroomData[],
    filterboxText: string,
    filterboxPlaceholder: string,
    resultsHeadingText: string,
    sortByCampus: boolean,
    sortByRoomType: boolean,
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
  campus: string,
  building: string,
  buildingName: string,
  description: string,
  roomCapacity: string,
  roomTypeID: string,
  roomType: string,
  roomNumber: string,
  uuid: string,
  pageID: string,
  url: URL, 
  camera: string,
  displayPrimary: string,
  displaySecondary: string,
  microphoneType: string,
  lectureCapture: string,
  [key: string]: TValue
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
  currentFilteredData: ClassroomData[],
}

interface CampusSelectProps {
  clickHandler: function;
}

interface RoomTypeProps {
  clickHandler: function;
}
