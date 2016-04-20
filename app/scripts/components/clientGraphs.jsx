
/* clientGraphs.jsx */

//3rd party
var React = require('react');
var Chart = require('chart.js');


// bootstrap-react components
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var Button = require('react-bootstrap').Button;

// require in child components
var LineGraph = require('./linegraph.jsx');

var DoughGraph = require('./doughGraph.jsx');



var ClientGraphs = React.createClass({
    getInitialState: function() {
        return {
            lineGraph: false,
            doughnutGraph: false
        };
    },
    componentWillMount: function() {

    },
    handleClick: function(){
        this.setState({lineGraph: true});
    },

    handleDoughnut: function(){
        this.setState({doughnutGraph: true});
    },


	render: function() {
		return (
			<div className="graph-start-container">
                 <Button onClick={this.handleClick}>Line</Button>
                 <Button  onClick={this.handleDoughnut}>Doughnut</Button>
                <div >

                        <LineGraph render={this.state.lineGraph} clientId={this.props.clientId} clientObj={this.props.clientObj}/>

                </div>

                <div >
                    <DoughGraph render={this.state.doughnutGraph} clientId = {this.props.clientId} clientObj = {this.props.clientObj} />
                </div>
        </div>
		);
	}

});


module.exports = ClientGraphs;
