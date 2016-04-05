var $ = require('jQuery');
var React = require("react");
var Parse = require('parse');
var ParseReact = require('parse-react');
var iconic = require('iconic/iconic.min.js');

Parse.initialize("analyzetracking");
Parse.serverURL = 'http://analyzetracking.herokuapp.com/';

var models = require('../models/models.js');

var ListGroup = require("react-bootstrap").ListGroup;
var ListGroupItem = require("react-bootstrap").ListGroupItem;
var Input = require("react-bootstrap").Input;
var Button = require('react-bootstrap').Button;



var ClientPrograms = React.createClass({

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
	componentWillUpdate: function() {
	      this.componentWillMount();
	},
	handleClick: function(program){
		console.log("programs:", this.state.programs);
	},
	handleSubmit: function(event){
		event.preventDefault();
		var programName = $('#program-input').val();

		var program = new models.Program();
		program.set("name", programName);
		program.set("client", new models.Client(this.props.clientObj));
		program.save(null, {
  		success: function(note) {
   			 // Execute any logic that should take place after the object is saved.
  		  alert('New object created with objectId: ' + note.id);
  			},
  		error: function(note, error) {
   				 // Execute any logic that should take place if the save fails.
    			// error is a Parse.Error with an error code and message.
  			  alert('Failed to create new object, with error code: ' + error.message);
  			}
		});
	},

	render: function() {
		//console.log(this.props);
		if(this.state.programs) {
			var data = this.props.clientObj;
			var programs = this.state.programs.map(function(program){

				return (
					<div key={program.id}>
						<ListGroupItem>{program.get('name')}  <a onClick={this.handleClick.bind(this, program)}><i className="remove-program-icon fa fa-times"></i></a></ListGroupItem>
					</div>
					);

			}.bind(this));
			return (
				<div>
				<div className="col-sm-6">
					<p>{data.Name} current programs</p>
					<ListGroup>
						{programs}
					</ListGroup>

				</div>
				<div className="col-sm-6">
					<p>Add behavior targets</p>
					<form onSubmit={this.handleSubmit}>
						<Input id="program-input" className="program-form" type="text" placeholder="Enter new program"/>
						<Button type="submit" className="secondary-btn program-add-btn">Add</Button>
					</form>
				</div>
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

module.exports = ClientPrograms;
