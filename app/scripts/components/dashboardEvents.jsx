var React = require('react');


var DashboardEvents = React.createClass({
	render: function() {
		return (
			<div>
				<div className="col-sm-3 event-section sessions-this-week">
						<p className="event-number">15</p>
						<p className="event-title">Sessions</p>
						<p className="event-subtitle">This Week</p>
				</div>
				<div className="col-sm-3 event-section sessions-completed">
						<p className="event-number">5</p>
						<p className="event-title">Sessions</p>
						<p className="event-subtitle">Completed</p>
				</div>
				<div className="col-sm-3 event-section best-results">

						<p className="event-title align">Best Results</p>
						<p className="client-name align">Sandy Beech</p>
				</div>
				<div className="col-sm-3 event-section next-appointment">
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
