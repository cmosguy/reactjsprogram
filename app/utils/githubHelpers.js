var axios = require('axios');

var id  = "5fca9783479fd777d4e3";
var sec = "bc6263af2bc8bc18ad60aa3497be679492fdde0a";

var param = "?client_id" + id + "&client_secret" + sec;
function getUserInfo(username) {
    return axios.get('https://api.github.com/users/' + username + param)
}

var helpers = {
    getPlayersInfo(players){
        return axios.all(players.map(function (username){
            return getUserInfo(username)
        })).then(function (info){
            return info.map(function(user){
                return user.data;
            })
        }).catch(function (err){
            console.warn('Error in getPlayersInfo', err);
        })
    }
};

module.exports = helpers;