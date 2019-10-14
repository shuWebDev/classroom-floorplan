///<reference path='../typings/app.d.ts'/>


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
  let resultSet:Services.ServiceData[] = [];

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

// export function filterByText(filterText: string, serviceCollection: Services.ServiceData[], tagsToSearch: Services.TagData[]):Services.ServiceData[] {
//   let resultSet:Services.ServiceData[] = [];

//   // NOTE: filter by tags first
//   resultSet = filterByTag(filterText, serviceCollection, tagsToSearch);

//   // NOTE: filter further by comparing the text in the box to description and title of each service
//   for(let item in resultSet) {
//     // NOTE: the text we are looking to match could be in either the "description" or "title" fields given those are relevant text
//     if(resultSet[item].description.toLowerCase().includes(filterText.toLowerCase())) {
//       resultSet.push(resultSet[item]);
//     } else {  
//       if(resultSet[item].title.toLowerCase().includes(filterText.toLowerCase())) {
//         resultSet.push(resultSet[item]);
//       }
//     } 
//   }

  
//   return resultSet;
// }

export function cleanUpTags(tagData: Services.TagData[]):Services.CondensedTagData[] {
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




// export function filterByTag(filterText: string, serviceCollection: Services.ServiceData[], tagsToSearch: Services.TagData[]): Services.ServiceData[] {
//   let resultSet: Services.ServiceData[] = [];

//   // NOTE: cycle through services
//   for(let service in serviceCollection) {
//     let serviceTags:string[] = [];

//     // NOTE: extract the tags for the current service record
//     for(let tag in serviceCollection[service].tag) {
//       serviceTags.push(serviceCollection[service].tag[tag]);
//     }

//     // NOTE: for all tags in this service
//     for(let t in serviceTags) {
//       console.log(`${serviceTags[t]}: ${serviceTags[t]});
//       /*for(let tag in tagsToSearch) {
//         // NOTE: if we find a tag
//         if(serviceTags[t].toUpperCase() === tagsToSearch[tag].title.toUpperCase()) {
//           resultSet.push(serviceCollection[service]);
//         }
//       } */
//     }
//   }

//   return serviceCollection;
// }

