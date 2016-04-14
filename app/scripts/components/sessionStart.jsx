var $ = require('jQuery');
var React = require("react");
var Parse = require('parse');
var ParseReact = require('parse-react');
var moment = require('moment');
var _ = require('underscore');

Parse.initialize("analyzetracking");
Parse.serverURL = 'http://analyzetracking.herokuapp.com/';

//bootstrap-react components
var Tab = require("react-bootstrap").Tab;
var Tabs = require("react-bootstrap").Tabs;
var Button = require('react-bootstrap').Button;

// require in child components
var ClientSession = require('./clientSession.jsx');

// Parse class models
var models = require('../models/models.js');

var session = new models.Session();

var SessionStart = React.createClass({
	getInitialState: function() {
	    return {
	    	sessionData: null,
	    	masteredTargets: null,
	    };
	},
	handleSession: function(){
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
},
saveSession: function(){
	$('#session-save').addClass('hide');
	$('#session-start').removeClass('hide');
	$('#session-container').addClass('hide');

	var endedTime = moment().format('MMMM Do YYYY, h:mm:ss a');


			session.set('dateEnded', endedTime);
			session.set('targetsMastered', new models.Target());
			session.save();


	var self = this;
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
			//console.log("filtered:", groupedOutcomes);
			//console.log(targetIds);
			var mastered = _.mapObject(groupedOutcomes, function(group){
				if(group.length >= 3){
					return group;
				}

			});
			//console.log("mastered", mastered);
			var keys = _.keys(mastered);
			//console.log("keys", keys);

			// var queryArray = _.map(keys, function(id){
			// 	return queryTargets.equalTo('objectId', id);

			// });
			//console.log('queryArray', queryArray);
			//queryTargets.containedIn('objectId', keys);
			//queryTargets.find({
			//	success: function(results){

				//	console.log("target mastered:", results);
		session.set('dateEnded', endedTime);
		session.set('targetsMastered', keys);
		session.save( null, {
 						 success: function(session) {
					    // Execute any logic that should take place after the object is saved.
					    alert('New object created with objectId: ' + session.id);
					  },
					  error: function(session, error) {
					    // Execute any logic that should take place if the save fails.
					    // error is a Parse.Error with an error code and message.
					    alert('Failed to create new object, with error code: ' + error.message);
					  }
					});

			//session.set('dateEnded', endedTime);
			//session.set('targetsMastered', new models.Target(keys));
		//	session.save();
		},
		error: function(error){
			 alert("Error: " + error.code + " " + error.message);

		}
	});


},
// getCompletedTargets: function(){
// 	var self = this;
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
// 			//console.log("filtered:", groupedOutcomes);
// 			//console.log(targetIds);
// 			var mastered = _.mapObject(groupedOutcomes, function(group){
// 				if(group.length >= 3){
// 					return group;
// 				}

// 			});
// 			//console.log("mastered", mastered);
// 			var keys = _.keys(mastered);
// 			//console.log("keys", keys);
// 			var queryTargets = new Parse.Query(models.Target);
// 			// var queryArray = _.map(keys, function(id){
// 			// 	return queryTargets.equalTo('objectId', id);

// 			// });
// 			//console.log('queryArray', queryArray);
// 			queryTargets.containedIn('objectId', keys);
// 			queryTargets.find({
// 				success: function(results){
// 					console.log("target mastered:", results);
// 					self.setState({"masteredTargets": results});
// 				},
// 				error: function(error){
// 					alert("Error: " + error.code + " " + error.message);
// 				}
// 			});
// 			//session.set('dateEnded', endedTime);
// 			//session.set('targetsMastered', new models.Target(keys));
// 		//	session.save();
// 		},
// 		error: function(error){
// 			 alert("Error: " + error.code + " " + error.message);

// 		}
// 	});

// },
	render: function() {

		var todaysDate = moment().format("MMM Do YY");
		return (
			<div className="session-start-container">


		<Button onClick={this.handleSession} id="session-start" className="session-start-btn" data-toggle="collapse" data-target="#session-container" aria-expanded="false" aria-controls="collapseExample" >Start Session</Button>
		<Button onClick={this.saveSession} id="session-save" className="hide save-session-btn" >Save Session</Button>
		<span className="session-date">{todaysDate}</span>
			<div className="collapse" id="session-container">
  			<div>
  				<ClientSession  session={this.state.sessionData} clientId={this.props.clientId} clientObj={this.props.clientObj}/>
  			</div>
		</div>
		</div>
		);
	}
});

module.exports = SessionStart;
