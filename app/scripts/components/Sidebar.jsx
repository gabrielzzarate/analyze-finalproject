//3rd party
var React = require('react');

var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;


var Sidebar = React.createClass ({


	render: function() {
		return (
			<div id="sidebar-wrapper ">



						<div className="sidebar-header col-sm-12 ">


									<a href="#home/">
												<div className="col-xs-3 sidebar-image-container">

												<img className="sidebar-brand" src="./images/app-icon-main.svg" />
												</div>
												<div className="col-xs-9 sidebar-heading-container">
												<div className="sidebar-heading">
												<span className="sidebar-title">Analyze</span>
												<span className="sidebar-subtitle">Therapy Tracking</span>
												</div>



												</div>
								</a>

						</div>

            		<div className="sidebar-nav col-sm-10 col-sm-offset-1 ">
								<Nav bsStyle="pills" stacked >
		    						<NavItem className="navitem" eventKey={1} href="#home/">Dashboard</NavItem>
		    						<NavItem className="navitem" eventKey={2} href="#admin/">Admin</NavItem>
		    						<NavItem className="navitem" eventKey={3}>Graphs</NavItem>
		 					 </Nav>


						</div>
         </div>






		);
	}
});

module.exports = Sidebar;






// <div id="sidebar-wrapper">



// 						<div className="sidebar-header col-sm-10 ">


// 									<a href="#home/">

// 												<img className="sidebar-brand" src="./images/app-icon-main.svg" />



// 												<div className="sidebar-heading">
// 												<span className="sidebar-title">Analyze</span>
// 												<span className="sidebar-subtitle">Therapy Tracking</span>



// 												</div>
// 								</a>

// 						</div>

//             		<div className="sidebar-nav col-sm-10 col-sm-offset-1 ">
// 								<Nav bsStyle="pills" stacked >
// 		    						<NavItem className="navitem" eventKey={1} href="#home/">Dashboard</NavItem>
// 		    						<NavItem className="navitem" eventKey={2} href="#admin/">Admin</NavItem>
// 		    						<NavItem className="navitem" eventKey={3}>Graphs</NavItem>
// 		 					 </Nav>


// 						</div>
//          </div>
