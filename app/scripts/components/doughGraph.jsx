
/* linegraph.jsx */

//3rd party
var $ = require('jQuery');
var React = require('react');
var Parse = require('parse');
var ParseReact = require('parse-react');
var Chart = require('chart.js');

var DoughnutChart = require("react-chartjs").Doughnut;
//console.log("DoughnutChart", DoughnutChart);

var LineChart = require("react-chartjs").Line;


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



var DoughGraph = React.createClass({
    getInitialState: function() {
        return {
            graphs: [],
            programObj: null,

        };
    },

    componentWillMount: function() {
        this.getPrograms();
    },
    getOutcomes: function(programs){
        var self = this;
        var clientObj = this.props.clientObj;
        var queryOutcomes = new Parse.Query(models.SessionOutcome);
        queryOutcomes.ascending("createdAt");
        queryOutcomes.equalTo('client', clientObj);
        queryOutcomes.equalTo('outcome', true);

        queryOutcomes.find({
            success: function(outcomesTrue){
                //console.log("outcomesTrue", outcomesTrue);
               // self.setState({'outcomeTrue': outcomesTrue});
                //self.buildGraphs(sessions, outcomesTrue);

                var queryFalseOutcomes = new Parse.Query(models.SessionOutcome);
                queryFalseOutcomes.ascending("createdAt");
                queryFalseOutcomes.equalTo('client', clientObj);
                 queryFalseOutcomes.equalTo('outcome', false);

                queryFalseOutcomes.find({
                        success: function(outcomesFalse){
                         // self.setState({'outcomeFalse': outcomesFalse});
                          self.buildGraphs(programs, outcomesTrue, outcomesFalse);
                },
                 error: function(){

                  }
              });

                  },
                   error: function(){

                }
        });

    },
    getPrograms: function(){
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
                self.getOutcomes(programs);
            },
            error: function(){

            }
        });
    },
    buildGraphs: function(programs, outcomesTrue, outcomesFalse){
        var self = this;
        var targets;
        var chartOptions;
        var outcomeDataTrue;
        var outcomeDataFalse;

            _.map(programs, function(program){
                 targets = program.get('targets');

                var targetNameArray = targets.map(function(target){
               return target.get('name');
             });
                var targetsArray = targets.map(function(target){
                return target.id;
            });
               console.log(targetsArray);
              var associatedTrueArray = [];
              var associatedFalseArray = [];
             outcomeDataTrue = outcomesTrue.map(function(outcome){

                    var targetAssociated = outcome.get('target').id;
                    console.log("associated", targetAssociated);
                    console.log("array", targetsArray);
                    associatedTrueArray.push(targetAssociated);

                    var trueCount = _.intersection(targetsArray, associatedTrueArray).length;
                    console.log(trueCount);
                    return trueCount.length;


            });
             outcomeDataFalse = outcomesFalse.map(function(outcome){
                var targetAssociated = outcome.get('target').id;
                associatedFalseArray.push(targetAssociated);

                 var falseCount = _.intersection(targets, associatedFalseArray).length;

                return falseCount.length;
            });
            console.log("outcomeDataFalse" , outcomeDataFalse.length);
            console.log("outcomeDataTrue", outcomeDataTrue.length);

            chartOptions =     {
    //Boolean - Whether we should show a stroke on each segment
    segmentShowStroke : true,
    // Boolean - whether or not the chart should be responsive and resize when the browser does.
    responsive: true,
    //String - The colour of each segment stroke
    segmentStrokeColor : "#fff",
    //Number - The width of each segment stroke
    segmentStrokeWidth : 2,
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
    //Number - The percentage of the chart that we cut out of the middle
    percentageInnerCutout : 50, // This is 0 for Pie charts
    //Number - Amount of animation steps
    animationSteps : 100,
    //String - Animation easing effect
    animationEasing : "easeOutBounce",
    //Boolean - Whether we animate the rotation of the Doughnut
    animateRotate : true,
    //Boolean - Whether we animate scaling the Doughnut from the centre
    animateScale : false,
    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

};


            //  var graphs = self.state.graphs;
            //   var graphConfig = {
            //         programs: programs,
            //         id: targets,
            //         options: chartOptions,
            //         data: [{
            //                     value: outcomeDataTrue.length,
            //                     color:"#46BFBD",
            //                     highlight: "#FF5A5E",
            //                     label: "True"
            //                 },
            //                 {
            //                     value: outcomeDataFalse.length,
            //                     color: "#F7464A",
            //                     highlight: "#5AD3D1",
            //                     label: "False"
            //                 }]
            // };
            // graphs.push(graphConfig);
            // self.setState({graphs: graphs});

            });

             var graphs = self.state.graphs;
              var graphConfig = {
                    programs: programs,
                    id: targets,
                    options: chartOptions,
                    data: [{
                                value: outcomeDataTrue.length,
                                color:"#46BFBD",
                                highlight: "#FF5A5E",
                                label: "True"
                            },
                            {
                                value: outcomeDataFalse.length,
                                color: "#F7464A",
                                highlight: "#5AD3D1",
                                label: "False"
                            }]
            };
            graphs.push(graphConfig);
            self.setState({graphs: graphs});

    },

    render: function() {
        if(this.props.render === true){
            var self = this;
            console.log("graphs:", this.state.graphs);
        var graphs = this.state.graphs.map(function(data, index){


            return (
                <div  className="graph-container" key={data.id}>
                {/*<p>{self.state.programObj[index].get('name')}</p> */}
                <p> All Outcomes </p>
                 <DoughnutChart  data={data.data} options={data.options}   redraw width="600" height="250" />
                 <ul className="dough-legend">
                    <li><div id="squareGreen"></div> <i className="fa fa-thumbs-o-up" aria-hidden="true"></i></li>
                    <li><div id="squareRed"></div> <i className="fa fa-thumbs-o-down" aria-hidden="true"></i></li>
                 </ul>


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


module.exports = DoughGraph;
