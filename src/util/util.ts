///<reference path='../typings/app.d.ts'/>

// NOTE: Generic fetch that enforces type expectations from the incoming data. When calling the function, declare a data type (from the .d.ts file) that describes the "shape" of the data you are expecting. Await, because the nature of this app is that we can't do anything without data.
export async function loadData<T extends object>(url: string): Promise<T> {
  return await fetch(url)
    .then(response => {
      if(!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<T>
    })
    .then(data => {
      return data;
    });
}

// NOTE: filter by given campus ID. 
export function filterByCampus(campusID: string, data: ClassroomData[]): ClassroomData[] {
  // NOTE: our final results array
  let resultSet: ClassroomData[] = [];

  for(let item of data) {
    console.log(item.campus);
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
  
  for(let item of data) {
    console.log(item.campus);
    // NOTE: check the current record's ID. If it matches what we want, add to the results set
    if(item.campus === roomType) {
      resultSet.push(item);
    }
  }

  return resultSet;
}