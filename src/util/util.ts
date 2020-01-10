///<reference path='../typings/app.d.ts'/>

// NOTE: Generic fetch that enforces type expectations from the incoming data. 
// when calling the function, declare a data type (from the .d.ts file) that describes the "shape" of the data you are expecting.
export async function loadData<T extends object>(url: string): Promise<T> {
  return await fetch(url)
    .then(response => {
      if(!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<{data: T}>
    })
    .then(data => {
      return data.data;
    });
}


// NOTE: extracts our audiences for the left side listing
export function extractAudiences (categoryData:Services.CategoryData[], 
  tsData:Services.ServiceData[]):Services.AudienceData[] {

  // NOTE: our list of categories, will always have an "all"
  let audiences:Services.AudienceData[] = [{title: "All Categories", uuid: "00000000-0000-0000-0000000000000000"}];
  
  for(let tsItem of tsData) {
    //console.log(tsData[tsItem].category);
    for(let tsCategory of tsItem.category) {
      // NOTE: there may be more than one category assigned to this task/service, to we need to cycle through all present
      let currentTSCategory:string = tsCategory; 
      for(let category of categoryData) {
        if(category.uuid === currentTSCategory) {
          let tempItem:Services.AudienceData = {title: category.title, uuid: category.uuid};
          if(!audiences.some(a => a.uuid === tempItem.uuid)) {
           audiences.push({
            title: tempItem.title,
            uuid: tempItem.uuid
           });
          }
        }
      }
    }
  }
  // NOTE: return our list of audiences.
  return audiences;
}

export function filterByCategory(category: string, serviceCollection: Services.ServiceData[]):Services.ServiceData[] {
  let resultSet: Services.ServiceData[] = [];

  // NOTE: for each item in the incoming collection
  for(let item of serviceCollection) {
    // NOTE: there may be more than one category assigned to any service, so we need to check them all against what we need to return
    for(let c of item.category) {
      // NOTE: if we have a match in the list of categories in this item...
      if(c === category) {
        // NOTE: push the item to the return set
        resultSet.push(item);
      }
    }
  }

  return resultSet;
}

export function queryFilter(textInput: string, serviceCollection: Services.ServiceData[], tagData:Services.CondensedTagData[]) {
  let resultSet: Services.ServiceData[] = [];

  // NOTE: call the tag filtering first
  resultSet = filterByTag(textInput, serviceCollection, tagData);

  // NOTE: add in items that may match by title or description, except duplicates
  let tempResults = filterByText(textInput, resultSet);

  for(let t of tempResults) {
    if(!resultSet.includes(t)) {
      resultSet.push(t);
    }
  }

  return resultSet;
}

function filterByText(textInput: string, serviceCollection: Services.ServiceData[]): Services.ServiceData[] {
  let resultSet: Services.ServiceData[] = [];

  // NOTE: return items who have a title or description that fully/partially match what was typed in
  for(let item of serviceCollection) {
    if((item.title.includes(textInput)) || (item.description.includes(textInput))) {
      resultSet.push(item);
    }
  }

  return resultSet;
}

function filterByTag(textInput: string, serviceCollection: Services.ServiceData[], tagData:Services.CondensedTagData[]): Services.ServiceData[] {
  let resultSet:Services.ServiceData[] = [];
  let uuidsToSearch:string[] = [];

  // NOTE: resolve the tag UUIDs in 
  for(let t of tagData) {
    if(t.title.toUpperCase().includes(textInput.toUpperCase())) {
      if(!uuidsToSearch.includes(t.uuid)) {
        uuidsToSearch.push(t.uuid);
      }
    }
  }

  for(let s of serviceCollection) {
    for(let u of uuidsToSearch) {
      if(s.tag.includes(u)) {
        if(!resultSet.includes(s)) {
          resultSet.push(s);
        }
      }
    }
  }

  return resultSet;
}

export function cleanUpTags(tagData: Services.TagData[]):Services.CondensedTagData[] {
  let condensedTags: Services.CondensedTagData[] = [];
  
  for(let t of tagData) { 
    let ct:Services.CondensedTagData = {
      title: t.title.toString(), // NOTE: .toString() because many tags are or begin with a number and may end up otherwise be treated as such when we're expecting a string here
      uuid: t.uuid
    };
    
    condensedTags.push(ct);
  }

  // NOTE: in an effort to speed up lookups, sort the tags by name. this may make some lookups shorter by eliminating the need to scan the whole tags array for a match. we can find the match and quickly exit the loop.
  condensedTags.sort(compare);
  return condensedTags;
}

// NOTE: function to compare one tag to another for the purposes of sorting
function compare(a:Services.CondensedTagData, b:Services.CondensedTagData) {
  const titleA:string = a.title.toUpperCase(); 
  const titleB:string = b.title.toUpperCase();

  let comparison:number = 0;

  if(titleA > titleB) {
    comparison = 1;
  } else if (titleA < titleB) {
    comparison = -1;
  }

  return comparison;
}

