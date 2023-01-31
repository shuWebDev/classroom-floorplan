///<reference path='./typings/app.d.ts'/>
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as queryString from 'query-string';
import App from './App';

let qs:queryString.ParsedQuery = queryString.parse(window.location.search);


let resolveDS = '';

if(qs.dataSource === "dev") {
  resolveDS = "/_cs_apps/data/dev-data.json";
} else {
  resolveDS = "https://www.shu.edu/_cs_apps/rest/api/ClassroomInformation.cfc?method=getAll";
}

//console.log(qs);

ReactDOM.render(
<App dataSource={resolveDS}/>, 
document.getElementById('root'));
