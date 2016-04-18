
/* Home.jsx */

//3rd party
var React = require('react');
var Parse = require('parse');
var moment = require('moment');


// parse server init
Parse.initialize("analyzetracking");
Parse.serverURL = 'http://analyzetracking.herokuapp.com/';

//require in child components
var DashboardEvents = require('./dashboardEvents.jsx').DashboardEvents;
var DashboardCaseload = require('./dashboardCaseload.jsx').DashboardCaseload;

// Parse class models
var models = require('../models/models.js');

var Home = React.createClass ({
	getInitialState: function() {
	    return {
	        allClientObj : 0,
	    };
	},
	componentWillMount: function() {
		var self = this;
		var query = new Parse.Query(models.Client);
		query.equalTo('therapistTeam', Parse.User.current());
		query.find({
			success: function(results){
				self.setState({"allClientObj": results});
			},

			error: function(error){
				console.log(error);

			}
		});
	},
	render: function() {

		var style = {
        backgroundColor: 'rgb(225, 228, 235)'
       };
    var currentUser = Parse.User.current().get('username');
		return (

			<div style ={style}>
			 	<div className = "col-sm-10 col-sm-offset-1 col-xs-9 col-xs-offset-2 main-dashboard-container">
			 			<div className="col-sm-10 col-sm-offset-1 dashboard-welcome-container">
			 				<div className="welcome-left col-sm-6 col-xs-6">
			 					<span className="welcome-user">Welcome, {currentUser}</span>
			 				</div>
			 				<div className="welcome-right col-sm-5 col-sm-offset-1">
			 					<span className="welcome-date">Week of {moment().format('LL')}  </span>

			 				</div>

			 			</div>
			 			<div className="dashboard-events-container col-sm-10 col-sm-offset-1">
			 				<DashboardEvents allClientObj={this.state.allClientObj}/>
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

