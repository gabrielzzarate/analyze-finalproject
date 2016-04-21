
/* linegraph.jsx */

//3rd party
var $ = require('jQuery');
var React = require('react');
var Parse = require('parse');
var ParseReact = require('parse-react');
var Chart = require('chart.js');

var LineChart = require("react-chartjs").Line;
console.log("LineChart", LineChart);


var moment = require('moment');
var _ = require('underscore');

// parse server init
Parse.initialize("analyzetracking");
Parse.serverURL = 'http://analyzetracking.herokuapp.com/';

// Parse class models
var models = require('../models/models.js');

// react-bootstrap components
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;

//global variables


var LineGraph = React.createClass({
    getInitialState: function() {
        return {
            graphs: [],
            count: [],
            programObj: null
        };
    },

    componentDidMount: function() {
        this.getSessions();
    },
    getPrograms: function(sessions){
        var self = this;
        var clientObj = this.props.clientObj;
        var queryPrograms = new Parse.Query(models.Program);
        queryPrograms.ascending("createdAt");
        queryPrograms.equalTo('client', clientObj);
        queryPrograms.include('targets');
        queryPrograms.find({
            success: function(programs){
                //console.log("programs", programs);
                self.setState({"programObj": programs});
                self.buildGraphs(sessions, programs);
            },
            error: function(){

            }
        });

    },
    getSessions: function(){
        var self = this;
        var clientObj = this.props.clientObj;
        var querySessions = new Parse.Query(models.Session);
        querySessions.equalTo('client', clientObj);
        querySessions.ascending("createdAt");
        querySessions.find({
            success: function(sessions){
                //console.log('sessions', sessions);
                self.getPrograms(sessions);
            },
            error: function(results, error){

            }
        });

    },
    buildGraphs: function(sessions, programs){
        var self = this;
        var targets;



       _.each(programs, function(program){
            targets = program.get('targets');
            var targetsT = program.get('targets');
             var targetNameArray = targetsT.map(function(target){
               return target.get('name');
            });
            var targetsArray = targets.map(function(target){
                return target.id;
            });
                //var countArray = [];
                var sessionDateArray = [];
                var overallMasteredTargetCount = 0;

            var sessionData = sessions.map(function(session){
                var targetsMastered = session.get('targetsMastered');
                var dates = session.get('createdAt');
                var sessionDates = moment(dates).format("MMM Do");
                 sessionDateArray.push(sessionDates);


                var count = _.intersection(targetsArray, targetsMastered).length;
                if(count > overallMasteredTargetCount){
                    overallMasteredTargetCount = count;
                }
                return overallMasteredTargetCount;

            });


  var chartOptions = {
    // Boolean - Whether to animate the chart
    animation: true,

    // Number - Number of animation steps
    animationSteps: 60,

    // String - Animation easing effect
    // Possible effects are:
    // [easeInOutQuart, linear, easeOutBounce, easeInBack, easeInOutQuad,
    //  easeOutQuart, easeOutQuad, easeInOutBounce, easeOutSine, easeInOutCubic,
    //  easeInExpo, easeInOutBack, easeInCirc, easeInOutElastic, easeOutBack,
    //  easeInQuad, easeInOutExpo, easeInQuart, easeOutQuint, easeInOutCirc,
    //  easeInSine, easeOutExpo, easeOutCirc, easeOutCubic, easeInQuint,
    //  easeInElastic, easeInOutSine, easeInOutQuint, easeInBounce,
    //  easeOutElastic, easeInCubic]
    animationEasing: "easeOutQuart",

    // Boolean - If we should show the scale at all
    showScale: true,

    // Boolean - If we want to override with a hard coded scale
    scaleOverride: true,

    // ** Required if scaleOverride is true **
    // Number - The number of steps in a hard coded scale
    scaleSteps: overallMasteredTargetCount + 1,
    // Number - The value jump in the hard coded scale
    scaleStepWidth: 1,
    // Number - The scale starting value
    scaleStartValue: 0,

    // String - Colour of the scale line
    scaleLineColor: "rgba(0,0,0,.1)",

    // Number - Pixel width of the scale line
    scaleLineWidth: 1,

    // Boolean - Whether to show labels on the scale
    scaleShowLabels: true,

    // Interpolated JS string - can access value
    scaleLabel: "<%=value%>",

    // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
    scaleIntegersOnly: true,

    // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero: false,

    // String - Scale label font declaration for the scale label
    scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Scale label font size in pixels
    scaleFontSize: 10,

    // String - Scale label font weight style
    scaleFontStyle: "normal",

    // String - Scale label font colour
    scaleFontColor: "rgba(11, 28, 84, 0.88)",

    // Boolean - whether or not the chart should be responsive and resize when the browser does.
    responsive: true,
    // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
    maintainAspectRatio: true,

    // Boolean - Determines whether to draw tooltips on the canvas or not
    showTooltips: true,



    // Array - Array of string names to attach tooltip events
    tooltipEvents: ["mousemove", "touchstart", "touchmove"],

    // String - Tooltip background colour
    tooltipFillColor: "rgba(11, 28, 84, 0.88)",

    // String - Tooltip label font declaration for the scale label
    tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Tooltip label font size in pixels
    tooltipFontSize: 14,

    // String - Tooltip font weight style
    tooltipFontStyle: "normal",

    // String - Tooltip label font colour
    tooltipFontColor: "#57cbbb",

    // String - Tooltip title font declaration for the scale label
    tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Tooltip title font size in pixels
    tooltipTitleFontSize: 14,

    // String - Tooltip title font weight style
    tooltipTitleFontStyle: "bold",

    // String - Tooltip title font colour
    tooltipTitleFontColor: "#fff",

    // Number - pixel width of padding around tooltip text
    tooltipYPadding: 6,

    // Number - pixel width of padding around tooltip text
    tooltipXPadding: 6,

    // Number - Size of the caret on the tooltip
    tooltipCaretSize: 8,

    // Number - Pixel radius of the tooltip border
    tooltipCornerRadius: 6,

    // Number - Pixel offset from point x to tooltip edge
    tooltipXOffset: 10,



    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

};


            var graphs = self.state.graphs;

            var graphConfig = {
                    programs: programs,
                    id: targets,
                    options: chartOptions,
                    labels: sessionDateArray,
                    datasets: [{
                        label: targetNameArray,
                        fillColor: "rgba(11, 28, 84, 0.5)",
                        strokeColor: "rgba(11, 28, 84, 0.88)",
                        pointColor: "#57cbbb",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(151,187,205,1)",
                        data: sessionData
                    }]

            };
            graphs.push(graphConfig);
            self.setState({graphs: graphs});
        });
    },

    render: function() {
        var self = this;
        if(this.props.render === true){

            //  var programNames = this.state.programObj.map(function(program){
            //     return program.get('name');

            // });

            console.log(this.state.graphs);
            // console.log("programObj");
            // console.log(this.state.programObj);
        var graphs = this.state.graphs.map(function(data, index){
            return (
                <div  key={data.id}>
                    {self.state.programObj[index].get('name')}
                    <div className="targets-label-container "><p className="targets-label"> targets mastered </p></div>
                    <LineChart className="behavior-line-chart" data={data} options={data.options} legend={data.legendTemplate} width="600" height="250"/>
                    <p className="date-label"> session date </p>
                </div>
                );
        });
        return (
            <div>
                {graphs}
            </div>
        );

} else {
    return (
        <div />
        );
}
}

});


module.exports = LineGraph;


