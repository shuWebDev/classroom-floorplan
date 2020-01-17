///<reference path='./typings/app.d.ts'/>
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as queryString from 'query-string';
import App from './App';

let qs:queryString.ParsedQuery = queryString.parse(window.location.search);

let root:HTMLElement | null = document.querySelector<HTMLElement>("#root");

if((root !== null) && (root.dataset.audience)) {
  qs.audience = root.dataset.audience;
}

ReactDOM.render(
<App updated={Date.now()} displayName="Student Services Toolkit Application 2.0" audience={qs.audience} category={qs.category} tag={qs.tag} />, 
document.getElementById('root'));
