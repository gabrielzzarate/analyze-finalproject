//3rd party
var React = require('react');
var Parse = require('parse');
var iconic = require('iconic/iconic.min.js');
Parse.initialize("analyzetracking");
Parse.serverURL = 'http://analyzetracking.herokuapp.com/';

//require in child components
var DashboardEvents = require('./dashboardEvents.jsx').DashboardEvents;
var DashboardCaseload = require('./dashboardCaseload.jsx').DashboardCaseload;

var Home = React.createClass ({
	render: function() {
		var style = {
        backgroundColor: 'rgb(225, 228, 235)'
       };
    var currentUser = Parse.User.current().get('username');
		return (

			<div style ={style}>
			 	<div className = "col-sm-10 col-sm-offset-1 main-dashboard-container">
			 			<div className="col-sm-10 col-sm-offset-1 dashboard-welcome-container">
			 				<div className="welcome-left col-sm-6">
			 					<span className="welcome-user">Welcome, {currentUser}</span>
			 				</div>
			 				<div className="welcome-right col-sm-4 col-sm-offset-2">
			 					<span className="welcome-date">Week of April 4, 2016</span>

			 				</div>

			 			</div>
			 			<div className="dashboard-events-container col-sm-10 col-sm-offset-1">
			 				<DashboardEvents />
						</div>

						<div className="dashboard-caseload-container col-sm-12">
							<DashboardCaseload />
						</div>
			 	</div>
			</div>
		);
	}
});

module.exports = Home;

