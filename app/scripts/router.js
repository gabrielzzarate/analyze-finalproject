//3rd party
var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
require('backbone-react-component');
var Parse = require('parse');

var Interface = require("./components/Interface.jsx").Interface;
var Login = require("./components/Login.jsx");
var appContainer = document.getElementById('main-content');

/* after parse user configured, make an index route that checks
if a user is logged in and if he is send him to a login route or a home route */

var Router = Backbone.Router.extend({
	_appMounted: false,

	routes: {
		"": "login",
		"home/": "home",
		"profile/(:id)": "profile",
		"profile/(:id)/session/(:sessionId)/": 'session',
		"admin/" : "admin",
	},

	login: function(){
		ReactDOM.unmountComponentAtNode(appContainer);
		ReactDOM.render(
			React.createElement(Login, {router: self}),
			appContainer
		);

		this._appMounted = false;
	},
	mainApp: function(route) {
		var self = this;
		self.current = route;

		//Bail if the app component is already mounted
		if(this._appMounted){
			return;
		};
		ReactDOM.unmountComponentAtNode(appContainer);
		ReactDOM.render(
			React.createElement(Interface,
				{router: self}),
				appContainer);
				this._appMounted = true;

	},
	home: function(){
		this.mainApp("home");
	},
	profile: function(id){
		this.clientId = id;
		this.mainApp("profile");
	},
	session: function(id, sessionId){
		this.clientId = id;
		this.sessionId = sessionId;
		this.mainApp("session");
	},
	admin: function(){
		this.mainApp("admin");
	}
});

module.exports = new Router();




