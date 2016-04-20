
/* Header.jsx */

//3rd party
var $ = require('jQuery');
var React = require('react');
var Parse = require('parse');
var Nav = require('react-bootstrap').Nav;
var NavDropdown  = require('react-bootstrap').NavDropdown;
var MenuItem = require('react-bootstrap').NavDropdown;
var Backbone = require('backbone');
var _ = require('underscore');

var Header = React.createClass ({
	launchFullscreen: function(element){
		element = document.documentElement;
		if(element.requestFullscreen) {
		    element.requestFullscreen();
		  } else if(element.mozRequestFullScreen) {
		    element.mozRequestFullScreen();
		  } else if(element.webkitRequestFullscreen) {
		    element.webkitRequestFullscreen();
		  } else if(element.msRequestFullscreen) {
		    element.msRequestFullscreen();
  	}
	},
	toggleSidebar: function(){
		$('#sidebar').toggleClass('hidden-xs');
		$('.toggle-icon').toggleClass('rotate');
		$('#main-container').toggleClass('col-xs-12');
	},

	logout: function(e){
    e.preventDefault();
    Parse.User.logOut();

    Backbone.history.navigate('', {trigger: true});
  },

	render: function() {
		var currentUser = Parse.User.current().get('username');
		return (
				<div className="col-xs-10 header-container">

					<div className="toggle-sidebar">

						<a className="toggle-sidebar-btn visible-xs" onClick={this.toggleSidebar} ><i className="toggle-icon fa fa-angle-double-right" aria-hidden="true"></i></a>
						</div>




						<div className="user-header-info">
							<img src="./images/user-icon.svg" />


					       <span role="presentation" className="dropdown">
					    <span className="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
					      <span className="user-header-welcome"> HI, {currentUser} </span><span className="caret"></span>
					    </span>
					    <ul className="dropdown-menu">


         		 <li><a onClick={this.logout}><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</a></li>
					    </ul>
					  </span>




							<a onClick={this.launchFullscreen} className="fullscreen-icon"><img src="./images/fullscreen-icon.svg"/></a>


					</div>
				</div>

		);
	}
});

module.exports = Header;
