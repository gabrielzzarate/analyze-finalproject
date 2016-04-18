
/* dashboardCaseload.jsx */

//3rd party
var React = require('react');
var Parse = require('parse');
var ParseReact = require('parse-react');

// parse server init
Parse.initialize("analyzetracking");
Parse.serverURL = 'http://analyzetracking.herokuapp.com/';

// Parse class models
var models = require('../models/models.js');


var DashboardCaseload = React.createClass({

	getInitialState: function() {
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
	render: function() {
		if(this.state.clients){
		//	console.log(this.state.clients);

		var caseLoadItems = this.state.clients.map(function(client) {

				return (
					<div key={client.id} className="col-sm-2">
									<a href={"#profile/" + client.id}>
									<img src= "./images/user-icon-1.svg" />

									<p className="client-name caseload-name">{client.get('Name')}</p>
								</a>
					</div>
					);
			});
			return (
				<div>
						<p className="caseload-heading">My Caseload</p>
						<div className="caseload-listing">

						{caseLoadItems}
					</div>
				</div>
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
		// return (
		// 	<div>
		// 		<p className="caseload-heading">My Caseload</p>
		// 		<div className="caseload-listing">
		// 			<div className="col-sm-2">
		// 				<a href="#profile/">
		// 					<img src="./images/user-icon-1.svg" />
		// 					<p className="client-name caseload-name">{client.get("Name")}</p>
		// 				</a>
		// 			</div>
				// 	<div className="col-sm-2">
				// 		<a href="#profile/">
				// 			<img src="./images/user-icon-2.svg" />
				// 			<p className="client-name caseload-name">Sandy Beech</p>
				// 		</a>
				// 	</div>
				// 	<div className="col-sm-2">
				// 		<a href="#profile/">
				// 			<img src="./images/user-icon-3.svg" />
				// 			<p className="client-name caseload-name">Aiden Rivers</p>
				// 		</a>
				// 	</div>
				// 	<div className="col-sm-2">
				// 		<a href="#profile/">
				// 			<img src="./images/user-icon-4.png" />
				// 			<p className="client-name caseload-name">Lane Benson</p>
				// 		</a>
				// 	</div>
				// 	<div className="col-sm-2">
				// 		<a href="#profile/">
				// 			<img src="./images/user-icon-5.svg" />
				// 			<p className="client-name caseload-name">Amy Thompson</p>
				// 		</a>
				// 	</div>
				// 	<div className="col-sm-2">
				// 		<a href="#profile/">
				// 			<img src="./images/user-icon-1.svg" />
				// 			<p className="client-name caseload-name">Joe Schmoe</p>
				// 		</a>
				// 	</div>
				// </div>


// 		);
// 	}
// }


// });


module.exports = {
	"DashboardCaseload" : DashboardCaseload
};
