
/* sessionStart.jsx */

//3rd party
var $ = require('jQuery');
var React = require("react");
var Parse = require('parse');
var ParseReact = require('parse-react');
var moment = require('moment');
var _ = require('underscore');


//parse server initialize
Parse.initialize("analyzetracking");
Parse.serverURL = 'http://analyzetracking.herokuapp.com/';

//bootstrap-react components
var Tab = require("react-bootstrap").Tab;
var Tabs = require("react-bootstrap").Tabs;
var Button = require('react-bootstrap').Button;

// require in child components
var ClientSession = require('./clientSession.jsx');
var CustomAlert = require('./customAlert.jsx');

// Parse class models
var models = require('../models/models.js');
var session = new models.Session();



var SessionStart = React.createClass({
	getInitialState: function() {
	    return {
	    	sessionData: null,
	    	masteredTargets: null,
	    	customAlert: false
	    };
	},
	handleSession: function(){
				$('#session-container').addClass('fadeIn').removeClass('hide');
				var self = this;

			session.set('client', new models.Client(this.props.clientObj));
			session.set('user', Parse.User.current());
			session.save().then(function(session){
					console.log(session);
					self.setState({'sessionData': session});
					var id = session.id;
					$('#session-save').removeClass('hide');
					$('#session-start').addClass('hide');
					$('#session-container').removeClass('hide');
					//Backbone.history.navigate("#session/" + id, {trigger: true});
					//var id = session.id;
				//	console.log(id);
			});
	// var scheduleRecord = new models.ScheduleRecord();
	// scheduleRecord.set('client', new models.Client(this.props.clientObj));
	// //scheduleRecord.set('therapistTeam', Parse.User.current());
	// scheduleRecord.set('dayOfWeek', "monday");
	// scheduleRecord.set('timeOfDay', "9:00AM");

	// var client = new models.Client();
	// client.set('therapistTeam', Parse.User.current());
	// client.save();



},
saveSession: function(){

	var self = this;
	var endedTime = moment().format('MMMM Do YYYY, h:mm:ss a');
	$('#session-save').addClass('hide');
	$('#session-start').removeClass('hide');
	$('#session-container').addClass('hide');
	var currentUser = Parse.User.current();
	var currentUsername = Parse.User.current().get('username');
	var queryUser = new Parse.Query(models.User);
		queryUser.equalTo('username', currentUsername);

		queryUser.find({
			success: function(results){


				var sessionsCompleted = results.map(function(user){
						return user.get('SessionCompleted');
				});

				var sessionInt = parseInt(sessionsCompleted);

				 currentUser.set('SessionCompleted', sessionInt + 1);
				currentUser.save();

			},
			error: function(error){
				console.log(error);
			}

		});



	var query = new Parse.Query(models.SessionOutcome);
	query.equalTo('client', this.props.clientObj);
	query.equalTo('outcome', true);
	query.find({
		success: function(results){
			//console.log("outcome results", results);
			var targetIds = results.map(function(outcome){
				return outcome.get('target').id;
			});
			//console.log('targetIds', targetIds);

			var groupedOutcomes = _.groupBy(results, function(result){
				return result.get('target').id;
			});
			//console.log("grouped:", groupedOutcomes);
			//console.log(targetIds);
			var masteredArray = [];
			var mastered = _.mapObject(groupedOutcomes, function(group, keys){
				//console.log("group" ,group);
				//console.log("group length", group.length);
				//console.log('key:', keys);
				 if (group.length >= 3){
				 		masteredArray.push(keys);
				 }
				 //console.log('masteredArray', masteredArray);

			});
			 //console.log('masteredArray', masteredArray);
			//console.log("mastered", mastered);
			//var keys = _.keys(masteredArray);
			//console.log("keys", keys);
			var queryTargets = new Parse.Query(models.Target);
			// var queryArray = _.map(keys, function(id){
			// 	return queryTargets.equalTo('objectId', id);

			// });
			//console.log('queryArray', queryArray);


			session.set('dateEnded', endedTime);
			//save an array of the ids of the targetsMastered to Parse
			session.set('targetsMastered', masteredArray);
			session.save( null, {
	 						 success: function(session) {
	 						 		self.openModal();

						    // Execute any logic that should take place after the object is saved.
						   // alert('New object created with objectId: ' + session.id);
						  },
						  error: function(session, error) {
						    // Execute any logic that should take place if the save fails.
						    // error is a Parse.Error with an error code and message.
						   // alert('Failed to create new object, with error code: ' + error.message);
						  }
						});

			},
		error: function(error){
			 alert("Error: " + error.code + " " + error.message);

		}
	});


},
	openModal: function(){
		this.setState({"customAlert": true});
	},
	closeModal: function(){
		this.setState({"customAlert": false});
	},

	render: function() {
		//this.getCompletedTargets();
		var todaysDate = moment().format("MMM Do YY");
		return (
			<div className="session-start-container">


		<Button onClick={this.handleSession} id="session-start" className="session-start-btn" >Start Session</Button>
		<Button onClick={this.saveSession} id="session-save" className="hide save-session-btn" >Save Session</Button>
		<span className="session-date">{todaysDate}</span>
			  			<div id="session-container" className="animated hide delay-three">
  				<ClientSession  session={this.state.sessionData} clientId={this.props.clientId} clientObj={this.props.clientObj}/>
  				<CustomAlert modal={this.state.customAlert} open={this.openModal} close={this.closeModal}/>
		</div>
		</div>
		);
	}
});

