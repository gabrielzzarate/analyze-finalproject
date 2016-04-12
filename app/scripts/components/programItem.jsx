var React = require("react");
var Parse = require('parse');
var ParseReact = require('parse-react');

var ListGroupItem = require("react-bootstrap").ListGroupItem;

var ProgramItem = React.createClass({

	render: function() {
		var program = this.props.program;
		//console.log('program', program);
		return (
			<div >
						<ListGroupItem className="program-item">{program.name}<a onClick={this.addNo} className="no-icon"><i className=" fa fa-times"></i></a><a onClick={this.addYes} className="yes-icon"><i className="fa fa-check"></i></a></ListGroupItem>
					</div>
		);
	}

});

module.exports = ProgramItem;
