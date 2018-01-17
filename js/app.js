var React = require('react');
var Render = require('react-dom').render;
var NYTApp = require('./components/NYTApp.react.js');
Render(
<NYTApp />,
  document.getElementById('app')
);
