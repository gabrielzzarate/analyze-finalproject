var $ = require('jQuery');
var React = require("react");
var Backbone = require('backbone');
var Parse = require('parse');
var ParseReact = require('parse-react');
var moment = require('moment');

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
    	sessionObj: {},

    };
},

handleSession: function(){
	var self = this;
	var session = new models.Session();
	session.set('client', new models.Client(this.props.clientObj));
	session.set('user', Parse.User.current());
	session.save().then(function(session){
			console.log(session);
			self.setState({'sessionObj': session});
			var id = session.id;
			//Backbone.history.navigate("#session/" + id, {trigger: true});
			//var id = session.id;
		//	console.log(id);
	});

},
saveSession: function(){


},

	componentWillMount: function() {
		var self = this;

		var query = new Parse.Query(models.Program);

		query.equalTo('client', this.props.clientObj);
		query.include('targets');
		query.find().then(function(programs){
			self.setState({"programs": programs});
			self.setState({"sessionObj": programs});
		}, function(error){
			console.log(error);
		});
	},

		render: function() {
		//console.log(this.props);

		if(this.state.programs && this.state.sessionObj) {

			var todaysDate = moment().format("MMM Do YY");
			var session = this.state.sessionObj;
			console.log('session', session);
			var sessionId = session.id;

			console.log('session id', sessionId);


			//console.log(session);


			var data = this.props.clientObj;
			var targetValues = this.state.targetValues;
			var programs = this.state.programs.map(function(program){


				var targetsArray = program.get('targets');

				var targets = targetsArray.map(function(target){
					return (
						<div  key = {target.id}>
							<TargetSessionList  sessionObj={session} target={target} targetValues={targetValues}/>
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
					<form onSubmit={this.saveSession}>
					<div>

						<Button className="session-start-btn" onClick={this.handleSession}>Start Session</Button>
						<Button className="save-session-btn" type="submit">Save Session</Button>
						<span className="session-date">{todaysDate}</span>
					</div>
					<ListGroup>
						{programs}

					</ListGroup>
					</form>
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
