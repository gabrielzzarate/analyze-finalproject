
/* dashboardEvents.jsx */

//3rd party
var React = require('react');
var _ = require('underscore');


var DashboardEvents = React.createClass({

	render: function() {
		var clients = this.props.allClientObj;
		console.log(clients);

		var sessionsPerWeek = _.map(this.props.allClientObj, function(client){
			return client.get('numberOfSessions');
		});
		console.log(sessionsPerWeek);

		var totalSessions = _.reduce(sessionsPerWeek, function(memo, num){ return memo + num; }, 0);

		console.log(totalSessions);

		return (
			<div>
				<div className="col-md-3 col-sm-6 col-xs-12 event-section sessions-this-week">
						<p className="event-number">{totalSessions}</p>
						<p className="event-title">Sessions</p>
						<p className="event-subtitle">This Week</p>
				</div>
				<div className="col-md-3 col-sm-6 col-xs-12 event-section sessions-completed">
						<p className="event-number">5</p>
						<p className="event-title">Sessions</p>
						<p className="event-subtitle">Completed</p>
				</div>
				<div className="col-md-3 col-sm-6 col-xs-12 event-section best-results">

						<p className="event-title align">Best Results</p>
						<p className="client-name align">Sandy Beech</p>
				</div>
				<div className="col-md-3 col-sm-6 col-xs-12 event-section next-appointment">
					<p className="event-title align">Next Appointment</p>
						<p className="client-name align">Billy Allen</p>

				</div>

			</div>
		);
	}

});

module.exports = {
	"DashboardEvents" : DashboardEvents
};
