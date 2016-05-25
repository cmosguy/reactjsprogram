var React         = require('react');
var PropTypes     = React.PropTypes;
var axios         = require('axios');
var githubHelpers = require('../utils/githubHelpers');

var UserGistContainer = React.createClass({

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
        return {
            username: '',
            lastGistUrl: ''
        };
    },

    componentDidMount: function () {
        this.serverRequest = githubHelpers.getGists(this.props.routeParams.username)
            .then(function (result) {
                var lastGist = result.data[0];
                this.setState({
                    username: lastGist.owner.login,
                    lastGistUrl: lastGist.html_url
                });
            }.bind(this));
    },

    componentWillUnmount: function () {
        this.serverRequest.abort();
    },
    render: function () {
        return (
            <div>
                {this.state.username}'s last gist is
                <a href={this.state.lastGistUrl}>here</a>.
            </div>
        );
    }

});

module.exports = UserGistContainer;
