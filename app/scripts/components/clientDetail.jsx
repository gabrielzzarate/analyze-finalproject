
/* clientDetail.jsx */

//3rd party
var React = require("react");
var Parse = require('parse');
var ParseReact = require('parse-react');

// parse-server init
Parse.initialize("analyzetracking");
Parse.serverURL = 'http://analyzetracking.herokuapp.com/';

//require in child components
var ClientSession = require('./clientSession.jsx');
var ClientNotes = require('./clientNotes.jsx');
var ClientPrograms = require('./clientPrograms.jsx');
var ClientGraphs = require('./clientGraphs.jsx');
var SessionStart = require('./sessionStart.jsx');


//bootstrap-react components
var Tab = require("react-bootstrap").Tab;
var Tabs = require("react-bootstrap").Tabs;


var ClientDetail = React.createClass({
	mixins: [ParseReact.Mixin],

	getInitialState: function() {
	    return {
	    	clientObj: null,
	    };
	},
	observe: function(){
		//console.log('observe: ', this.props.id);
		return {
			clientObj: (new Parse.Query('Clients').observeOne(this.props.id))
		};
	},

	render: function() {
		var client = this.data.clientObj;

		if(this.data.clientObj){
			var user = Parse.User.current().get('username');
				return (
					<div key={client.objectId}>
					<div className = "col-xs-10 col-xs-offset-1  client-profile-container">
					<div className='row'>
						<div className= "col-xs-11 client-info-container">
							<div className="col-xs-6 client-info">
								<div className="col-xs-3 client-image-container">
									<img className="client-image" src={client.profileImage.url()} />
								</div>

								<div className="client-header col-sm-8 col-xs-6">
										<div className="col-sm-12">
										<h4 className='client-name-detail-page'>{client.Name}</h4>
										</div>
										<div className="col-sm-12 col-xs-8">
										<p><i className="fa fa-phone client-phone"></i> {client.telephone}</p>
										</div>
										<div className="col-sm-12 col-xs-12">
										<p><i className="fa fa-map-marker client-address"></i> {client.address}</p>
										</div>
										<div className="col-sm-12 col-xs-12">
										<p><i className="fa fa-calendar"></i> {client.schedule}</p>
										</div>

								</div>
							</div>


						<div className="col-sm-4 col-sm-offset-1 col-xs-3 team-info">
								<h6>Therapist Team <i className="fa fa-user"></i> </h6>

								<ul className ="therapist-team-list">
									<li> Lead: {user}</li>
									<li>Line: Suzie Martin</li>
								</ul>

						</div>
						</div>
						</div>
						<div className= "row">
						<div className= "col-sm-12 client-data-container">
							<Tabs defaultActiveKey={1}>
									<Tab eventKey={1} title="Today"><SessionStart clientId={this.props.id} clientObj={this.data.clientObj}/> </Tab>
									<Tab eventKey={2} title="Notes"> <ClientNotes clientId={this.props.id} clientObj={this.data.clientObj}/></Tab>

							    <Tab eventKey={3} title="Behaviors"><ClientPrograms clientId={this.props.id} clientObj={this.data.clientObj}/></Tab>
							    <Tab eventKey={4} title="Progress"><ClientGraphs clientId={this.props.id} clientObj={this.data.clientObj}/></Tab>
		  				</Tabs>


						</div>
						</div>
				</div>

				</div>

		);

	 } else {
	 		return	(
	 			<div>
	 				<p>Loading...</p>
	 			</div>);
	 }
	}
});


module.exports = {
	"ClientDetail": ClientDetail
};
