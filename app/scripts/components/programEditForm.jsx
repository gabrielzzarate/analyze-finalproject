var $ = require('jQuery');
var React = require("react");
var Parse = require('parse');
var ParseReact = require('parse-react');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');

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
		var programName = program.get('name');
		var masteryCriteria = program.get('description');
		return {
    	programName: programName,
    	masteryCriteria: masteryCriteria
		};
	},
	getInitialState: function() {
		var programName ='', masteryCriteria = '', targets = '', state = {};
		console.log('programObj', this.props.programObj);

		if(this.props.programObj){
			var program = this.props.programObj;
			state = this.buildProgram(program);
		}
		state.targetCount = 1;
		state.targets = [];
	    console.log('state', state);
	    return state;
	},
	componentWillReceiveProps: function(nextProps) {
		//console.log('nextProps.programObj', nextProps);
		console.log('edit', nextProps.programObj);
	  this.setState(this.buildProgram(nextProps.programObj));
	},
	// componentWillMount: function() {

	// 	if(this.props.programObj){
	// 		var program = this.props.programObj;
	// 		var programName = program.get('name');
	// 		var masteryCriteria = program.get('description');

	// 		this.setState({
	// 			"programName" : programName,
	// 			"masterCriteria": masterCriteria

	// 		});
	// 		console.log(this.state.programName);
	// 	}

	// },
	addTarget:function(){
		var newCount = this.state.targetCount + 1;
    this.setState({'targetCount': newCount});
	},
	render: function() {
	//	console.log("edit this program", this.props.programObj);


		if(this.props.programObj) {
			var targetForms = [];
			var program = this.props.programObj;
			//console.log(program.get('name'));
				for(var i=1; i<= this.state.targetCount; i++){
					var count = i;
					targetForms.push(<TargetFormSet targets={this.state.targets} key={count} count={count} ref={"formset" + count} />);
				}
			//console.log('programName', this.state.programName);
			return (

				<div>

						<Modal show={this.props.modal} close={this.props.close} bsSize="large" aria-labelledby="contained-modal-title-lg">
							<Modal.Header closeButton>
								 <Modal.Title id="contained-modal-title-sm"> Edit Program: {program.get('name')} </Modal.Title>
								// <Button onClick={this.props.close}>Close</Button>
							</Modal.Header>
							<Modal.Body>
								<div className="modal-edit-container">
								<form onSubmit={this.props.handleSubmit}>
								<div className="col-sm-6">
									<Input id="program-input" className="program-form" type="text" placeholder="Enter new program"  valueLink={this.linkState('programName')}/>
									<Input id="description-input" className="program-form" type="textarea" placeholder="Enter mastery criteria" valueLink={this.linkState('masteryCriteria')}/>
								</div>
								<div className="col-sm-6">

										<a onClick={this.addTarget} className="add-target-btn"><i className="fa fa-plus-circle"></i></a>
										{targetForms}

								</div>

								</form>
								</div>
							</Modal.Body>
							<Modal.Footer>
									<Button type="submit" className="secondary-btn program-add-btn">Save Program</Button>

	          			<Button onClick={this.props.close}>Close</Button>
	        		</Modal.Footer>
					</Modal>
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
