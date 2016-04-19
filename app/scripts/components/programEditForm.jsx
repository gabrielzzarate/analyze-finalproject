
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

		state.targetCount = 0;
		state.targets = program.get('targets').name;
	    //console.log('state', state);

	}
	return state;
},
	componentWillReceiveProps: function(nextProps) {
		//console.log('nextProps.programObj', nextProps);

	  this.setState(this.buildProgram(nextProps.programObj));
	},

	addTarget:function(){
		var newCount = this.state.targetCount + 1;
    this.setState({'targetCount': newCount});
	},
	handleSubmit: function(){

	},
	render: function() {
	//	console.log("edit this program", this.props.programObj);


		if(this.props.programObj) {

			var targetForms = [];
			var program = this.props.programObj;
			console.log("program", program);
			console.log(this.state.targets);
			//console.log(program.get('name'));w
				for(var i=1; i<= this.state.targetCount; i++){
					var count = i;
					targetForms.push(<TargetFormSet targets={this.state.targets[i]} key={count} count={count} ref={"formset" + count} />);
				}
			//console.log('programName', this.state.programName);
			return (


					<Modal show={this.props.modal} dialogClassName="custom-modal">
					<form onSubmit={this.props.handleSubmit}>
							<Modal.Header >
							 <Modal.Title id="contained-modal-title-sm">Edit Program</Modal.Title>
						</Modal.Header>

										<Modal.Body>
											<div className="row">
											<div className="col-sm-6">
												<Input id="program-edit-input" className="program-input program-form" type="text" placeholder="Enter new program"  valueLink={this.linkState('programName')}/>
												<Input id="description-edit-input" className=" description-input program-form" type="textarea" placeholder="Enter mastery criteria" valueLink={this.linkState('masteryCriteria')}/>
											</div>
											<div className="col-sm-4">
												{targetForms}
											</div>
										<div className="col-sm-1">
											<button onClick={this.addTarget} type="button"className="add-target-btn pull-right"><i className="fa fa-plus-circle"></i></button>
										</div>
											</div>
										</Modal.Body>

								<Modal.Footer>
								<Button type="submit" className="secondary-btn program-add-btn">Save Program</Button>

          			<Button onClick={this.props.close}>Close</Button>

        			</Modal.Footer>
        			</form>


				</Modal>

		);
	} else {
			return (
				<p> </p>
				);
	}
}

});

module.exports = ProgramEditForm;


