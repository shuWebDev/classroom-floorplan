declare var $;

declare namespace Services {

  interface AppProps {
    dataSource: string | string[] | null | undefined;
    absolute?: string | string[] | null | undefined;
  }

  interface AppState {
    data: ClassroomData[],
    campusResults: ClassroomData[],
    roomResults: ClassroomData[],
    currentCampus: string,
    currentRoomType: string,
    filterboxText: string,
    filterboxPlaceholder: string,
    elementID: number,
    resultsHeadingText: string
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
  campusResults: ClassroomData[],
  roomResults: ClassroomData[],
  elementID: number
}

interface CampusSelectProps {
  clickHandler: function;
}

interface RoomTypeProps {
  clickHandler: function;
}
