var React         = require('react');
var ConfirmBattle = require('../components/ConfirmBattle');
var GithubHelpers = require('../utils/githubHelpers');

var ConfirmBattleContainer = React.createClass({

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState(){
        console.log('getInitialState');
        return {
            isLoading: true,
            playersInfo: []
        }

    },

    componentWillReceiveProps(){

        console.log('componentWillReceiveProps');
    },

    componentWillMount(){
        console.log('componentWillMount');
    },

    componentDidMount(){
        console.log('componentDidMount');
        var query = this.props.location.query;
        //fetch info from github
        GithubHelpers.getPlayersInfo([query.playerOne, query.playerTwo])
            .then(function (players) {
                this.setState({
                    isLoading: false,
                    playersInfo: [players[0], players[1]]
                })
            }.bind(this))
    },

    handleInitiateBattle(){
        this.context.router.push({
            pathname: '/results',
            state: {
                //this pushes the state into the new router path that we are going to
                playerInfo: this.state.playerInfo
            }
        })

    },

    render: function () {
        return (
            <ConfirmBattle
                isLoading={this.state.isLoading}
                onInitiateBatte={this.handleInitiateBattle}
                playersInfo={this.state.playersInfo}
            />
        );
    }

});

module.exports = ConfirmBattleContainer;
