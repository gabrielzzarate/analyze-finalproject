
/* Interface.jsx */

//3rd party
var $ = require('jQuery');
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var _ = require('underscore');
require('backbone-react-component');
var Parse =require('parse');

//setup parse SDK to connect to server
Parse.initialize('analyzetracking');
Parse.serverURL= "http://analyzetracking.herokuapp.com/";

//require in child components
var Header = require('./Header.jsx');
var Sidebar = require('./Sidebar.jsx');
var Login = require('./Login.jsx');
var Home = require('./Home.jsx');
var ClientDetail = require("./clientDetail.jsx").ClientDetail;
var Admin = require("./Admin.jsx");

// } else if (this.props.router.current == 'session') {
// 				body = (
// 					<ClientDetail sessionId={this.props.router.sessionId} id={this.props.router.clientId} />
// 					);

// main interface component

var Interface = React.createClass({
	componentWillMount: function() {
		this.callback =(function(){
			this.forceUpdate();
		}).bind(this);
		this.props.router.on('route', this.callback);
	},
	componentWillUnmount: function() {
		this.props.router.off('route', this.callback);
	},
	render: function() {
		var body;
			if(this.props.router.current == 'home'){
				body = (
					//home screen
					<Home />
					);
				} else if(this.props.router.current == 'admin'){
					body = (
						// admin screen
						<Admin id={this.props.router.clientId} />
						);

			} else if (this.props.router.current == 'profile'){
					body = (
						//client profile
						<ClientDetail id={this.props.router.clientId} />
						);

			} else {
					body = (
		        <div>
		          <h1>Page Doesnt Exist</h1>
		        </div>
        	);

			}
			var style = {
        backgroundColor: 'rgb(225, 228, 235)'
       };
			return (
				<div className="app-content">
					<div className="row body-container">
					<div id="sidebar" className="col-sm-3">

						<Sidebar />

					</div>
					<div id="main-container" style={style} className="col-sm-9">
						<Header />
						<div id="body-container" className="col-sm-12">

						{body}
						</div>
					</div>
					</div>



				</div>

				);
	}


});

module.exports= {
	"Interface": Interface
};

