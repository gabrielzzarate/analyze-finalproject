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
var Table = require('react-bootstrap').Table;



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
						<tbody key={target.id}>
									<tr>
										<td>{target.get('name')}</td>
										<td><a className="yes-icon"><i className="fa fa-check"></i></a></td>
										<td><a className="no-icon"><i className=" fa fa-times"></i></a></td>

									</tr>

						</tbody>

						);

				});
				return (
					<div key={program.id} className="target-session-container">
					<div className="program-item">
						<ListGroupItem className="program-item">{program.get('name')}</ListGroupItem>
						<Table striped bordered condensed hover>
								<thead>
								<tr>
									<th>Targets</th>
									<th>Y</th>
									<th>N</th>
								</tr>
							</thead>
							{targets}
						</Table>
					</div>
					</div>
					);

			}.bind(this));
			return (

				<div className="col-sm-10 col-sm-offset-1 client-session-container">
					<form onSubmit={this.saveSession}>
					<div>

						<Button onClick={this.handleSession}>Start Session</Button>
						<Button className="save-session-btn" type="submit">Save Session</Button>
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
