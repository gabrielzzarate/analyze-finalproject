var $ = require('jQuery');
var React = require("react");
var Parse = require('parse');
var ParseReact = require('parse-react');
var iconic = require('iconic/iconic.min.js');
var _ = require('underscore');

Parse.initialize("analyzetracking");
Parse.serverURL = 'http://analyzetracking.herokuapp.com/';

// Parse class models
var models = require('../models/models.js');

// require in child components
var TargetFormSet = require('./targetFormSet.jsx');
var SiteHeader = require('./siteheader.jsx');

// bootstrap-react components
var ListGroup = require("react-bootstrap").ListGroup;
var ListGroupItem = require("react-bootstrap").ListGroupItem;
var Input = require("react-bootstrap").Input;
var Button = require('react-bootstrap').Button;



var ClientPrograms = React.createClass({

	getInitialState: function() {
	    return {
	    	programs: null,
	    	targets: null,
	    	targetCount: 1,
	    };
	},

	getPrograms: function(){
		var self = this;
		var targetsObj;
		var query = new Parse.Query(models.Program);

		query.equalTo('client', this.props.clientObj);
		query.include('targets');
		query.find().then(function(programs){
				console.log("program:", programs);
				self.setState({"programs": programs});



		}, function(error){
			console.log(error);
		});
	},
	componentWillMount: function() {
		this.getPrograms();
	},

	handleClick: function(program){
		console.log("programs:", this.state.programs);
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
   			 // Execute any logic that should take place after the object is saved.
  		  alert('New object created with objectId: ' + program.id);
  		  	programObj = program;
  		  	self.getPrograms();
  		  	var programTargets = [];


  		  	for(var i=1; i <= self.state.targetCount; i++){

  		  		console.log("formset: ", i, self.refs["formset"+i].refs["name"+i]);
  		  		var name = self.refs["formset"+i].refs["name"+i].value;
  		  		var target = new models.Target();

  		  		target.set("name", name);
  		  		target.set("client", new models.Client(client));
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
	addTarget:function(){
		var newCount = this.state.targetCount + 1;
    this.setState({'targetCount': newCount});
	},

	render: function() {

		if(this.state.programs) {

			var targetForms = [];
			for(var i=1; i<= this.state.targetCount; i++){
				var count = i;
				targetForms.push(<TargetFormSet key={count} count={count} ref={"formset" + count} />);

			}
			var data = this.props.clientObj;


			var programs = this.state.programs.map(function(program){
					var targetsArray = program.get('targets');

					var targets = targetsArray.map(function(target){
						return (
							<div className="col-sm-6 col-sm-offset-1" key = {target.id}>

								<span>{target.get('name')}</span>
							</div>
							);
					});
				return (
					<div key={program.id}>
						<div className="col-sm-12 program-config-item-container">
						 <SiteHeader title={program.get('name')}/>

							<div className="col-sm-10 col-sm-offset-1">
								<p className="master-criteria-text">mastery criteria: {program.get('description')}</p>
								<h5 className="targets-header">Targets:</h5>
								<ul>
									<li className="targets-item">{targets}</li>
								</ul>
							</div>
						</div>
					</div>
					);

			}.bind(this));
			return (
				<div>
						<div>
							<div className="col-sm-12 program-config-container">
									{programs}
							</div>
					</div>

						<div className="col-sm-12 program-form-container">
							<p>Add behavior targets</p>
							<form onSubmit={this.handleSubmit}>
								<Input id="program-input" className="program-form" type="text" placeholder="Enter new program"/>
								<Input id="description-input" className="program-form" type="textarea" placeholder="Enter mastery criteria"/>
								<div className="col-sm-8 pull-right">
									<a onClick={this.addTarget} className="add-target-btn"><i className="fa fa-plus-circle"></i></a>
									{targetForms}
								</div>

								<Button type="submit" className="secondary-btn program-add-btn">Add Program</Button>

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
