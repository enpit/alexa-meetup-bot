'use strict';
var fetch = require('fetch').fetchUrl;
var MEETUP_API_KEY = process.env.MEETUP_API_KEY;
var MEETUP_API_URL = 'https://api.meetup.com/find/events';

module.exports = {
    'find': function find(lat, lng, callback) {
        var params = '?key=' + MEETUP_API_KEY +
      '&sign=true&lat=' + lat + '&lng=' + lng;
        fetch(MEETUP_API_URL + params, callback);
    },
    'extract': function extract (meetups, max) {
        meetups.splice(max); // Reduce results to *max* meetups

        return meetups.reduce(function reducer (allMeetups, meetup) {
            var city = '';
            if (meetup.venue && meetup.venue.city) {
                city = ', in ' + meetup.venue.city;
            }

            return allMeetups += meetup.name + city + '. ';
        }, '');
    }
};
