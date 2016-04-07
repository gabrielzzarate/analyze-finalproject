var $ = require('jQuery');
var React = require("react");
var Parse = require('parse');
var ParseReact = require('parse-react');
var iconic = require('iconic/iconic.min.js');

Parse.initialize("analyzetracking");
Parse.serverURL = 'http://analyzetracking.herokuapp.com/';

var models = require('../models/models.js');
var TargetFormSet = require('./targetFormSet.jsx');

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

		var query = new Parse.Query(models.Target);

		query.equalTo('client', this.props.clientObj);
		query.include('program');
		query.find().then(function(targets){
		console.log("targets:", targets);

			//var programId = programs.get('id');
			//console.log("program id", programId);
			self.setState({"targets": targets});
			//var query = new Parse.Query(models.Target);
			//query.equalTo('program', programs.id);
			//query.find().then(function(targets){
			//	self.setState({"targets": targets});
			//});
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

		// save program
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
  		  		var formset = self.refs["formset" + i];


  		  		var targetName = $('.target-input').val();
  		  		var target = new models.Target();
  		  		target.set("name", targetName);
  		  		target.set("client", new models.Client(client));
  		  		target.set('program', programObj);

  		  		target.save();
  				}
  			},
  				error: function(note, error) {
   						 // Execute any logic that should take place if the save fails.
    					// error is a Parse.Error with an error code and message.
  					  alert('Failed to create new object, with error code: ' + error.message);
  					}


  		  	});
  		 // var targetName = $('#target-input').val();
				//var target = new models.Target();
			//	target.set("name", targetName);
			//	target.set("client", new models.Client(client));
			//	target.set('program', programObj);
			// 	target.save(null, {
			// 				success: function(target) {
   // 							 // Execute any logic that should take place after the object is saved.
  	// 	 					 alert('New object created with objectId: ' + target.id);

  	// 					},
  	// 					error: function(target, error) {
   // 							 // Execute any logic that should take place if the save fails.
   //  						// error is a Parse.Error with an error code and message.
  	// 		 			 alert('Failed to create new object, with error code: ' + error.message);
  	// 					}

			// 			});
  	// 			},
  	// 			error: function(note, error) {
   // 						 // Execute any logic that should take place if the save fails.
   //  					// error is a Parse.Error with an error code and message.
  	// 				  alert('Failed to create new object, with error code: ' + error.message);
  	// 				}
			//});


	},
	addTarget:function(){
		var newCount = this.state.targetCount + 1;
    this.setState({'targetCount': newCount});
	},

	render: function() {

		//console.log(this.props);
		if(this.state.programs) {

			var targetForms = [];
			for(var i=1; i<= this.state.targetCount; i++){
				var count = i;
				targetForms.push(<TargetFormSet key={count} count={count}  />);
			}
			var data = this.props.clientObj;
			var programs = this.state.programs.map(function(program){

				return (
					<div key={program.id}>
						<ListGroupItem>{program.get('name')}  <a onClick={this.handleClick.bind(this, program)} className="remove-program-icon"><i className="fa fa-times"></i></a></ListGroupItem>
					</div>
					);

			}.bind(this));
			return (
				<div>
						<div>
							<div className="col-sm-12 program-config-container">
								<p>{data.Name} current programs</p>
								<ListGroup>
									{programs}
								</ListGroup>

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
