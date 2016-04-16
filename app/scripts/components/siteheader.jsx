var React = require('react');

var SiteHeader = React.createClass({
  render: function(){
    var link = '';
    if(this.props.link){
      link = ( <div className="site-header-link"><a className="program-name-header" href={this.props.link}>{this.props.linkTitle}</a></div> );
    }
    return (
      <div className="site-title">
        <div className="title-site-heading">{this.props.title}</div>
        {link}
        <div className="site-title-border"></div>
      </div>
    );
  }
});

module.exports = SiteHeader;
