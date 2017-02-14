var fetch = require('fetch').fetchUrl;
var MEETUP_API_KEY = process.env.MEETUP_API_KEY;
var MEETUP_API_URL = 'http://api.meetup.com/find/events';

module.exports = {
  find: function find(lat, lng, callback) {
    var params = '?key=' + MEETUP_API_KEY +
      '&sign=true&lat=' + lat + '&lng=' + lng;
    fetch(MEETUP_API_URL + params, callback);
  }
}
