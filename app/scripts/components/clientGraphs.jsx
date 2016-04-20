
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
var DoughGraph = require('./doughGraph.jsx');



var ClientGraphs = React.createClass({
    componentWillMount: function() {

    },
	render: function() {
		return (
			<div className="graph-start-container">
                 <Button  className="session-start-btn graphs-button" data-toggle="collapse" data-target="#collapseLine" aria-expanded="false" aria-controls="collapse">Line</Button>
                 <Button  className="session-start-btn graphs-button" data-toggle="collapse" data-target="#collapseDough" aria-expanded="false" aria-controls="collapse">Doughnut</Button>
                <div className="collapse" id="collapseLine">

                        <LineGraph clientId={this.props.clientId} clientObj={this.props.clientObj}/>

                </div>

                <div className ="collapse" id="collapseDough">
                    <DoughGraph clientId = {this.props.clientId} clientObj = {this.props.clientObj} />
                </div>
        </div>
		);
	}

});


module.exports = ClientGraphs;
