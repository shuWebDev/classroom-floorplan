///<reference path='../typings/app.d.ts'/>

// NOTE: Generic fetch that enforces type expectations from the incoming data. When calling the function, declare a data type (from the .d.ts file) that describes the "shape" of the data you are expecting. Await, because the nature of this app is that we can't do anything without data.
export async function http(url: string): Promise<RawAPIData> {
  const response = await fetch(url);

  const body = await response.json();

  return body;
}

// NOTE: filter by given campus ID. 
export function filterByCampus(campusID: string, data: ClassroomData[]): ClassroomData[] {
  // NOTE: our final results array
  let resultSet: ClassroomData[] = [];

  for(let item of data) {
    //console.log(item.campus);
    // NOTE: check the current record's ID. If it matches what we want, add to the results set
    if(item.campus === campusID) {
      resultSet.push(item);
    }
  }
  
  return resultSet;
}

// NOTE: filter by room type 
export function filterByRoomType(roomType: string, data: ClassroomData[]): ClassroomData[] {
  let resultSet: ClassroomData[] = [];
  console.log(`Room Type: ${roomType}`);
  for(let item of data) {
    // NOTE: check the current record's ID. If it matches what we want, add to the results set
    if(item.roomType === roomType) {
      resultSet.push(item);
    }
  }

  return resultSet;
}

export function filterByText(text: string, data: ClassroomData[]): ClassroomData[] {
  let resultSet: ClassroomData[] = [];
  
  for(let item of data) {
    if(item["displayName"].toUpperCase().includes(text.toUpperCase())) {
      resultSet.push(item);
    }

    if(item["campus"].toUpperCase().includes(text.toUpperCase())) {
      resultSet.push(item);
    }

    if(item["building"].toUpperCase().includes(text.toUpperCase())) {
      resultSet.push(item);
    }
  }
  
  return resultSet;
}


 
// NOTE: given an object and key of said object, returns the key value
// (needed for type assertion since Object.keys doesn't directly satisfy a type trying to match key value pairs with filter)
export function prop<T, K extends keyof T>(obj: T, key: K): any {
  return obj[key];
}