
/* programAddForm.jsx */

// 3rd party
var $ = require('jQuery');
var React = require("react");
var Parse = require('parse');
var ParseReact = require('parse-react');

// parse server init
Parse.initialize("analyzetracking");
Parse.serverURL = 'http://analyzetracking.herokuapp.com/';

//require in child components
var TargetFormSet = require('./targetFormSet.jsx');

// Parse class models
var models = require('../models/models.js');

//bootstrap-react components
var Modal = require('react-bootstrap').Modal;
var Header = require('react-bootstrap').Header;
var Title = require('react-bootstrap').Title;
var Body = require('react-bootstrap').Body;
var Footer = require('react-bootstrap').Footer;
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;

var ProgramAddForm = React.createClass({
	getInitialState: function() {
	    return {
	    	targetCount: 1,

	    };
	},
	addTarget:function(){
		var newCount = this.state.targetCount + 1;
    this.setState({'targetCount': newCount});
	},
	handleSubmit: function(event){
		event.preventDefault();
		var programName = $('#program-input').val();
		var programDescription = $('#description-input').val();
		var client = this.props.clientObj;
		var programObj;
		var self = this;

		var program = new models.Program();
		program.set("name", programName);
		program.set("description", programDescription);
		program.set("client", new models.Client(this.props.clientObj));
		program.save(null, {
  		success: function(program) {

  		  alert('New object created with objectId: ' + program.id);
  		  	programObj = program;
  		  	self.props.getPrograms();
  		  	var programTargets = [];

  		  	for(var i=1; i <= self.state.targetCount; i++){

  		  		//console.log("formset: ", i, self.refs["formset"+i].refs["name"+i]);
  		  		var name = self.refs["formset"+i].refs["name"+i].value;
  		  		var target = new models.Target();

  		  		target.set("name", name);
  		  		target.set("client", new models.Client(this.props.clientObj));
  		  		target.set('program', programObj);
  		  		programTargets.push(target);
  		  	}
  		  		Parse.Object.saveAll(programTargets).then(function(){
  		  			program.set('targets', programTargets);
  		  			program.save();
  		  		});

  			},
  				error: function(note, error) {
   						 // Execute any logic that should take place if the save fails.
    					// error is a Parse.Error with an error code and message.
  					  alert('Failed to create new object, with error code: ' + error.message);
  					}
  		  	});
	},
	render: function() {
		var targetForms = [];
			for(var i=1; i<= this.state.targetCount; i++){
				var count = i;
				targetForms.push(<TargetFormSet key={count} count={count} ref={"formset" + count} />);
			}
		return (

			<div>

					<Modal show={this.props.modal} close={this.props.close} bsSize="large" aria-labelledby="contained-modal-title-lg">
						<Modal.Header closeButton>
							 <Modal.Title id="contained-modal-title-sm">Modal heading</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<form onSubmit={this.handleSubmit}>
								<Input id="program-input" className="program-form" type="text" placeholder="Enter new program"/>
								<Input id="description-input" className="program-form" type="textarea" placeholder="Enter mastery criteria"/>
								<div className="col-sm-8 pull-right">
									<a onClick={this.addTarget} className="add-target-btn"><i className="fa fa-plus-circle"></i></a>
									{targetForms}
								</div>


								<Button type="submit" className="secondary-btn program-add-btn">Add Program</Button>

							</form>
						</Modal.Body>
						<Modal.Footer>
								<Button type="submit" className="secondary-btn program-add-btn">Add Program</Button>

          			<Button onClick={this.props.close}>Close</Button>
        		</Modal.Footer>
				</Modal>
			</div>
		);
	}

});

module.exports = ProgramAddForm;
