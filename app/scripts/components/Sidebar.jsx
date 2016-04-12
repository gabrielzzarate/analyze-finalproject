//3rd party
var React = require('react');

var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;


var Sidebar = React.createClass ({
	render: function() {
		return (
			<div>

					<div className="sidebar-header col-sm-10 ">


							<a href="#home/">
										<img src="./images/app-icon-main.svg" />

										<div className="sidebar-heading">
										<span className="sidebar-title">Analyze</span>
										<span className="sidebar-subtitle">Therapy Tracking</span>


										</div>
						</a>

				</div>

				<div className="sidebar-nav col-sm-10 col-sm-offset-1">
						<Nav bsStyle="pills" stacked >
    						<NavItem className="navitem" eventKey={1} href="#home/">Dashboard</NavItem>
    						<NavItem className="navitem" eventKey={2} title="Item">Procedures</NavItem>
    						<NavItem className="navitem" eventKey={3}>Graphs</NavItem>
 					 </Nav>


				</div>






			</div>
		);
	}
});

module.exports = Sidebar;
