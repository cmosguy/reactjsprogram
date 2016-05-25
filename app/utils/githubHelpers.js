var axios = require('axios');

var id  = "5fca9783479fd777d4e3";
var sec = "bc6263af2bc8bc18ad60aa3497be679492fdde0a";

var param = "?client_id" + id + "&client_secret" + sec;
function getUserInfo(username) {
    return axios.get('https://api.github.com/users/' + username + param)
}

function getRepos(username) {
    //fetch usernames repos
    return axios.get('https://api.github.com/users/' + username + '/repos' + param + '&per_pate=100');
}

function getTotalStars(repos) {
    //calculate all the stars that usr has  
    return repos.data.reduce((prev, current)=> {
        return prev + current.stargazers_count
    }, 0)
}

function getPlayersData(player) {
    //get repos
    // getTotalStars
    //return objec with that data

    return getRepos(player.login)
        .then(getTotalStars)
        .then((totalStars)=> {
            return {
                followers: player.followers,
                totalStars: totalStars
            }
        })

}

function calculateScores(players) {
    //return an array after doing some fancy calcs
    return [
        players[0].followers * 3 + players[0].totalStars,
        players[1].followers * 3 + players[1].totalStars

    ]
}
var helpers = {
    getGists(username) {
        //fetch usernames repos
        return axios.get('https://api.github.com/users/' + username + '/gists');
    },
    getPlayersInfo(players){
        return axios.all(players.map(function (username) {
            return getUserInfo(username)
        })).then(function (info) {
            return info.map(function (user) {
                return user.data;
            })
        }).catch(function (err) {
            console.warn('Error in getPlayersInfo', err);
        })
    },

    battle(players){
        var playerOneData = getPlayersData(players[0]);
        var playerTwoData = getPlayersData(players[1]);

        return axios.all([playerOneData, playerTwoData])
            .then(calculateScores)
            .catch((err) => {
                console.warn('Error in getPlayersInfo', err);
            })
    }


};

module.exports = helpers;