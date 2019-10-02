declare namespace Services {

  interface FetchResponse<T> extends Response {
    parsedBody: T
  }

  interface AppProps {}

  interface AppState {
    filterboxText: string,
    filterboxPlaceholder: string,
    services: ServiceData[],
    tags: TagData[],
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

  interface TagData {
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
      origData: string
    }
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
}

declare namespace Category {
  interface CategoryProps {
    categoryListing: Services.AudienceData[]
  }
}

declare namespace FilterBoxProps {
  interface FilterBox {
    filterBoxChangeHandler: function,
    filterBoxText: string,
    filterBoxPlaceholder: string,
    submitHandler: function
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