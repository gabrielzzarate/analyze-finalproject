var $ = require('jQuery');
var React = require("react");
var Parse = require('parse');
var ParseReact = require('parse-react');

Parse.initialize("analyzetracking");
Parse.serverURL = 'http://analyzetracking.herokuapp.com/';

var models = require('../models/models.js');
var ProgramItem = require('./programItem.jsx');
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
						<ListGroupItem className="program-item">{program.get('name')}<a onClick={this.addNo.bind(this, program)} className="no-icon"><i className=" fa fa-times"></i></a><a onClick={this.addYes.bind(this, program)} className="yes-icon"><i className="fa fa-check"></i></a></ListGroupItem>
					</div>
					);

			}.bind(this));
			return (

				<div className="col-sm-10 col-sm-offset-1 client-session-container">
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
