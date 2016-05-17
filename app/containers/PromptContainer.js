var React         = require('react');

var Prompt = require('../components/Prompt');

var PromptContainer = React.createClass({

    //contextTypes allows you to pass items to your component without going through "props"
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState(){
        return {
            username: ''
        }
    },
    handleUpdateUser(e){
        this.setState({
            //this is what every they type in the input box
            username: e.target.value

        });
    },
    handleSubmitUser(e){
        e.preventDefault();
        var username = this.state.username;
        this.setState({
            username: ''
        });

        if (this.props.routeParams.playerOne) {
            // go to /battle
            console.log(this.context);
            this.context.router.push({
                pathname: '/battle',
                query: {
                    playerOne: this.props.routeParams.playerOne,
                    playerTwo: this.state.username
                }
            })
        } else {
            // go to /plyerTwo
            this.context.router.push('/playerTwo/' + this.state.username)
        }
    },
    render() {
        return (
            //separating business logic from presentation logic
            <Prompt onSubmitUser={this.handleSubmitUser}
                    onUpdateUser={this.handleUpdateUser}
                    header={this.props.route.header}
                    username={this.state.username}
            />
        )
    }

});

module.exports = PromptContainer;