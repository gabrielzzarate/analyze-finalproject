
/* dashboardEvents.jsx */

//3rd party
var React = require('react');
var _ = require('underscore');


var DashboardEvents = React.createClass({

	render: function() {
		if(this.props.userInfo) {
		var clients = this.props.allClientObj;
		console.log(clients);

		var sessionsPerWeek = _.map(this.props.allClientObj, function(client){
			return client.get('numberOfSessions');
		});


		var totalSessions = _.reduce(sessionsPerWeek, function(memo, num){ return memo + num; }, 0);

		var userInfo = this.props.userInfo;
		console.log("userInfo", userInfo);

		var sessions = userInfo.map(function(user){
				return user.get('sessionTotal');
		});
		console.log(sessions);

		var sessionsCompleted = userInfo.map(function(user){
				return user.get('SessionCompleted');
		});

		console.log(sessionsCompleted);





		return (
			<div>
				<div className="col-md-3 col-sm-6 col-xs-12 event-section sessions-this-week">
						<p className="event-number">{sessions}</p>
						<p className="event-title">Sessions</p>
						<p className="event-subtitle">This Week</p>
				</div>
				<div className="col-md-3 col-sm-6 col-xs-12 event-section sessions-completed">
						<p className="event-number">{sessionsCompleted}</p>
						<p className="event-title">Sessions</p>
						<p className="event-subtitle">Completed</p>
				</div>
				<div className="col-md-3 col-sm-6 col-xs-12 event-section reminder">

						<p className="event-title align">Reminder</p>
						<p className="client-name align">Quarterly Training 4/25 </p>
				</div>
				<div className="col-md-3 col-sm-6 col-xs-12 event-section next-appointment">
					<p className="event-title align">Next Appointment</p>
						<p className="client-name align">Billy Allen</p>

				</div>

			</div>
		);
	} else {
		return (
			<div />
			);
	}
	}

});

module.exports = {
	"DashboardEvents" : DashboardEvents
};
