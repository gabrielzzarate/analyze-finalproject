//3rd party
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
	render: function() {
		var currentUser = Parse.User.current().get('username');
		return (
			<div className="col-sm-10 header-container">
					<div className="user-header-info">
						<img src="./images/user-icon.svg" />
					<span className="user-header-welcome"> HI, {currentUser} </span> {/* input parse.user.current here */}
						<a onClick={this.launchFullscreen} className="fullscreen-icon"><img src="./images/fullscreen-icon.svg"/></a>
					</div>
			</div>
		);
	}
});

module.exports = Header;