module.exports = SessionStart;
// getCompletedTargets: function(){
// 	var self = this;
// 	var endedTime = moment().format('MMMM Do YYYY, h:mm:ss a');
// 	var query = new Parse.Query(models.SessionOutcome);
// 	query.equalTo('client', this.props.clientObj);
// 	query.equalTo('outcome', true);
// 	query.find({
// 		success: function(results){
// 			//console.log("outcome results", results);
// 			var targetIds = results.map(function(outcome){
// 				return outcome.get('target').id;
// 			});
// 			//console.log('targetIds', targetIds);

// 			var groupedOutcomes = _.groupBy(results, function(result){
// 				return result.get('target').id;
// 			});
// 			console.log("grouped:", groupedOutcomes);
// 			//console.log(targetIds);
// 			var masteredArray = [];
// 			var mastered = _.mapObject(groupedOutcomes, function(group, keys){
// 				//console.log("group" ,group);
// 				//console.log("group length", group.length);
// 				console.log('key:', keys);
// 				 if (group.length >= 3){

// 				 		masteredArray.push(keys);
// 				 }
// 				 //console.log('masteredArray', masteredArray);

// 			});
// 			 console.log('masteredArray', masteredArray);
// 			//console.log("mastered", mastered);
// 			//var keys = _.keys(masteredArray);
// 			//console.log("keys", keys);
// 			var queryTargets = new Parse.Query(models.Target);
// 			// var queryArray = _.map(keys, function(id){
// 			// 	return queryTargets.equalTo('objectId', id);

// 			// });
// 			//console.log('queryArray', queryArray);


// 			session.set('dateEnded', endedTime);
// 			//save an array of the ids of the targetsMastered to Parse
// 			session.set('targetsMastered', masteredArray);
// 			session.save( null, {
// 	 						 success: function(session) {
// 						    // Execute any logic that should take place after the object is saved.
// 						    alert('New object created with objectId: ' + session.id);
// 						  },
// 						  error: function(session, error) {
// 						    // Execute any logic that should take place if the save fails.
// 						    // error is a Parse.Error with an error code and message.
// 						    alert('Failed to create new object, with error code: ' + error.message);
// 						  }
// 						});

// 			},
// 		error: function(error){
// 			 alert("Error: " + error.code + " " + error.message);

// 		}
// 	});


// },
