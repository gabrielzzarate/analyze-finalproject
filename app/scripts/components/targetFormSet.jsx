var $ = require('jQuery');
var React = require("react");
var Parse = require('parse');
var ParseReact = require('parse-react');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');

var Input = require("react-bootstrap").Input;

var TargetFormSet = React.createClass({

	getInitialState: function() {
	    return {
	    	targets: this.props.targets
	    };
	},
	render: function() {
		return (
			<div>
				<input ref={"name" + this.props.count}  id="target-input" className="target-input program-form" type="text" placeholder=" Enter a target"/>
			</div>
		);
	}

});
module.exports = TargetFormSet;

