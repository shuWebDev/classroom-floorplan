///<reference path='./typings/app.d.ts'/>
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//import * as queryString from 'query-string';
import App from './App';

//let qs:queryString.ParsedQuery = queryString.parse(window.location.search);


//let resolveDS = '';

ReactDOM.render(
  <App dataSource={"https://www.shu.edu/_resources/dmc/php/classroominformation.php?datasource=classroominformation&returntype=json&ort=room-number%20asc"}/>, 
  document.getElementById('root'));
