
/* linegraph.jsx */

//3rd party
var $ = require('jQuery');
var React = require('react');
var Parse = require('parse');
var ParseReact = require('parse-react');
var Chart = require('chart.js');
//var LineChart = require("react-chartjs").Line;
var LineChart = require("rc-chartjs").Line;
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


// module: {
//   loaders: [
//     {test: require.resolve('chart.js'), loader: 'imports?this=>window'},
//   ]
// }


var LineGraph = React.createClass({
    getInitialState: function() {
        return {
            graphs: [],
            count: []
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

                self.getPrograms(sessions);
            },
            error: function(results, error){

            }
        });

    },
    buildGraphs: function(sessions, programs){
        var self = this;
        var targets;
        var sessionDates;
        var sessionDateArray = [];
        var targetName = [];
        var countArray = [];


        programs.map( function(program){
            //console.log("program", program);
            var targetIds;
            targets = program.get('targets');

            var targetNameArray = targets.map(function(target){
               return target.get('name');
            });
            console.log(targetName);

            var targetsArray = targets.map(function(target){
                return target.id;



            });
           // console.log('targetsArray', targetsArray);
            //console.log('targets', targets);
            var maxCount = 0;
            var sessionData = sessions.map(function(session){
                //console.log("session" ,session);
                var targetsMastered = session.get('targetsMastered');

                //var targets = session.get(targets);
               // console.log("mastered", targetsMastered);
                 var dates = session.get('createdAt');
                sessionDates = moment(dates).format("MMM Do");
                sessionDateArray.push(sessionDates);
                //console.log(sessionDateArray);
                var maxCount = 0;
                var count = _.intersection(targetsArray, targetsMastered).length;
               // console.log("count" ,count);
                 maxCount = count > maxCount ? count : maxCount;
                 countArray.push(maxCount);

               //console.log("maxCount", maxCount);

                return {
                        label: targetNameArray,
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: countArray

                };
            });



            var graphs = self.state.graphs;

            var graphConfig = {
                    programs: programs,
                    id: targets,
                    labels: sessionDateArray,
                    datasets: sessionData

            };
            graphs.push(graphConfig);
            self.setState({graphs: graphs});
        });
    },

    render: function() {
        var self = this;



        var graphs = this.state.graphs.map(function(data){
           var programName;//console.log("graphConfig", graphConfig);
          var  programNames = data.programs.map(function(program){
                programName = program.get('name');

           });
            return (
                <div key={data.id}>
                    {programName}
                    <LineChart className="behavior-line-chart" data={data}  width="500" height="250" />

                </div>
                );
        });
        return (
            <div>
                {graphs}
            </div>
        );
    }


});


module.exports = LineGraph;

// //mixins: [ParseReact.Mixin],
//     getInitialState: function() {
//         return {
//             sessionObj: null,
//             session: null,
//             programObj: null,
//             targetsMastered: null,
//             targets: null,
//             sessionDates: null,
//         };
//     },

//     componentWillMount: function() {
//         var self = this;
//         var clientObj = this.props.clientObj;
//         var session;
//         var program;
//         var targets;
//         var dateArray = [];
//         var targetsArray = [];
//         var masteredArray = [];

//       //  console.log(targetsArray, masteredArray);

//         var query = new Parse.Query(models.Session);
//         query.equalTo('client', clientObj);
//         query.find({
//             success:function(results){
//                 self.setState({'sessionObj': results});
//                 console.log('session graph', self.state.sessionObj);
//                 var sessionObj = self.state.sessionObj;
//                 session = self.state.sessionObj.map(function(session){
//                     var targetsMastered = session.get('targetsMastered');
//                     masteredArray.push(targetsMastered);
//                     //self.setState({'targetsMastered': targetsMastered});
//                     //console.log(targetsMastered);

//                     var dates = session.get('createdAt');
//                     var formatDate = moment(dates).format("MMM Do");
//                    // console.log(formatDate);

//                     dateArray.push(formatDate);
//                     //self.setState({sessionDates: dateArray});

//                 });
//                     dateArray.reverse();
//                     self.setState({"sessionDates": dateArray});
//                     self.setState({"targetsMastered": masteredArray});

//             },
//             error: function(results, error){

//             },

//         });
//     var queryPrograms = new Parse.Query(models.Program);
//     queryPrograms.equalTo('client', clientObj);
//     queryPrograms.include('targets');
//     queryPrograms.find({
//         success:function(programs){
//             self.setState({'programObj' : programs});
//             targets = programs.map(function(program){
//                 var target = program.get('targets');
//                 //targetsArray.push(target);
//                 self.setState({"targets": target});
//             });
//             //self.setState({"targets": targetsArray});

//         },
//         error: function(){

//         },


//     });

//     },

//     render: function() {

//         if(this.state.programObj){
//              var self = this;
//             console.log('targets state', this.state.targets);
//             console.log('mastered state', this.state.targetsMastered);

//             var filteredTargets = _.pick(this.state.targets, 'id');
//             console.log("filtered", filteredTargets);

//             var targetsGraphed = _.intersection(this.state.targets, this.state.targetsMastered);
//             console.log("targetsGraphed", targetsGraphed);



//             var sessionDates = this.state.sessionDates;

//             var programs = this.state.programObj.map(function(program){
//                 var targetsArray = program.get('targets');

//                 var targets = targetsArray.map(function(target){
//                     return {
//                         label: target.get('name'),
//                         fillColor: "rgba(220,220,220,0.2)",
//                         strokeColor: "rgba(220,220,220,1)",
//                         pointColor: "rgba(220,220,220,1)",
//                         pointStrokeColor: "#fff",
//                         pointHighlightFill: "#fff",
//                         pointHighlightStroke: "rgba(220,220,220,1)",
//                         data: [65, 59, 80, 81, 56, 55, 40]

//                     };

//                 });


//             var data = {
//                 labels: self.state.sessionDates,
//                 datasets: targets,


//             };
//             return (
//                 <div key= {program.id}>
//                     <p>{program.get('name')} </p>
//                    <LineChart className="behavior-line-chart" data={data}  width="500" height="250" redraw/>

//                 </div>
//                 );


//             });
//             return (
//                 <div>
//                     {programs}
//                 </div>
//             );
//     } else {
//         return (
//             <div>Loading .. </div>
//             );
//     }
// }
// });

