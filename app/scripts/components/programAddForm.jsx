var $ = require('jQuery');
var React = require("react");
var Parse = require('parse');
var ParseReact = require('parse-react');

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
							<form onSubmit={this.props.handleSubmit}>
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
