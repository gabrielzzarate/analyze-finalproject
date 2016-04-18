





//3rd party
var $ = require('jquery');
var React = require("react");
var Parse = require('parse');
var ParseReact = require('parse-react');


// parse-server init
Parse.initialize("analyzetracking");
Parse.serverURL = 'http://analyzetracking.herokuapp.com/';

// Parse class models
var models = require('../models/models.js');

// react-bootstrap
var Accordion = require('react-bootstrap').Accordion;
var Panel = require('react-bootstrap').Panel;


var Admin = React.createClass({
	mixins: [ParseReact.Mixin],
	getInitialState: function(){
    return {
    	user: Parse.User.current(),
	    clients: null,
    	clientsObj: null,
      file: "",
      profilePic: null,
      tel: ""
    };
  },
  observe: function(){
		return {
			clientObj: (new Parse.Query('Clients').equalTo('therapistTeam', this.state.user))
		};
	},
  // componentWillMount: function() {
  // 	var self = this;
  // 	var query = new Parse.Query(models.Client);
  // 	query.find({
  // 		success: function(results){
  // 			self.setState({"clientsObj": results});
  // 		},
  // 		error: function(error){
  // 			console.log(error);
  // 		}
  // 	});
  // },

  handleProfileImage: function(client){
  	 	var self = this;

    // grabs file from input
    var fileUpload = $("#profile-upload")[0];
    if (fileUpload.files.length > 0) {
 				var file = fileUpload.files[0];
  			var name = "profile-image";

		  	var parseFile = new Parse.File(name, file);
		  	parseFile.save().then(function(result) {
		      // The file has been saved to Parse.
		     // console.log('result is: ', result);
		      var user = new models.Client(client);
		      user.set('profileImage', result);
		      user.save();
		      // location.reload();
		      //self.forceUpdate();  //attempt to rerender page after pic uploaded.

		});
}








    // }, function(error) {
    //   // The file either could not be read, or could not be saved to Parse.
    //   console.log(error);
    // });

    //
    // var profile_pic = Parse.User.current().get('profilePics').toJSON().url;
    // this.pic = profile_pic;
    // this.setState({profilePic: profile_pic});
  },
	render: function() {
		var caseLoadItems = function(client) {
				return (
					<div  key={client.objectId} className="col-sm-12">
									<div className="col-sm-2">
									<img src="./images/user-icon-1.svg" />

									<p className="client-name caseload-name">{client.Name}</p>
									</div>
									<div className="col-sm-12">
											<form onSubmit={this.handleProfileImage.bind(this, client)}>
								<fieldset className="form-group">
			            <label className="file-field input-field form-label" htmlFor="add-client-profile"> Change Profile Image</label>
			            <input type="file" id="profile-upload" className="form-control"/>

			          </fieldset>
			          <button type="submit">Submit</button>
			        </form>
			        </div>

					</div>
					);
			}.bind(this);
			return (
				<div className = "col-sm-10 col-sm-offset-1 client-detail-container">

						<div className="caseload-listing col-sm-12">
						{this.data.clientObj.map(caseLoadItems.bind(this))}
					</div>
				</div>
				);
		}
	});



module.exports = Admin;


// <form>
// 					<fieldset className="form-group">
// 	            <label className="form-label" htmlFor="add-client-profile"> Client Profile-Picture </label>
// 	            <input onChange={this.handleProfileImage} type="file" />
// 	          </fieldset>
// 	        </form>
