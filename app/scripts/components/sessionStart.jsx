var $ = require('jQuery');
var React = require("react");
var Parse = require('parse');
var ParseReact = require('parse-react');
var moment = require('moment');

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



var SessionStart = React.createClass({
	getInitialState: function() {
	    return {
	    	sessionData: null,
	    };
	},
	handleSession: function(){
	var self = this;
	var session = new models.Session();
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

	var session = this.props.session;
	var endedTime = moment().format('MMMM Do YYYY, h:mm:ss a');
	session.set('dateEnded', endedTime);
	session.save();

},
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
