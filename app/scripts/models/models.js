var $ = require('jQuery');
var React = require("react");
var Parse = require('parse');


var Note = Parse.Object.extend("Notes");

var Client = Parse.Object.extend("Clients");

var Program = Parse.Object.extend('Programs');
var Target = Parse.Object.extend('Targets');



module.exports = {
	"Note": Note,
	"Client": Client,
	"Program": Program,
	"Target": Target

};
