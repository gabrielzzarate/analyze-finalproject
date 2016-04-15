
/* clientGraphs.jsx */

//3rd party
var React = require('react');
var Chart = require('chart.js');
var LineChart = require("react-chartjs").Line;

// bootstrap-react components
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var Button = require('react-bootstrap').Button;

// require in child components
var LineGraph = require('./linegraph.jsx');
var HighChartExample = require('./highchartexample.jsx');



var ClientGraphs = React.createClass({
    componentWillMount: function() {

    },
	render: function() {
		return (
			<div className="graph-start-container">
                 <Button  className="session-start-btn" data-toggle="collapse" data-target="#collapse" aria-expanded="false" aria-controls="collapse">Graphs</Button>
                <div className="collapse" id="collapse">
                     <div>
                        <LineGraph clientId={this.props.clientId} clientObj={this.props.clientObj}/>

                    </div>
                </div>
        </div>
		);
	}

});


module.exports = ClientGraphs;
