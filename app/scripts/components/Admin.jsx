





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

  handleChange: function( client, e){
  	//console.log(client);
  	e.preventDefault();
    // grabs file from input
    var file = e.target.files[0];
    console.log(file);
    // passes up to be set as parse file, named and pushed to images array
    this.handleProfileImage(file, client);
  },

  handleProfileImage: function(file, client){
  	 	var self = this;

  	 	console.log(client);
  	 	var name = "profile" + Date.now() + ".svg";
    // pass in name and file that is passed in to function above
    	var image = new Parse.File(name, file);



    			var user = new models.Client(client);
		      user.set('profileImage', image);
		      user.save(null, {
		      	sucess:function(result){
		      		console.log(success);
		      	},
		      	error: function(error){
		      		console.log(error);
		      	}
		      });




    // grabs file from input

    // if (fileUpload.files.length === 0) {
 			// 	var file = fileUpload.files[0];
  		// 	var name = "profile-image" + Date.now();
  		// 	console.log("saving...");
		  // 	var parseFile = new Parse.File(name, file);
		  // 	parseFile.save(null, {
		  // 		success:function(results){
		  // 			console.log("success");
		  //     // The file has been saved to Parse.
		  //    // console.log('result is: ', result);
		  //     var user = new models.Client(client);
		  //     user.set('profileImage', results);
		  //     user.save(null, {
		  //     	sucess:function(result){
		  //     		console.log(sucess);
		  //     	},
		  //     	error: function(error){
		  //     		console.log(error);
		  //     	}
		  //     });
		      // location.reload();
		      //self.forceUpdate();  //attempt to rerender page after pic uploaded.
		//       },
		//       error: function(error){
		//       	console.log(error);
		//       }
		// });









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

									<img src={client.profileImage.url()} />
									<p className="client-name caseload-name">{client.Name}</p>
									</div>
									<div className="col-sm-12">
											<form onSubmit={this.handleProfileImage.bind(this, client)}>
								<fieldset className="form-group">
			            <label className="file-field input-field form-label" htmlFor="add-client-profile"> Change Profile Image</label>
			            <input onChange={this.handleChange.bind(this, client)} type="file" id="profile-upload" className="form-control"/>

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
