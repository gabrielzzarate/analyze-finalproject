
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
        this.setState({lineGraph: !this.state.lineGraph});
        this.setState({doughnutGraph: false});
    },

    handleDoughnut: function(){
        this.setState({doughnutGraph: !this.state.doughnutGraph});
        this.setState({lineGraph: false });
    },


	render: function() {
		return (
			<div className="graph-start-container">
                <div className="graph-btn-container">
                 <Button className="session-start-btn graph-btn" onClick={this.handleClick}>Line</Button>
                 <Button className="session-start-btn graph-btn" onClick={this.handleDoughnut}>Doughnut</Button>
                </div>
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
