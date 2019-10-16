declare var $;

declare namespace Services {

  interface FetchResponse<T> extends Response {
    parsedBody: T
  }

  interface AppProps {}

  interface AppState {
    filterboxText: string,
    filterboxPlaceholder: string,
    services: ServiceData[],
    tags: CondensedTagData[],
    categories: CategoryData[],
    audiences: AudienceData[],
    currentCategory: string,
    serviceResultSet: ServiceData[]
  }

  interface ServiceData {
    pageID: number,
    description: string,
    category: string[],
    audience: string[],
    title: string,
    tag: string[],
    uuid: string,
    includeDescription: boolean,
    imageSmall: {
      origHeight: number,
      altText: string,
      urlAbsolute: string,
      urlRelative: string,
      id: number,
      origWidth: number,
      ssid: number,
      origData: string,
      origSize: number
    },
    url: string
  }

  interface CategoryData {
    pageID: number,
    description: string,
    title: string,
    uuid: string,
    type: string[],
    imageSmall: object
  }

  interface AudienceData {
    title: string,
    uuid: string
  }

  interface TagData {
    contentID: number,
    pageID: number,
    parentID: number,
    active: boolean,
    title: string,
    uuid: string
  }

  interface CondensedTagData {
    title: string,
    uuid: string
  }
}

declare namespace Category {
  interface CategoryProps {
    categoryListing: Services.AudienceData[],
    categoryClickHandler: function
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

declare namespace ServiceItem {
  interface ServiceItemProps {
    serviceItemData: Services.ServiceData
  }

  interface ServiceListProps {
    serviceResultSet:Services.ServiceData[]
  }
}

