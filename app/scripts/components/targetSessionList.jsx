var $ = require('jQuery');
var React = require("react");
var Parse = require('parse');
var ParseReact = require('parse-react');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');

// react-bootstrap components
var Input = require("react-bootstrap").Input;
var Button = require('react-bootstrap').Button;

// Parse class models
var models = require('../models/models.js');

var TargetSessionList = React.createClass({
	mixins: [LinkedStateMixin],

saveYesTarget: function(target){
 	event.preventDefault();
 	var sessionObj = this.props.sessionObj;
 	console.log('session props', this.props.sessionObj);
 	var outcome = new models.SessionOutcome();
 	outcome.set('outcome', true);
 	//outcome.set('session', new models.Session(this.props.sessionObj));
 	outcome.set('target', target);
 	outcome.save();
 	$('#yes-btn').attr('disabled', 'disabled');
 	$('#no-btn').attr('disabled', 'disabled');

},
saveNoTarget: function(target){
	//event.preventDefault();
	var sessionObj = this.props.sessionObj;

 	var outcome = new models.SessionOutcome();
 	outcome.set('outcome', false);
 //	outcome.set('session', new models.Session(this.props.sessionObj));
 	outcome.set('target', target);
 	outcome.save();

},

	render: function() {


		var	target = this.props.target;
					return (
						<div className="col-sm-12 target-item-container">

											<Button id="yes-btn" className="yes-btn" onClick={this.saveYesTarget.bind(this, target)}><i className="fa fa-thumbs-o-up" aria-hidden="true"></i></Button>
											<div className="col-sm-5 col-sm-offset-3">
											<span className="target-item-name">{target.get('name')}</span>
											</div>
											<Button id="no-btn" className="no-btn" onClick={this.saveNoTarget.bind(this, target)}><i className="fa fa-thumbs-o-down" aria-hidden="true"></i></Button>

						</div>
						);

		}
	});


module.exports = TargetSessionList;
