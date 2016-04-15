
/* dashboardCaseload.jsx */

//3rd party
var React = require('react');
var Parse = require('parse');
var ParseReact = require('parse-react');

// parse server init
Parse.initialize("analyzetracking");
Parse.serverURL = 'http://analyzetracking.herokuapp.com/';


var DashboardCaseload = React.createClass({
	mixins: [ParseReact.Mixin],
	getInitialState: function() {
	    return {
	    	user: Parse.User.current(),
	    	clients: null,

	    };
	},
	observe: function(){
		return {
			clientObj: (new Parse.Query('Clients').equalTo('therapistTeam', this.state.user))
		};
	},
	//componentWillMount: function() {
		// var Clients = Parse.Object.extend('Clients');
		// var query = new Parse.Query(Clients);
		// console.log(this.state.user);
		// query.equalTo('therapistTeam', this.state.user);
		// query.find().then(function(clients){
		// 	console.log(clients);
		// 	this.setState({"clients": clients});
		// }.bind(this));

		// console.log(query);
		// console.log(this.state.clients);
	//},
	render: function() {

		var caseLoadItems = function(client) {
				return (
					<div key={client.objectId} className="col-sm-2">
									<a href={"#profile/" + client.objectId}>
									<img src="./images/user-icon-1.svg" />
									<p className="client-name caseload-name">{client.Name}</p>
								</a>
					</div>
					);
			};
			return (
				<div>
						<p className="caseload-heading">My Caseload</p>
						<div className="caseload-listing">
						{this.data.clientObj.map(caseLoadItems.bind(this))}
					</div>
				</div>
				);
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
