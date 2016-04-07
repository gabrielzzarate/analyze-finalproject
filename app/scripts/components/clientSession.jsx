var $ = require('jQuery');
var React = require("react");
var Parse = require('parse');
var ParseReact = require('parse-react');

Parse.initialize("analyzetracking");
Parse.serverURL = 'http://analyzetracking.herokuapp.com/';

// Parse class models
var models = require('../models/models.js');

//require in child components
var ProgramItem = require('./programItem.jsx');

// bootstrap-react components
var ListGroup = require("react-bootstrap").ListGroup;
var ListGroupItem = require("react-bootstrap").ListGroupItem;
var Input = require("react-bootstrap").Input;
var Button = require('react-bootstrap').Button;



var ClientSession = React.createClass({
	getInitialState: function() {
    return {
    	programs: null
    };
},
addYes: function(program){
	var programItem = $('.program-item');
	programItem = $(this);
	var self = $(this);
        self.siblings().removeClass('yes-background');
        self.toggleClass('yes-background');

},
addNo: function(){
	$('.program-item').toggleClass('no-background');
},
handleSession: function(){
	var session = new models.Session();
	session.set('client', new models.Client(this.props.clientObj));
	sessions.set('user', Parse.User.current());
	session.save();

},
saveSession: function(){
	var sessionOutcome = new models.SessionOutcome();
	//sessionOutcome.set('session')

},
	componentWillMount: function() {
		var self = this;

		var query = new Parse.Query(models.Program);

		query.equalTo('client', this.props.clientObj);
		query.include('targets');
		query.find().then(function(programs){
			self.setState({"programs": programs});
		}, function(error){
			console.log(error);
		});
	},
		render: function() {
		console.log(this.props);
		if(this.state.programs) {
			var data = this.props.clientObj;
			var programs = this.state.programs.map(function(program){
				var targetsArray = program.get('targets');
				var targets = targetsArray.map(function(target){
					return (
						<div className="col-sm-offset-2" key = {target.id}>
							{target.get('name')}<a className="no-icon"><i className=" fa fa-times"></i></a><a className="yes-icon"><i className="fa fa-check"></i></a>
						</div>
						);

				});
				return (
					<div className="program-item" key={program.id}>
						<ListGroupItem className="program-item">{program.get('name')}</ListGroupItem>
						{targets}
					</div>
					);

			}.bind(this));
			return (

				<div className="col-sm-10 col-sm-offset-1 client-session-container">
					<p> current programs</p>
					<Button onClick={this.handleSession}>Start Session</Button>
					<ListGroup>
						{programs}

					</ListGroup>

					<Button className="save-session-btn" onClick={this.saveSession}>Save Session</Button>
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
