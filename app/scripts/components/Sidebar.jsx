//3rd party
var React = require('react');

var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var Accordion = require('react-bootstrap').Accordion;

//require in child components
var SidebarCaseload = require('./sidebarCaseload.jsx');



var Sidebar = React.createClass ({


	render: function() {
		return (
			<div id="sidebar-wrapper ">



						<div className="sidebar-header col-sm-10 ">
									<a href="#home/">
												<img className="sidebar-brand" src="./images/app-icon-main.svg" />
												<div className="sidebar-heading hidden-xs">
												<span className="sidebar-title">Analyze</span>
												<span className="sidebar-subtitle ">Therapy Tracking</span>
												</div>
								</a>

						</div>
            		<div className="sidebar-nav col-sm-10 col-sm-offset-1 ">
								<Nav bsStyle="pills" stacked >
		    						<NavItem className="navitem hidden-xs" eventKey={1} href="#home/"><i className="fa fa-tachometer" aria-hidden="true"></i> Dashboard</NavItem>
		    						<NavItem className="text-center navitem visible-xs" eventKey={2} href="#home/">   <i className="fa fa-tachometer fa-lg" aria-hidden="true"></i></NavItem>
		    						<NavItem className="navitem hidden-xs" eventKey={3}  data-toggle="collapse" data-target="#collapseCaseload" aria-expanded="false" aria-controls="collapse"> <i className="fa fa-folder-open-o fa-lg" aria-hidden="true"></i> Caseload</NavItem>
		    						<NavItem className="text-center navitem visible-xs" eventKey={4}  data-toggle="collapse" data-target="#collapseCaseload" aria-expanded="false" aria-controls="collapse"> <i className="fa fa-folder-open-o fa-lg" aria-hidden="true"></i></NavItem>
		    						{/* <NavItem className="navitem" eventKey={2} href="#admin/">Admin</NavItem> */}
		    						<div className ="collapse" id="collapseCaseload">
		 					  			<SidebarCaseload />
		 					 		 </div>


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
