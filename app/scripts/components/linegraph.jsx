var React = require('react');
var Parse = require('parse');
var ParseReact = require('parse-react');
var Chart = require('chart.js');
//var LineChart = require("react-chartjs").Line;
var LineChart = require("rc-chartjs").Line;
Chart.defaults.global.responsive = true;


var moment = require('moment');
var _ = require('underscore');
var $ = require('jQuery');

Parse.initialize("analyzetracking");
Parse.serverURL = 'http://analyzetracking.herokuapp.com/';

// Parse class models
var models = require('../models/models.js');


var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;

var data;

// module: {
//   loaders: [
//     {test: require.resolve('chart.js'), loader: 'imports?this=>window'},
//   ]
// }

var LineGraph = React.createClass({
    //mixins: [ParseReact.Mixin],
    getInitialState: function() {
        return {
            sessionObj: null,
            session: null,
            programObj: null,
            targetsMastered: null,
            sessionDates: null,
        };
    },
    componentWillMount: function() {
        var self = this;
        var clientObj = this.props.clientObj;
        var session;
        var program;
        // var ctx = $("#myChart").get(0).getContext("2d");
        // var myNewChart = new Chart(ctx).Line(data, options);


        var query = new Parse.Query(models.Session);
        query.equalTo('client', clientObj);
        query.find({
            success:function(results){
                self.setState({'sessionObj': results});
                console.log('session graph', self.state.sessionObj);
                var sessionObj = self.state.sessionObj;
                session = self.state.sessionObj.map(function(session){
                    var targetsMastered = session.get('targetsMastered').length;
                    self.setState({'targetsMastered': targetsMastered});
                    console.log(targetsMastered);

                    var dates = session.get('createdAt');
                    var formatDate = moment(dates).format("MMM Do");
                    self.setState({sessionDates: formatDate});



                });

                //console.log(sessionDates);

            },
            error: function(results, error){

            },

        });
    var queryPrograms = new Parse.Query(models.Program);
    queryPrograms.equalTo('client', clientObj);
    queryPrograms.include('targets');
    queryPrograms.find({
        success:function(programs){
            self.setState({'programObj' : programs});
           // console.log("programObj", self.state.programObj);
            // program = self.state.programObj.map(function(prog){
            //     var names = prog.get('name');
            //     console.log(names);
            // });
          // console.log(program);
        },
        error: function(){

        },

    });
    },

	render: function() {
        //var dates = [].toString();
        if(this.state.programObj){
            var sessionDates = this.state.sessionDates;
            var self = this;
            var programs = this.state.programObj.map(function(program){
                var targetsArray = program.get('targets');

                var targets = targetsArray.map(function(target){
                    return {
                        label: target.get('name'),
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: [65, 59, 80, 81, 56, 55, 40]

                    };

                });
                //console.log(targets);
            var data = {
                labels: [self.state.sessionDates],
                datasets: targets,


            };

                // window.onload = function() {
                //     var ctx = $("#myChart").get(0).getContext("2d");
                //     var myNewChart = new Chart(ctx).Line(data, options);
                //     return myNewChart;
                // };





            return (
                <div key= {program.id}>
                    <p>{program.get('name')} </p>
                   <LineChart className="behavior-line-chart" data={data} options={chartOptions} width="500" height="250" redraw/>



                </div>
                );


            });


    		return (
    			<div>
                    {programs}
    			</div>
    		);

    } else {
        return (
            <div>Loading .. </div>
            );
    }
}

});




module.exports = LineGraph;


var chartOptions = [
  {
      //Boolean - Show a backdrop to the scale label
      scaleShowLabelBackdrop : true,

      //String - The colour of the label backdrop
      scaleBackdropColor : "rgba(255,255,255,0.75)",

      // Boolean - Whether the scale should begin at zero
      scaleBeginAtZero : true,

      //Number - The backdrop padding above & below the label in pixels
      scaleBackdropPaddingY : 2,

      //Number - The backdrop padding to the side of the label in pixels
      scaleBackdropPaddingX : 2,

      //Boolean - Show line for each value in the scale
      scaleShowLine : true,

      //Boolean - Stroke a line around each segment in the chart
      segmentShowStroke : true,

      //String - The colour of the stroke on each segement.
      segmentStrokeColor : "#fff",

      //Number - The width of the stroke value in pixels
      segmentStrokeWidth : 2,

      //Number - Amount of animation steps
      animationSteps : 100,

      //String - Animation easing effect.
      animationEasing : "easeOutBounce",

      //Boolean - Whether to animate the rotation of the chart
      animateRotate : true,

      //Boolean - Whether to animate scaling the chart from the centre
      animateScale : false,

      //String - A legend template
      legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

  }

];
