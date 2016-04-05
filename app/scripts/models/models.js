var $ = require('jQuery');
var React = require("react");
var Parse = require('parse');


var Note = Parse.Object.extend("Notes");

var Client = Parse.Object.extend("Clients");

var Program = Parse.Object.extend('Programs');



module.exports = {
	"Note": Note,
	"Client": Client,
	"Program": Program

};
