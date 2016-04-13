var React = require('react');
var Parse = require('parse');
var ParseReact = require('parse-react');
var Chart = require('chart.js');
var LineChart = require("react-chartjs").Line;
var moment = require('moment');
var _ = require('underscore');

Parse.initialize("analyzetracking");
Parse.serverURL = 'http://analyzetracking.herokuapp.com/';

// Parse class models
var models = require('../models/models.js');


var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;

var data;

var LineGraph = React.createClass({
    //mixins: [ParseReact.Mixin],
    getInitialState: function() {
        return {
            sessionObj: null,
            sessionDates: null,
        };
    },
    componentWillMount: function() {
        var self = this;
        var clientObj = this.props.clientObj;
        var sessionDates;

        var query = new Parse.Query(models.Session);
        query.equalTo('client', clientObj);
        query.find({
            success:function(results){
                self.setState({'sessionObj': results});
                console.log('session graph', self.state.sessionObj);
                var sessionObj = self.state.sessionObj;
                sessionDates = self.state.sessionObj.map(function(date){
                    var dates = date.get('createdAt');
                    var dateArray = [];
                    var formatDate = moment(dates).format("MMM Do");
                    dateArray.push(formatDate);
                    return dateArray;

                });
                self.setState({"sessionDates": sessionDates});
                console.log(sessionDates);

            },
            error: function(results, error){

            },

        });
    },

	render: function() {
        //var dates = [].toString();
        var sessionDates = this.state.sessionDates;



        data = {
        labels: [sessionDates],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };


		return (
			<div>

				<LineChart className="behavior-line-chart" data={data} width="500" height="250"/>
			</div>
		);
	}


});




module.exports = LineGraph;
