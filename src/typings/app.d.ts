declare var $;

declare namespace Services {

  interface FetchResponse<T> extends Response {
    parsedBody: T
  }

  interface AppProps {
    updated?: number;
    displayName: string;
    audience?: queryString.ParsedBody;
    category?: queryString.ParsedBody;
    tag?: queryString.ParsedBody;
  }

  interface AppState {
    audienceID?: string,
    audienceName?: string,
    audiences: AudienceData[],
    filterboxText: string,
    filterboxPlaceholder: string,
    services: ServiceData[],
    tags: CondensedTagData[],
    categories: CategoryData[],
    currentCategory: string,
    serviceResultSet: ServiceData[]
  }

  interface RawServiceData {
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

  interface ServiceData {
    pageID: number,
    description: string,
    category: string[],
    audience: AudienceData[],
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
    pageID: string,
    description: string,
    title: string,
    uuid: string,
    type: string[],
    imageSmall: object
  }

  interface AudienceData {
    description: string;
    imageSmall: object;
    pageID: string;
    type: string[];
    title: string,
    uuid: string
  }

  interface TagData {
    contentID: number,
    pageID: string,
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

