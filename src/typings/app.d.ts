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
    filterboxPlaceholder: string
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
  roomType: string,
  roomNumber: number,
  uuid: string
}
interface ResultsState {}
interface ResultsProps {
  resultsData: ClassroomData[];
}

interface CampusSelectProps {
  clickHandler: function;
}

interface RoomTypeProps {
  clickHandler: function;
}