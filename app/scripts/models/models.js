var $ = require('jQuery');
var React = require("react");
var Parse = require('parse');


var Note = Parse.Object.extend("Notes");

var Client = Parse.Object.extend("Clients");

var Program = Parse.Object.extend('Programs');
var Target = Parse.Object.extend('Targets');

var Session = Parse.Object.extend('ClientSessions');
var SessionOutcome = Parse.Object.extend('SessionOutcomes');

var ScheduleRecord = Parse.Object.extend('Schedule');

module.exports = {
	"Note": Note,
	"Client": Client,
	"Program": Program,
	"Target": Target,
	"Session": Session,
	"SessionOutcome": SessionOutcome,
	"ScheduleRecord": ScheduleRecord


};
