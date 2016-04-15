
/* clientSession.jsx */

//3rd party
var $ = require('jQuery');
var React = require("react");
var Backbone = require('backbone');
var Parse = require('parse');
var ParseReact = require('parse-react');
var moment = require('moment');

// parse server init
Parse.initialize("analyzetracking");
Parse.serverURL = 'http://analyzetracking.herokuapp.com/';

// Parse class models
var models = require('../models/models.js');

//require in child components
var ProgramItem = require('./programItem.jsx');
var TargetSessionList = require('./targetSessionList.jsx');

// bootstrap-react components
var ListGroup = require("react-bootstrap").ListGroup;
var ListGroupItem = require("react-bootstrap").ListGroupItem;
var Input = require("react-bootstrap").Input;
var Button = require('react-bootstrap').Button;


var ClientSession = React.createClass({
	getInitialState: function() {
    return {
    	programs: null,
    	sessionObj: null,

    };
},

saveSession: function(){
	var session = this.props.session;
	var endedTime = moment().format('MMMM Do YYYY, h:mm:ss a');
	session.set('dateEnded', endedTime);
	session.save();
},

	componentWillMount: function() {
		var self = this;
		var query = new Parse.Query(models.Program);
		var clientObj = this.props.clientObj;
		var querySession = new Parse.Query(models.Session);
	 	querySession.equalTo('dateEnded', undefined);
		querySession.find({
			 		success: function(results){
			 			if(results.length > 0){
			 				//alert("Successfully retrieved " + results.length + " sessions.");
			 				//console.log(results);

			 				query.equalTo('client', clientObj);
							query.include('targets');
							query.equalTo('dateEnded', undefined);
							query.find().then(function(programs){
								self.setState({"programs": programs});
								self.setState({"sessionObj": programs});
							}, function(error){
									console.log(error);
							});
			 				//	self.setState({"programs": results});
			 				//	self.setState({"sessionObj": results});


			 			} else {
			 				//var query = new Parse.Query(models.Program);

							query.equalTo('client', clientObj);
							query.include('targets');
							query.find().then(function(programs){
								self.setState({"programs": programs});
								self.setState({"sessionObj": programs});
							}, function(error){
									console.log(error);
							});
			 			}

			 		},
			 		error: function(){
			 			alert("Error: " + error.code + " " + error.message);

			 		},
	 			});

	},

		render: function() {
		//console.log(this.props);

			if(this.state.programs && this.state.sessionObj) {
				var session = this.props.session;
				var data = this.props.clientObj;
				var targetValues = this.state.targetValues;
				var programs = this.state.programs.map(function(program){
				var targetsArray = program.get('targets');

				var targets = targetsArray.map(function(target){
					return (
						<div  key = {target.id}>
							<TargetSessionList client={data} sessionObj={session} target={target}/>
						</div>
						);

				});
				return (
					<div className="target-session-container" key={program.id}>
					<div className="program-item" >
						<ListGroupItem className="program-item">{program.get('name')}</ListGroupItem>
						{targets}
					</div>
					</div>
					);

			}.bind(this));
			return (

				<div className="col-sm-10 col-sm-offset-1 client-session-container">

				<div>
				</div>
					<ListGroup>
						{programs}
					</ListGroup>

				</div>

				);
		} else {
			return (
				<div>
					<p>Loading...</p>
				</div>);
		}
	}

});

module.exports = ClientSession;
