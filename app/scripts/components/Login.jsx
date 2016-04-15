
/* Login.jsx */

//3rd party
var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');
var Parse = require('parse');

// parse server init
Parse.initialize("analyzetracking");
Parse.serverURL = 'http://analyzetracking.herokuapp.com/';



var Login = React.createClass ({

	loginNewUser: function(username, password){

		Parse.User
      .logIn(username, password, {
        success: function(user) {
          console.log(user);
           Backbone.history.navigate("home/" , {trigger: true});

        },
        error: function(user, error) {
          // The login failed. Check error to see why.
        }
      });

	},

	handleLogin: function(event){
		event.preventDefault();
		var username = $('#userName').val();
		var password = $('#userPassword').val();
		console.log(username);
		console.log(password);

		this.loginNewUser(username, password);

	},
	render: function() {
		return (
			<div>

				<div className="user-login-container">
					<div className="login-header">
						<img className="text-center login-logo" src="images/app-icon-login.svg" />

							<p className="text-center login-title">Analyze</p>


							<p className='text-center login-sub-title'>Therapy Tracking</p>
				</div>

						<form onSubmit={this.handleLogin}>
							<p className="login-label">Username</p>
							<input type="text" id="userName" className="username-input" />
							<p className="login-label">Password</p>
							<input type="password" id="userPassword" className="password-input" />


							<button type='submit' className="logIn-button">Log In</button>
						</form>

				</div>
			</div>
		);
	}
});

module.exports = Login;
