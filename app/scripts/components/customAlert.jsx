
//3rd party
var $ = require('jQuery');
var React = require("react");
var Parse = require('parse');



//bootstrap-react components
var Modal = require('react-bootstrap').Modal;
var Header = require('react-bootstrap').Header;
var Title = require('react-bootstrap').Title;
var Body = require('react-bootstrap').Body;
var Footer = require('react-bootstrap').Footer;
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var Dialog = require('react-bootstrap').Dialog;



// Parse class models
var models = require('../models/models.js');


var CustomAlert = React.createClass({
	render: function() {
		return (
	<Modal show={this.props.modal} open={this.props.open}>

      <Modal.Header>
        <Modal.Title><img src="./images/app-icon-main.svg" /> Session saved!</Modal.Title>
      	</Modal.Header>

      <Modal.Body>
        Your session has been saved.
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={this.props.close}>Close</Button>

      </Modal.Footer>


  </Modal>
		);
	}

});

module.exports = CustomAlert;
