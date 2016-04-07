var React = require("react");
var Parse = require('parse');
var ParseReact = require('parse-react');

Parse.initialize("analyzetracking");
Parse.serverURL = 'http://analyzetracking.herokuapp.com/';


//require in child components
var ClientSession = require('./clientSession.jsx');
var ClientNotes = require('./clientNotes.jsx');
var ClientPrograms = require('./clientPrograms.jsx');
var ClientGraphs = require('./clientGraphs.jsx');


//bootstrap-react components
var Tab = require("react-bootstrap").Tab;
var Tabs = require("react-bootstrap").Tabs;


var ClientDetail = React.createClass({
	mixins: [ParseReact.Mixin],

	getInitialState: function() {
	    return {
	    	clientObj: null
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
				return (
					<div key={client.objectId}>
					<div className = "col-sm-10 col-sm-offset-1 client-profile-container">
						<div className= "col-sm-12 client-info-container">
							<div className="col-sm-6 client-info">
								<div className="col-sm-3 client-image-container">
									<img className="client-image" src="./images/user-icon-1.svg" />
								</div>

								<div className="client-header col-sm-6">
										<h4 className='client-name'>{client.Name}</h4>
										<p><i className="fa fa-phone client-phone"></i> {client.telephone}</p>

										<p><i className="fa fa-map-marker client-address"></i> {client.address}</p>
								</div>
							</div>


						<div className="col-sm-4 col-sm-offset-1 team-info">
						</div>
						</div>
						<div className= "col-sm-12 client-data-container">
							<Tabs defaultActiveKey={1}>
									<Tab eventKey={1} title="Today"><ClientSession clientId={this.props.id} clientObj={this.data.clientObj}/> </Tab>
									<Tab eventKey={2} title="Notes"> <ClientNotes clientId={this.props.id} clientObj={this.data.clientObj}/></Tab>

							    <Tab eventKey={3} title="Programs"><ClientPrograms clientId={this.props.id} clientObj={this.data.clientObj}/></Tab>
							    <Tab eventKey={4} title="Graphs"><ClientGraphs clientId={this.props.id} clientObj={this.data.clientObj}/></Tab>
		  				</Tabs>


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
