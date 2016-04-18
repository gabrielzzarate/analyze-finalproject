//3rd party
window.jQuery = $ = require('jquery');
var Parse = require('parse');
var $ = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
require('backbone-react-component');
var bootstrap = require('bootstrap-sass/assets/javascripts/bootstrap.js');
var iconic = require('iconic/iconic.min.js');
var Chart = require('chart.js');
//local
var router = require('./router.js'); // app main router
var Interface = require("./components/Interface.jsx").Interface; //main app component

$(function(){
Backbone.history.start();









//when page loads interface component renders first, passes in router
// ReactDOM.render(
// 	React.createElement(Interface, {
// 		router: router
// 	}),
// 	document.getElementById('main-content')
// 	);

});
