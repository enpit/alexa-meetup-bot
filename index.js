'use strict';
var Alexa = require('alexa-sdk');
var meetups = require('./meetups');
var APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

var languageStrings = {
    "de-DE": {
        "translation": {
            "SKILL_NAME" : "Meetups in Deutschland",
            "GET_MEETUPS_MESSAGE" : "Hier sind die nächsten Treffen: ",
            "HELP_MESSAGE" : "Du kannst sagen, „sag mir die nächsten Veranstaltungen“ oder „welche Treffen kann ich besuchen“, oder du kannst „Beenden“ sagen... Wie kann ich dir helfen?",
            "HELP_REPROMPT" : "Wie kann ich dir helfen?",
            "STOP_MESSAGE" : "Auf Wiedersehen!"
        }
    }
};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetMeetups');
    },
    'GetMeetupsIntent': function () {
        this.emit('GetMeetups');
    },
    'GetMeetups': function () {
        var alexa = this;
        // Use general lat / lng of germany as long as alexa-sdk does not provide a way to get the device's location:
        var lat = '51.1657';
        var lng = '10.4515';
        meetups.find(lat, lng, function (error, meta, body) {
            if (meta.status === 200) {
                var meetups = JSON.parse(body);
                var meetupsInfo = meetups.reduce(function reducer (allMeetups, meetup) {
                    var city = '';
                    if (meetup.venue && meetup.venue.city) {
                        city = ' in ' + meetup.venue.city;
                    }

                    return allMeetups += meetup.name + city + '<break />';
                }, '');
                // Create speech output
                var speechOutput = alexa.t("GET_MEETUPS_MESSAGE") + meetupsInfo;
                alexa.emit(':tellWithCard', speechOutput, alexa.t("SKILL_NAME"), meetupsInfo);
            } else {
                alexa.emit('AMAZON.HelpIntent');
            }
        });
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = this.t("HELP_MESSAGE");
        var reprompt = this.t("HELP_MESSAGE");
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    }
};
