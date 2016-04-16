
/* programEditForm.jsx */

// 3rd party
var $ = require('jQuery');
var React = require("react");
var Parse = require('parse');
var ParseReact = require('parse-react');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');

// parse server init
Parse.initialize("analyzetracking");
Parse.serverURL = 'http://analyzetracking.herokuapp.com/';

//require in child components
var TargetFormSet = require('./targetFormSet.jsx');

//bootstrap-react components
var Modal = require('react-bootstrap').Modal;
var Header = require('react-bootstrap').Header;
var Title = require('react-bootstrap').Title;
var Body = require('react-bootstrap').Body;
var Footer = require('react-bootstrap').Footer;
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;



var ProgramEditForm = React.createClass({
	mixins: [LinkedStateMixin],

	buildProgram: function(program){
		var programName = program.get("name")  ;
		var masteryCriteria = program.get('description');
		var targets = program.get('targets');
		var targetNames = targets.map(function(target){
			return target.get('name');
		});

		return {
    	programName: programName,
    	masteryCriteria: masteryCriteria,
    	targets: targetNames,
    	targetCount: targetNames.length
		};
	},
	getInitialState: function() {
		var programName ='', masteryCriteria = '', targets = [], state = {};
		//console.log('programObj', this.props.programObj);

		if(this.props.programObj){
			var program = this.props.programObj;
			state = this.buildProgram(program);
		}
		state.targetCount = 1;
		state.targets = '';
	    //console.log('state', state);
	    return state;
	},
	componentWillReceiveProps: function(nextProps) {
		//console.log('nextProps.programObj', nextProps);
		console.log('edit', nextProps.programObj);
	  this.setState(this.buildProgram(nextProps.programObj));
	},

	addTarget:function(){
		var newCount = this.state.targetCount + 1;
    this.setState({'targetCount': newCount});
	},
	render: function() {
	//	console.log("edit this program", this.props.programObj);


		if(this.props.programObj) {
			var targetForms = [];
			var program = this.props.programObj;
			//console.log(program.get('name'));w
				for(var i=1; i<= this.state.targetCount; i++){
					var count = i;
					targetForms.push(<TargetFormSet targets={this.state.targets} key={count} count={count} ref={"formset" + count} />);
				}
			//console.log('programName', this.state.programName);
			return (

				<div className = "splash-screen">
						<div className = "splash-container">
							<Modal.Header closeButton>
							 <Modal.Title id="contained-modal-title-sm">Edit a Program</Modal.Title>
						</Modal.Header>

								<div className="modal-edit-container">
								<Modal.Body>
								<form onSubmit={this.props.handleSubmit}>
								<div className="col-sm-6">
									<Input id="program-input" className="program-form" type="text" placeholder="Enter new program"  valueLink={this.linkState('programName')}/>
									<Input id="description-input" className="program-form" type="textarea" placeholder="Enter mastery criteria" valueLink={this.linkState('masteryCriteria')}/>
								</div>
								<div className="col-sm-6">

										<a onClick={this.addTarget} className="add-target-btn"><i className="fa fa-plus-circle"></i></a>
										{targetForms}

								</div>

									<Button type="submit" className="secondary-btn program-add-btn">Add Program</Button>

								</form>
								</Modal.Body>
								</div>

						</div>
				</div>
		);
	} else {
			return (
				<p> </p>
				);
	}
}

});

module.exports = ProgramEditForm;
