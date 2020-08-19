///<reference path='./typings/app.d.ts'/>
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as queryString from 'query-string';
import App from './App';

let qs:queryString.ParsedQuery = queryString.parse(window.location.search);

console.log(qs);

ReactDOM.render(
<App dataSource={qs.dataSource} absolute={qs.absolute} />, 
document.getElementById('root'));
