
/* clientNotes.jsx */

//3rd party
var $ = require('jQuery');
var React = require("react");
var moment = require('moment');
require('backbone-react-component');
var Parse = require('parse');
var ParseReact = require('parse-react');

//parse server init
Parse.initialize("analyzetracking");
Parse.serverURL = 'http://analyzetracking.herokuapp.com/';

// bootstrap-react components
var Input = require('react-bootstrap').Input;
var models = require('../models/models.js');


var ClientNotes = React.createClass({

	getInitialState: function() {
	    return {
	        note: null,
	        notes: null
	    };
	},

	componentWillMount: function() {
		this.getNotes();
	},
	getNotes: function(){
		var self = this;
		var Notes = Parse.Object.extend("Notes");
		var query = new Parse.Query( Notes );
		query.descending('createdAt');
		query.equalTo('client', this.props.clientObj);
		query.find().then(function(notes){
			self.setState({"notes": notes});
		}, function(error){
			console.log(error);
		});
	},

	handleSubmit: function(event){
		event.preventDefault();
		var self = this;
		var noteValue = $('#noteText').val();
		console.log(this.props.clientObj);
		var note = new models.Note();
		note.set("text", noteValue);
		note.set("postedBy", Parse.User.current());
		note.set("client", new models.Client(this.props.clientObj));
		note.save(null, {
  		success: function(note) {
   			 // Execute any logic that should take place after the object is saved.
  		  //alert('New object created with objectId: ' + note.id);
  		  self.getNotes();
  		  $('#noteText').val('');
  			},
  		error: function(note, error) {
   				 // Execute any logic that should take place if the save fails.
    			// error is a Parse.Error with an error code and message.
  			  alert('Failed to create new object, with error code: ' + error.message);
  			}
		});

	},

	render: function() {


		if(this.state.notes){
			var notes = this.state.notes.map(function(note){
				var created = note.get('createdAt');
				//console.log("notes", this.state.notes);
				return (
						<div  key={note.id}>

							<div className="note-author">{note.get('postedBy').get('username')} </div>
							{/* use moment.js to set format date of the note */}
							<div className="note-time">{moment(created).fromNow()} wrote: </div>
							<p className="note-text">{note.get('text')}</p>
						</div>
					);
			}.bind(this));

				return (
					<div className='client-notes-container'>
						<div className="col-sm-6">
							<form onSubmit={this.handleSubmit}>
								<Input type="textarea" id="noteText" label="Client Notes" placeholder="write a note..." />
								<button type='submit' className="logIn-button note-button">Add Note</button>
							</form>
						</div>
						<div className="col-sm-6 note-container">
						{notes}
						</div>
					</div>
					);

		} else {
				return (
					<div>
						<p></p>
					</div>);
		}
	}

});

module.exports = ClientNotes;
