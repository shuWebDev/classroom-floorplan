///<reference path='../typings/app.d.ts'/>

// NOTE: Generic fetch that enforces type expectations from the incoming data. When calling the function, declare a data type (from the .d.ts file) that describes the "shape" of the data you are expecting. Await, because the nature of this app is that we can't do anything without data.
export async function http(url: string): Promise<RawAPIData> {
  const response = await fetch(url);

  const body = await response.json();

  return body;
}

// NOTE: given an object and key of said object, returns the key value
// (needed for type assertion since Object.keys doesn't directly satisfy a type trying to match key value pairs with filter)
function prop<T, K extends keyof T>(obj: T, key: K): any {
  return obj[key];
}

// NOTE: function to compare one record to another for the purposes of sorting
const byText = <T extends object>(getTextProperty: (Object: T) => string) => (a: T, b: T) => {
  let recordAField = getTextProperty(a); 
  let recordBField = getTextProperty(b);

  recordAField = (typeof recordAField === "string")? recordAField.toUpperCase() : recordAField;
  recordBField = (typeof recordBField === "string")? recordBField.toUpperCase() : recordBField;

  let comparison:number = 0;

  // NOTE: sorting string fields
  if(typeof recordAField === "string" && typeof recordBField === "string") {
    if(recordAField > recordBField) {
      comparison = 1;
    } else if (recordAField < recordBField) {
      comparison = -1;
    }
  }

  return comparison;
}

// NOTE: filter by given campus ID. 
export function filterByCampus(campusID: string, data: ClassroomData[]): ClassroomData[] {
  // NOTE: initialize our final results array
  let resultSet: ClassroomData[] = [];

  // NOTE: cycle through all record from the input set, pull out ones that match the campus we are looking for...
  for(let item of data) {
    // NOTE: check the current record's ID. If it matches what we want, add to the results set
    if(item.campus === campusID) {
      resultSet.push(item);
    }
  }
  
  return resultSet.sort(byText((c: ClassroomData) => c['room-number']));
}

// NOTE: filter by room type 
export function filterByRoomType(roomType: string, data: ClassroomData[]): ClassroomData[] {
  let resultSet: ClassroomData[] = [];
  
  for(let item of data) {
    // NOTE: check the current record's ID. If it matches what we want, add to the results set
    if(item['room-type'] === roomType) {
      //console.log(item.roomType);
      resultSet.push(item);
    }
  }

  return resultSet;//orderByCampus(resultSet);
}

export function orderByCampus(data: ClassroomData[]) {
  let resultSet: ClassroomData[] = [];

  // NOTE: split up results by campus location (SO, then IHS, then Law)
  let soRooms: ClassroomData[] = [];
  let ihsRooms: ClassroomData[] = [];
  let lawRooms: ClassroomData[] = [];

  for(let item of data) {
    switch(item.campus) {
      case "Newark" : lawRooms.push(item); break;
      case "Nutley" : ihsRooms.push(item); break;
      default: soRooms.push(item); break;
    }
  }

  // NOTE: sort each group alphabetically
  soRooms = soRooms.sort(byText((c: ClassroomData) => c['room-name']));
  ihsRooms = ihsRooms.sort(byText((c: ClassroomData) => c['room-name']));
  lawRooms = lawRooms.sort(byText((c: ClassroomData) => c['room-name']));

  // NOTE: merge individually sorted lists
  resultSet = resultSet.concat(soRooms, ihsRooms, lawRooms);
  
  return resultSet;
}

// NOTE: given a string of text, iterate through all records provided and return those that have a field that contains the text, without duplicates
export function filterByText(text: string, data: ClassroomData[]): ClassroomData[] {
  let resultSet: ClassroomData[] = [];
  //console.log(data);
  for(let item of data) {
    const keys: string[] = Object.keys(item);
    //console.log(keys);
    for(let k of keys) {
      let p: string = prop(item, k);
      //console.log(typeof p);
      if(typeof p !== "object") { 
        if(p.toUpperCase().indexOf(text.toUpperCase()) >= 0) {
          if(!resultSet.includes(item)) {
            resultSet.push(item);
          }
        }
      }
    } 
  }
  //console.log(resultSet);
  return orderByCampus(resultSet);
}