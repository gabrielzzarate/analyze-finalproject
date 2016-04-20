


//3rd party
var React = require('react');
var Parse = require('parse');
var Backbone = require('backbone');


// parse server init
Parse.initialize("analyzetracking");
Parse.serverURL = 'http://analyzetracking.herokuapp.com/';

// Parse class models
var models = require('../models/models.js');


var SidebarCaseload = React.createClass({
	getInitialState:function() {
		return {
		    	user: Parse.User.current(),
		    	clients: null,

		    };
		},
	componentWillMount: function() {
		var query = new Parse.Query(models.Client);
		query.equalTo('therapistTeam', this.state.user);
		query.find().then(function(clients){
		//	console.log(clients);
			this.setState({"clients": clients});
		}.bind(this));


	},
	handleClick: function(client){
			console.log("changing route...");
		 Backbone.history.navigate("profile/" + client.id, {trigger: true});
	},
	render: function() {
		if(this.state.clients){
		//	console.log(this.state.clients);

		var caseLoadItems = this.state.clients.map(function(client) {

				return (
					<li key={client.id} >
									<a onClick={this.handleClick.bind(this, client)} >
									<p className="client-name caseload-name">{client.get('Name')}</p>
								</a>
					</li>
					);
			}.bind(this));
			return (
				<ul>
						{caseLoadItems}

				</ul>
				);

	} else {
			return (
				<div>
					<p>Loading ... </p>
			</div>
				);

	}
}

});


module.exports = SidebarCaseload;
