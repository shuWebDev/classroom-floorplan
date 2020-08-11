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
  imageSmall: {
    image: string;
    altText: string;
  },
  floorPlan01: {
    image: string;
    altText: string;
  },
  floorPlan02: {
    image: string;
    altText: string;
  },
  imageMedium: {
    image: string;
    altText: string;
  },
  campus: string;
  building: string;
  buildingName: string;
  description: string;
  roomTypeID: string,
  roomType: string,
  roomNumber: string,
  uuid: string,
  pageID: string,
  url: {
    relative: string;
  },
  camera: string;
  displayPrimary: string;
  displaySecondary: string;
  microphoneType: string;
  lectureCapture: string;
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
