var $ = require('jQuery');
var React = require("react");
var Parse = require('parse');
var ParseReact = require('parse-react');

Parse.initialize("analyzetracking");
Parse.serverURL = 'http://analyzetracking.herokuapp.com/';

var models = require('../models/models.js');

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
	componentWillMount: function() {
		var self = this;

		var query = new Parse.Query(models.Program);

		query.equalTo('client', this.props.clientObj);
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
				return (
					<div key={program.id}>
						<ListGroupItem>{program.get('name')}</ListGroupItem>
					</div>
					);

			});
			return (

				<div className="col-sm-6">
					<p> current programs</p>
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
