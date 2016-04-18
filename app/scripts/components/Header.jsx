
/* Header.jsx */

//3rd party
var $ = require('jQuery');
var React = require('react');
var Parse = require('parse');


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
		$('#main-container').toggleClass('col-xs-12');
	},

	render: function() {
		var currentUser = Parse.User.current().get('username');
		return (
				<div className="col-xs-10 header-container">

					<div classname = "col-xs-6">

						<a className="toggle-sidebar-btn visible-xs" onClick={this.toggleSidebar} ><i className="fa fa-angle-double-right" aria-hidden="true"></i></a>

					</div>


					<div className="col-xs-6 col-xs-offset-8 ">
						<div className="user-header-info">
							<img src="./images/user-icon.svg" />
							<span className="user-header-welcome"> HI, {currentUser} </span>
							<a onClick={this.launchFullscreen} className="fullscreen-icon"><img src="./images/fullscreen-icon.svg"/></a>
						</div>

					</div>
				</div>

		);
	}
});

module.exports = Header;
