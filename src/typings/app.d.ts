declare var $;

declare namespace Services {

  interface FetchResponse<T> extends Response {
    parsedBody: T
  }

  interface AppProps {}

  interface AppState {
    data: ClassroomData[],
    campusResults: ClassroomData[],
    currentCampus: boolean,
    filterboxText: string,
    filterboxPlaceholder: string,
    elementID: number
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
  smallImage: {
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
  mediumImage: {
    image: string;
    altText: string;
  },
  campus: string;
  building: string;
  description: string;
  roomTypeID: string,
  roomType: string,
  roomNumber: number,
  uuid: string,
  pageID: string,
}

interface RawAPIData {
  created: string,
  data: ClassroomData[],
  elementID: number,
  count: number,
  elementName: string
}



interface ResultsState {}
interface ResultsProps {
  resultsData: ClassroomData[],
  elementID: number
}

interface CampusSelectProps {
  clickHandler: function;
}

interface RoomTypeProps {
  clickHandler: function;
}
