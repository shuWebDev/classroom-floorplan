///<reference path='./typings/app.d.ts'/>
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as queryString from 'query-string';
import App from './App';

let qs:queryString.ParsedQuery = queryString.parse(window.location.search);


let resolveDS = '';

/*if(qs.dataSource === "dev") {
  resolveDS = "/_cs_apps/data/dev-data.json";
} else {
  resolveDS = "https://www.shu.edu/_cs_apps/rest/api/ClassroomInformation.cfc?method=getAll";
}*/

///_resources/js/_js_apps/classroom-information/ClassroomInformation.json

//console.log(qs);

ReactDOM.render(
<App dataSource={"https://www.shu.edu/_resources/js/_js_apps/classroom-information/ClassroomInformation.json"}/>, 
document.getElementById('root'));
