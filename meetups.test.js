'use strict';
var test = require('tape');
var meetups = require('./meetups');

var lat = '51.1657';
var lng = '10.4515';

test('meetups.find returns status code 200', function (t) {
    t.plan(1);
    meetups.find(lat, lng, function (error, meta, body) {
        t.equal(meta.status, 200);
    });
});

test('meetups.find returns an array of meetups', function (t) {
    t.plan(1);
    meetups.find(lat, lng, function (error, meta, body) {
        var result = JSON.parse(body);
        t.ok(result.length > 0, 'expected length to be positive but got ' + result.length);
    });
});

test('meetups.extract returns string representation of the given meetups', function (t) {
    t.plan(1);
    meetups.find(lat, lng, function (error, meta, body) {
        var result = JSON.parse(body);
        var info = meetups.extract(result, 1);
        t.ok(info.indexOf(meetups[0].venue.city) >= 0);
    });
});
