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
export function extractAudiences (categoryData:Services.CategoryData[], tsData:Services.ServiceData[]):Services.AudienceData[] {
  // NOTE: our list of categories, will always have an "all"
  let audiences:Services.AudienceData[] = [{title: "All Categories", uuid: "00000000-0000-0000-0000000000000000"}];
  
  for(let tsItem in tsData) {
    //console.log(tsData[tsItem].category);
    for(let tsCategory in tsData[tsItem].category) {
      // NOTE: there may be more than one category assigned to this task/service, to we need to cycle through all present
      let currentTSCategory:string = tsData[tsItem].category[tsCategory]; 
      for(let category in categoryData) {
        if(categoryData[category].uuid === currentTSCategory) {
          let tempItem:Services.AudienceData = {title: categoryData[category].title, uuid: categoryData[category].uuid};
          if(!audiences.some(a => a.uuid === tempItem.uuid)) {
            //console.log();
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
  for(let item in serviceCollection) {
    // NOTE: there may be more than one category assigned to any service, so we need to check them all against what we need to return
    for(let c in serviceCollection[item].category) {
      // NOTE: if we have a match in the list of categories in this item...
      if(serviceCollection[item].category[c] === category) {
        // NOTE: push the item to the return set
        resultSet.push(serviceCollection[item]);
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

  for(let t in tempResults) {
    if(!resultSet.includes(tempResults[t])) {
      resultSet.push(tempResults[t]);
    }
  }

  return resultSet;
}

function filterByText(textInput: string, serviceCollection: Services.ServiceData[]): Services.ServiceData[] {
  let resultSet: Services.ServiceData[] = [];

  // NOTE: return items who have a title or description that fully/partially match what was typed in
  for(let item in serviceCollection) {
    if((serviceCollection[item].title.includes(textInput)) || (serviceCollection[item].description.includes(textInput))) {
      resultSet.push(serviceCollection[item]);
    }
  }

  return resultSet;
}

function filterByTag(textInput: string, serviceCollection: Services.ServiceData[], tagData:Services.CondensedTagData[]): Services.ServiceData[] {
  let t0 = performance.now();
  let resultSet:Services.ServiceData[] = [];
  let uuidsToSearch:string[] = [];

  // NOTE: resolve the tag UUIDs in 
  for(let t in tagData) {
    if(tagData[t].title.toUpperCase().includes(textInput.toUpperCase())) {
      if(!uuidsToSearch.includes(tagData[t].uuid)) {
        uuidsToSearch.push(tagData[t].uuid);
      }
    }
  }

  for(let s in serviceCollection) {
    for(let u in uuidsToSearch) {
      if(serviceCollection[s].tag.includes(uuidsToSearch[u])) {
        if(!resultSet.includes(serviceCollection[s])) {
          resultSet.push(serviceCollection[s]);
        }
      }
    }
  }

  let t1 = performance.now();
  console.log(`FilterByTag took ${t1-t0} milliseconds.` );
  return resultSet;
}

export function cleanUpTags(tagData: Services.TagData[]):Services.CondensedTagData[] {
  let t0 = performance.now();
  let condensedTags: Services.CondensedTagData[] = [];

  for(let t in tagData) {
    let ct:Services.CondensedTagData = {
      title: tagData[t].title.toString(), // NOTE: .toString() because many tags are or begin with a number and may end up otherwise be treated as such when we're expecting a string here
      uuid: tagData[t].uuid
    };

    condensedTags.push(ct);
  }

  // NOTE: in an effort to speed up lookups, sort the tags by name. this may make some lookups shorter by eliminating the need to scan the whole tags array for a match. we can find the match and quickly exit the loop.
  condensedTags.sort(compare);
  let t1 = performance.now();
  console.log(`cleanUpTags took ${t1-t0} milliseconds to complete.`);
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

